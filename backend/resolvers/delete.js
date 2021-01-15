const deleteObject = {
    async deleteProject(parent, args, { pubsub }, info) {
        pubsub.publish(`update_project ${args.name}`, {
          update_project: {
              mutation: 'DELETED'
          }
        })
        Project.deleteMany({name: args.name}, ()=>{})
        return `delete project ${args.name} successfully!`
      },
    
      async deleteEvent(parent, args, { pubsub }, info) {
        pubsub.publish(`update_project ${args.data.project_name}`, {
          update_project: {
              mutation: 'DELETED'
          }
        })
        await Project.findOne({name: args.data.project_name}, function(err, doc){
            const index = doc.events.findIndex((event)=>event.name===args.data.event_name)
            doc.events.splice(index,1)
            doc.save()
        })
        return `delete event ${args.data.event_name} successfully!`
      },
    
      async deleteItem(parent, args, { pubsub }, info) {
        pubsub.publish(`update_project ${args.data.project_name}`, {
          update_project: {
              mutation: 'DELETED'
          }
        })
        
        await Project.findOne({name: args.data.project_name}, function(err, doc){
            const eventIndex = doc.events.findIndex((event)=>event.name===args.data.event_name)
            const itemIndex = doc.events[eventIndex].items.findIndex((item)=>item.name===args.data.item_name)
            doc.events[eventIndex].items.splice(itemIndex,1)
            doc.save()
        })
        return `delete item ${args.data.item_name} successfully!`
      },
    }
module.exports = deleteObject