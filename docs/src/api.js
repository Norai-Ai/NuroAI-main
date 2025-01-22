const express = require('express');
const marketplaceRoutes = require('./marketplace');
const modelsRoutes = require('./models');
const router = express.Router();

// Base routes
router.use('/marketplace', marketplaceRoutes);
router.use('/models', modelsRoutes);

// Health Check endpoint
router.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is running smoothly!' });
});

module.exports = router;
