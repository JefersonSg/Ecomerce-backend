const express = require('express');
const cors = require('cors');
const UserRoutes = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const path = require('path');
const fs = require('fs');
const https = require('https');
const CategoryRoutes = require('./routes/CategoryRoutes');

const app = express();

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
app.use('/categorys', CategoryRoutes);

// Routes
app.listen(5000);
