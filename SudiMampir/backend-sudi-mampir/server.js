const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Fitur bawaan Node.js untuk membaca & menulis file
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Tentukan nama file tempat menyimpan data permanen
const dataFilePath = path.join(__dirname, 'database.json');

// 1. Fungsi untuk MEMBACA data dari file
const readData = () => {
  // Jika file database.json belum ada, otomatis buatkan beserta data default-nya
  if (!fs.existsSync(dataFilePath)) {
    const defaultData = {
      menuItems: [
        { id: 1, name: 'Pecel Banyumas', price: 15000, category: 'Makanan', image: '/images/pecel.jpg' },
        { id: 2, name: 'Soto Ayam', price: 12000, category: 'Makanan', image: '/images/soto.jpg' },
        { id: 3, name: 'Aneka Gorengan', price: 2000, category: 'Makanan', image: '/images/gorengan.jpg' },
        { id: 4, name: 'Es Teh / Teh Panas', price: 3000, category: 'Minuman', image: '/images/esteh.jpg' },
        { id: 5, name: 'Es Jeruk / Jeruk Panas', price: 4000, category: 'Minuman', image: '/images/esjeruk.jpg' }
      ],
      orders: []
    };
    fs.writeFileSync(dataFilePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  // Jika file sudah ada, baca isinya
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

// 2. Fungsi untuk MENYIMPAN data baru ke file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// --- API MENU ---
app.get('/api/menu', (req, res) => {
  const db = readData();
  res.json(db.menuItems);
});

app.post('/api/menu', (req, res) => {
  const db = readData(); // Baca data saat ini
  const newMenu = {
    id: Date.now(),
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
    image: req.body.image || 'https://cdn-icons-png.flaticon.com/512/1046/1046874.png' 
  };
  
  db.menuItems.push(newMenu); // Tambahkan menu baru
  writeData(db); // Simpan permanen ke file!
  
  res.status(201).json({ message: 'Menu ditambahkan', menu: newMenu });
});

app.put('/api/menu/:id', (req, res) => {
  const db = readData();
  const id = parseInt(req.params.id);
  const index = db.menuItems.findIndex(menu => menu.id === id);
  
  if (index !== -1) {
    db.menuItems[index] = { ...db.menuItems[index], ...req.body };
    writeData(db); // Simpan permanen ke file!
    res.json({ message: 'Menu berhasil diupdate', menu: db.menuItems[index] });
  } else {
    res.status(404).json({ message: 'Menu tidak ditemukan' });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  const db = readData();
  const id = parseInt(req.params.id);
  db.menuItems = db.menuItems.filter(menu => menu.id !== id);
  writeData(db); // Simpan permanen ke file!
  res.json({ message: 'Menu dihapus' });
});

// --- API PESANAN ---
app.get('/api/orders', (req, res) => {
  const db = readData();
  res.json(db.orders);
});

app.post('/api/orders', (req, res) => {
  const db = readData();
  const newOrder = {
    id: db.orders.length + 1,
    customer: req.body.customer,
    items: req.body.items,
    total: req.body.total,
    status: 'Diproses',
    date: new Date().toLocaleString('id-ID')
  };
  
  db.orders.unshift(newOrder); 
  writeData(db); // Simpan permanen ke file!
  res.status(201).json({ message: 'Pesanan dibuat!', order: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const db = readData();
  const index = db.orders.findIndex(o => o.id === parseInt(req.params.id));
  
  if (index !== -1) {
    db.orders[index].status = req.body.status;
    writeData(db); // Simpan permanen ke file!
    res.json({ message: 'Status diupdate', order: db.orders[index] });
  } else {
    res.status(404).json({ message: 'Pesanan tidak ditemukan' });
  }
});

app.listen(5000, () => console.log(`Server jalan di http://localhost:5000`));