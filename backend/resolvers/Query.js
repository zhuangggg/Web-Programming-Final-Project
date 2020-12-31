const Project = require('../models/project')

const Query = {

    async project(parent, args, info) {
        const target = await Project.findOne({name: args.name})
        console.log(target)
        if(!target) throw new Error('cannot find the project' + args.name)
        return target
    },

}
    
module.exports = Query  