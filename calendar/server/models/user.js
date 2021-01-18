const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: String,
    name: String,
    projects_id: [String]
})

const User = mongoose.model('User', UserSchema)

module.exports = User