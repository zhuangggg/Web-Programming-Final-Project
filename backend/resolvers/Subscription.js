const Subscription = {
    update_project: {
        subscribe (parent, args, { pubsub }, info){
            console.log(pubsub);
            return pubsub.asyncIterator(`update_project ${args.project_name}`)
        }
    }
}

module.exports = Subscription