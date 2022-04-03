const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
    idUser: {type: String, required: true},
    idNumber: { type: Number, required: true },
    name: { type: String, uppercase: true, required: true, maxLength: 150 },
    lastName: { type: String, uppercase: true, required: true, maxLength: 150 },
    dateBirth: { type: Date, required: true},
    email: { type: String, required: true, maxLength: 100 },
    password: { type: String, required: true },
    services: [{ type: Schema.Types.ObjectId, ref: 'Servicio' }],
    avatar_url: { type: String },
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {type: Boolean, default: false},
    user_payment_id: { type: String },
    cards: [],
    payments: []
});

module.exports = mongoose.model('Usuario', UsuarioSchema);