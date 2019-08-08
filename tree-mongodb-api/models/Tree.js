const mongoose = require('mongoose');

const TreeSchema = new mongoose.Schema({  
    standortNr: String,
    kennzeich: String,
    watered: [String],
    nameNr: String,
    baumHoehe: Number,
    artDtsch: String,
    artBot: String,
    gattungDtsch: String,
    gattung: String,
    strName: String,
    hausNr: String,
    zusatz: String,
    pflanzJahr: String,
    standAlter: Number,
    kroneDurch: Number,
    stammUmfg: Number,
    _id: String,
    typ: String,
    bezirk: String,
    bezirk: String,
    eigentuemer: String,
    lat: Number,
    lng: Number,
}, { collection : 'all' });
module.exports = mongoose.model('Tree', TreeSchema);