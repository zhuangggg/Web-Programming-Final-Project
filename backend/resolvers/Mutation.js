const Project = require('../models/project')
const User = require('../models/user')


const defaultStart = '2020/3/10'
const defaultEnd = '2020/3/20'

const Mutation = {
  
  async createProject(parent, args, { pubsub }, info) {
    const newProject = {
        id: args.data.id,
        name: args.data.name,
        color: args.data.color,
        events: [],
        usernames: [args.data.username],
        lastupdated: {
          username: args.data.username,
          updatetime: arg.data.updatetime,
          message: `created the project`
        }
    }
    console.log('createProject');

    // pubsub.publish(`update_project ${args.project_name}`, {
    //   update_project: {
    //       mutation: 'CREATED'
    //   }
    // })

    Project.insertMany(newProject)
    
    return `add project ${args.project_name} successfully!`
  },

  async createEvent(parent, args, { pubsub }, info) {
    console.log(args)
    const newEvent = {
        name: args.data.event_name,
        progress: args.data.progress,
        time: {start: args.data.time.start, end: args.data.time.end},
        items: [],
        lastupdated: {
          username: args.data.username,
          updatetime: args.data.updatetime,
          message: `create event: ${args.data.event_name}`
        }
    }
    // pubsub.publish(`update_project ${args.data.event_name}`, {
    //   update_project: {
    //       mutation: 'CREATED'
    //   }
    // })
    await Project.findOne({id: args.data.id}, function(err, doc){
        doc.events = [...doc.events, newEvent]
        doc.save()
    })
    return `add event ${args.data.event_name} successfully!`
  },

  async createItem(parent, args, { pubsub }, info) {
    console.log(args);
    console.log("---------")
    const newItem = {
        name: args.data.item_name,
        progress: args.data.progress,
        time: {start: args.data.time.start, end: args.data.time.end},
        usernames: [args.data.username],
        lastupdated: {
          username: args.data.username,
          updatetime: args.data.updatetime,
          message: `create item: ${args.data.item_name}`
        }
      }
    // pubsub.publish(`update_project ${args.data.item_name}`, {
    //   update_project: {
    //       mutation: 'CREATED'
    //   }
    // })
    await Project.findOne({id: args.data.id}, function(err, doc){
        const index = doc.events.findIndex((event)=>event.name===args.data.event_name)
        doc.events[index].items = [...doc.events[index].items, newItem]
        doc.save()
    })
    return `add item ${args.data.item_name} successfully!`
  },

  async deleteProject(parent, args, { pubsub }, info) {
    // pubsub.publish(`update_project ${args.name}`, {
    //   update_project: {
    //       mutation: 'DELETED'
    //   }
    // })
    console.log(args.name);
    Project.deleteMany({name: args.name}, ()=>{})
    return `delete project ${args.name} successfully!`
  },

  async deleteEvent(parent, args, { pubsub }, info) {
    // pubsub.publish(`update_project ${args.data.project_name}`, {
    //   update_project: {
    //       mutation: 'DELETED'
    //   }
    // })
    await Project.findOne({id: args.data.id}, function(err, doc){
        const index = doc.events.findIndex((event)=>event.name===args.data.event_name)
        doc.events.splice(index,1)
        doc.lastupdated = {
          username: args.data.username,
          updatetime: args.data.updatetime,
          message: `delete event: ${args.data.event_name}`
        }
        doc.save()
    })
    return `delete event ${args.data.event_name} successfully!`
  },

  async deleteItem(parent, args, { pubsub }, info) {
    // pubsub.publish(`update_project ${args.data.project_name}`, {
    //   update_project: {
    //       mutation: 'DELETED'
    //   }
    // })
    
    await Project.findOne({id: args.data.id}, function(err, doc){
        const eventIndex = doc.events.findIndex((event)=>event.name===args.data.event_name)
        const itemIndex = doc.events[eventIndex].items.findIndex((item)=>item.name===args.data.item_name)
        doc.lastupdated = {
          username: args.data.username,
          updatetime: args.data.updatetime,
          message: `delete item: ${args.data.item_name}`
        }
        doc.events[eventIndex].items.splice(itemIndex,1)
        doc.save()
    })
    return `delete item ${args.data.item_name} successfully!`
  },

  async editProject(parent, args, { pubsub }, info) {
    // pubsub.publish(`update_project ${args.data.name}`, {
    //   update_project: {
    //       mutation: 'EDITED'
    //   }
    // })
    console.log("------------------------");
    const data = JSON.parse(args.data.recentContent)
    console.log(args.data);
    console.log(data);
    console.log(data.recentContent);

    await Project.findOne({id: args.data.id}, function(err, doc){
      doc.name = data.name
      doc.progress = data.progress
      doc.time = data.time
      doc.events = data.events
      doc.color = data.color
      doc.usernames = data.usernames
      doc.lastupdated = {
        username: args.data.username,
        updatetime: args.data.updatetime,
        message: args.data.message
      }
      doc.save()
  })
    return `edit project ${args.data.name} successfully!`

  }
}

module.exports = Mutation