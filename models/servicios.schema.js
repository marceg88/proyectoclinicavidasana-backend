const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServicioSchema = new Schema({
    nameService: {type: String, required: true},
    dateService: { type: Number, required: true },
    price: { type: Number },
    patient: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
});

module.exports = mongoose.model('Servicio', ServicioSchema);