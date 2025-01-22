const express = require('express');
const Joi = require('joi'); // For validation
const router = express.Router();

// Data for marketplace items
const marketplaceItems = [
    { id: 1, type: 'model', name: 'VisionNet', price: 10, description: 'Image classification model' },
    { id: 2, type: 'dataset', name: 'Urban Images', price: 5, description: 'Dataset for urban landscape analysis' },
    { id: 3, type: 'service', name: 'Custom Model Training', price: 100, description: 'Train a model with your data' }
];

// Validation schema
const itemSchema = Joi.object({
    type: Joi.string().valid('model', 'dataset', 'service').required(),
    name: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().optional()
});

// Utility function to validate data
const validateItem = (item) => itemSchema.validate(item);

// GET all items in the marketplace (with pagination)
router.get('/', (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedItems = marketplaceItems.slice(startIndex, endIndex);
    res.json({
        totalItems: marketplaceItems.length,
        currentPage: parseInt(page),
        totalPages: Math.ceil(marketplaceItems.length / limit),
        items: paginatedItems
    });
});

// GET a specific item by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const item = marketplaceItems.find((i) => i.id === id);
    if (!item) {
        return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
});

// POST to create a new marketplace item
router.post('/', (req, res) => {
    const { error, value } = validateItem(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const newItem = {
        id: marketplaceItems.length + 1,
        ...value
    };

    marketplaceItems.push(newItem);
    res.status(201).json(newItem);
});

// PUT to update an existing marketplace item
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const itemIndex = marketplaceItems.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    const { error, value } = validateItem(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Update the item
    marketplaceItems[itemIndex] = { id, ...value };
    res.json(marketplaceItems[itemIndex]);
});

// DELETE to remove an item from the marketplace
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    const itemIndex = marketplaceItems.findIndex((i) => i.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ error: 'Item not found' });
    }

    const deletedItem = marketplaceItems.splice(itemIndex, 1);
    res.json({ message: 'Item deleted successfully', item: deletedItem[0] });
});

module.exports = router;
