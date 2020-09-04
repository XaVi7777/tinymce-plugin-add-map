const { Schema, model } = require('mongoose');

const MapSchema = new Schema({
    markers: Array,
    center: Object,
});

module.exports = model('Map', MapSchema);