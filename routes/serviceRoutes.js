const express = require('express');
const router = express.Router();
const ClientInquiry = require('../models/Service');

// Create a new client inquiry
router.post('/', async (req, res) => {
    try {
        const newInquiry = new ClientInquiry(req.body);
        const savedInquiry = await newInquiry.save();
        res.status(201).json(savedInquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all client inquiries
router.get('/', async (req, res) => {
    try {
        const inquiries = await ClientInquiry.find();
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single client inquiry
router.get('/:id', async (req, res) => {
    try {
        const inquiry = await ClientInquiry.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(inquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update client inquiry
router.put('/:id', async (req, res) => {
    try {
        const updatedInquiry = await ClientInquiry.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json(updatedInquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete client inquiry
router.delete('/:id', async (req, res) => {
    try {
        const deletedInquiry = await ClientInquiry.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) {
            return res.status(404).json({ message: 'Inquiry not found' });
        }
        res.json({ message: 'Inquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
