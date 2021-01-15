const Project = require('../models/project')
const User = require('../models/user')

const Query = {

    async project(parent, args) {
        const target = await Project.findOne({name: args.name})
        //console.log(target)
        if(!target) throw new Error('cannot find the project' + args.name)
        return target
    },

    async user(parent, args) {
        const target = await User.findOne({name: args.name})
        const db = await Project.find()
        let projects = []
        db.forEach((project)=>{
            target.projects_id.forEach((project_id)=>{
                if(project.id===project_id){
                    projects.push(project)
                }
            })
        })
        const payload = {
            userinfo: target,
            projects: projects
        }
        console.log(payload)
        return payload
    }

}
    
module.exports = Query

