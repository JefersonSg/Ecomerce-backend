const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const path = require('path');
const CategoryRoutes = require('./routes/CategoryRoutes');

const app = express();
const port = process.env.PORT || 5000;

// config JSON response
app.use(express.json());

// Solve CORS
app.use(cors());

// Public folder images
app.use(express.static('public'));
app.use('/files', express.static(path.resolve(__dirname, 'public', 'images')));

// Routes
app.use('/users', UserRoutes);
app.use('/products', ProductRoutes);
app.use('/', ProductRoutes);
app.use('/categorys', CategoryRoutes);

// Routes
app.listen(port);
