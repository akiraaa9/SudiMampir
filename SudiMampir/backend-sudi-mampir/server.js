const express = require('express');
const cors = require('cors');

const app = express();
// Tambahkan limit JSON agar bisa menerima file gambar (Base64) yang ukurannya agak besar
app.use(cors());
app.use(express.json({ limit: '10mb' })); 

let orders = [];

let menuItems = [
  { id: 1, name: 'Pecel Banyumas', price: 15000, category: 'Makanan', image: '/images/pecel.jpg' },
  { id: 2, name: 'Soto Ayam', price: 12000, category: 'Makanan', image: '/images/soto.jpg' },
  { id: 3, name: 'Aneka Gorengan', price: 2000, category: 'Makanan', image: '/images/gorengan.jpg' },
  { id: 4, name: 'Es Teh / Teh Panas', price: 3000, category: 'Minuman', image: '/images/esteh.jpg' },
  { id: 5, name: 'Es Jeruk / Jeruk Panas', price: 4000, category: 'Minuman', image: '/images/esjeruk.jpg' },
];

// --- API MENU ---
app.get('/api/menu', (req, res) => res.json(menuItems));

app.post('/api/menu', (req, res) => {
  const newMenu = {
    id: Date.now(),
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
    image: req.body.image || 'https://cdn-icons-png.flaticon.com/512/1046/1046874.png' 
  };
  menuItems.push(newMenu);
  res.status(201).json({ message: 'Menu ditambahkan', menu: newMenu });
});

// FITUR BARU: API UPDATE / EDIT MENU
app.put('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = menuItems.findIndex(menu => menu.id === id);
  
  if (index !== -1) {
    // Timpa data lama dengan data baru
    menuItems[index] = { ...menuItems[index], ...req.body };
    res.json({ message: 'Menu berhasil diupdate', menu: menuItems[index] });
  } else {
    res.status(404).json({ message: 'Menu tidak ditemukan' });
  }
});

app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  menuItems = menuItems.filter(menu => menu.id !== id);
  res.json({ message: 'Menu dihapus' });
});

// --- API PESANAN (TETAP SAMA) ---
app.get('/api/orders', (req, res) => res.json(orders));

app.post('/api/orders', (req, res) => {
  const newOrder = {
    id: orders.length + 1,
    customer: req.body.customer,
    items: req.body.items,
    total: req.body.total,
    status: 'Diproses',
    date: new Date().toLocaleString('id-ID')
  };
  orders.unshift(newOrder); 
  res.status(201).json({ message: 'Pesanan dibuat!', order: newOrder });
});

app.put('/api/orders/:id/status', (req, res) => {
  const index = orders.findIndex(o => o.id === parseInt(req.params.id));
  if (index !== -1) {
    orders[index].status = req.body.status;
    res.json({ message: 'Status diupdate', order: orders[index] });
  } else {
    res.status(404).json({ message: 'Pesanan tidak ditemukan' });
  }
});

app.listen(5000, () => console.log(`Server jalan di http://localhost:5000`));