const createObject = {
    async createProject(parent, args, { pubsub }, info) {
        const newProject = {
            name: args.data.project_name,
            progress: args.data.progress,
            time: {start: args.data.time.start, end: args.data.time.end},
            events: []
        }
    
        pubsub.publish(`update_project ${args.name}`, {
          update_project: {
              mutation: 'CREATED'
          }
        })
    
        Project.insertMany(newProject)
        
        return `add project ${args.name} successfully!`
      },
    
      async createEvent(parent, args, { pubsub }, info) {
        console.log(args)
        const newEvent = {
            name: args.data.event_name,
            progress: args.data.progress,
            time: {start: args.data.time.start, end: args.data.time.end},
            items: []
        }
        pubsub.publish(`update_project ${args.data.project_name}`, {
          update_project: {
              mutation: 'CREATED'
          }
        })
        await Project.findOne({name: args.data.project_name}, function(err, doc){
            doc.events = [...doc.events, newEvent]
            doc.save()
        })
        return `add event ${args.data.event_name} successfully!`
      },
    
      async createItem(parent, args, { pubsub }, info) {
        const newItem = {
            name: args.data.item_name,
            progress: args.data.progress,
            time: {start: args.data.time.start, end: args.data.time.end},
        }
        pubsub.publish(`update_project ${args.data.project_name}`, {
          update_project: {
              mutation: 'CREATED'
          }
        })
        await Project.findOne({name: args.data.project_name}, function(err, doc){
            const index = doc.events.findIndex((event)=>event.name===args.data.event_name)
            doc.events[index].items = [...doc.events[index].items, newItem]
            doc.save()
        })
        return `add item ${args.data.item_name} successfully!`
      },
}

module.exports = createObject