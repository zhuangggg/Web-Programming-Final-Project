const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: String,
    color: Number,
    id: String,
    usernames: [String],
    events: [{
        name: String,
        progress: String,
        time: {
            start: String,
            end: String
        },
        items: [{
            name: String,
            progress: String,
            usernames: [String],
            time:{
                start: String,
                end: String
            }
        }] 
    }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project