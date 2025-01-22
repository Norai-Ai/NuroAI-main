const express = require('express');
const router = express.Router();

// Mock data for models
const models = [
    { id: 1, name: 'Model A', description: 'An example AI model' },
    { id: 2, name: 'Model B', description: 'Another example AI model' }
];

// GET all models
router.get('/', (req, res) => {
    res.json(models);
});

// GET model by ID
router.get('/:id', (req, res) => {
    const model = models.find(m => m.id === parseInt(req.params.id));
    if (!model) {
        return res.status(404).json({ error: 'Model not found' });
    }
    res.json(model);
});

module.exports = router;
