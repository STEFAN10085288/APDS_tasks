const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, required: true, maxlength: 50 },
  surname: { type: String, required: true, maxlength: 50 },
  phonenumber: { type: String, required: true, match: /^0[46]1\d{7}$/, minlength: 10, maxlength: 10 },
  birthday: { type: Date, required: true },
  email: { type: String, required: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
  social: { type: String, required: true, match: /^https?:\/\/(www\.)?(instagram\.com|twitter\.com|linkedin\.com)\/[\w-]+\/?$/},
  address: { type: String, maxlength: 200 },
});

module.exports = mongoose.model('User', userSchema);
