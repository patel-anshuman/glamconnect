const express = require('express');
const mongoose = require('mongoose');
const Category = require('../Model/category.model');
const Router = express.Router();

Router.get("/", (req, res) => {
    res.send("Welcome to GlamGuru Backend");
})


Router.get('/professionals', async (req, res) => {
    try {
        const professionals = await Professional.find();
        res.json(professionals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
Router.get('/professionals/:category', async (req, res) => {
    const category = req.params.category;
    try {
        const professionals = await Professional.find({ category });
        res.json(professionals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

Router.post('/professionals', async (req, res) => {
    const professional = new Professional(req.body);

    try {
        const newProfessional = await professional.save();
        res.status(201).json(newProfessional);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
Router.delete('/professionals/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Professional.findByIdAndDelete(id);
        res.json({ message: 'Professional deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
Router.put('/professionals/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const updatedProfessional = await Professional.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedProfessional);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
Router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'An error occurred while fetching categories.' });
    }
});



module.exports = Router;