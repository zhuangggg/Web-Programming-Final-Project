const Project = require('../models/project')

const defaultStart = '2020/3/10'
const defaultEnd = '2020/3/20'

const Mutation = {
  
  async createProject(parent, args, info) {
    const newProject = {
        name: args.name,
        progress: '0%',
        time: {start: defaultStart, end: defaultEnd},
        events: []
    }
    Project.insertMany(newProject)
    return `add project ${args.name} successfully!`
  },

  async createEvent(parent, args, info) {
    const newEvent = {
        name: args.data.event_name,
        progress: '0%',
        time: {start: defaultStart, end: defaultEnd},
        items: []
    }
    await Project.findOne({name: args.data.project_name}, function(err, doc){
        doc.events = [...doc.events, newEvent]
        doc.save()
    })
    return `add event ${args.data.event_name} successfully!`
  },

  async createItem(parent, args, info) {
    const newItem = {
        name: args.data.item_name,
        progress: '0%',
        time: {start: defaultStart, end: defaultEnd},
    }
    await Project.findOne({name: args.data.project_name}, function(err, doc){
        const index = doc.events.findIndex((event)=>event.name===args.data.event_name)
        doc.events[index].items = [...doc.events[index].items, newItem]
        doc.save()
    })
    return `add item ${args.data.item_name} successfully!`
  },

  async deleteProject(parent, args, info) {
    Project.deleteMany({name: args.name}, ()=>{})
    return `delete project ${args.name} successfully!`
  },

  async deleteEvent(parent, args, info) {
    await Project.findOne({name: args.data.project_name}, function(err, doc){
        const index = doc.events.findIndex((event)=>event.name===args.data.event_name)
        doc.events.splice(index,1)
        doc.save()
    })
    return `delete event ${args.data.event_name} successfully!`
  },

  async deleteItem(parent, args, info) {
    await Project.findOne({name: args.data.project_name}, function(err, doc){
        const eventIndex = doc.events.findIndex((event)=>event.name===args.data.event_name)
        const itemIndex = doc.events[eventIndex].items.findIndex((item)=>item.name===args.data.item_name)
        doc.events[eventIndex].items.splice(itemIndex,1)
        doc.save()
    })
    return `delete item ${args.data.item_name} successfully!`
  }
}

module.exports = Mutation