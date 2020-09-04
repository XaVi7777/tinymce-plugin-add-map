const express = require('express');
const Map = require('../../models/Map/Map');

const router = express.Router();

router.get('/api/map', async (req, res) => {
    try {
        const { markers, center } = req.body;
        const map = new Map();
        await map.save();
        console.log(map._id)
        res.json({ success: true, id: map._id })
    } catch (error) {
        res.json({ error });
    }
});

router.post('/api/map', async (req, res) => {
    try {
        const { markers, center, id } = req.body;
        const map = await Map.findByIdAndUpdate(id, { markers, center })
        res.json({ success: true })
    } catch (error) {
        res.json({ error });
    }
});

router.get('/api/map/:id', async (req, res) => {
    res.render()
});

module.exports = router;