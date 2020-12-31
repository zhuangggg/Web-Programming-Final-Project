const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProjectSchema = new Schema({
    name: String,
    progress: String,
    time: {
        start: String,
        end: String
    },
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
            time:{
                start: String,
                end: String
            }
        }] 
    }]
})

const Project = mongoose.model('Project', ProjectSchema)

module.exports = Project