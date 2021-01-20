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
        console.log(args.data)
        if(args.data.type==="login"){
            const target = await User.findOne({name: args.data.name})
            if(!target){
                return{
                    check: "cannot find the name: " + args.data.name
                }
            }
            if(target.id!==args.data.id){
                return {
                    check: "the id is wrong"
                }
            }
            const db = await Project.find()
            let projects = []
            /*db.forEach((project)=>{
                target.projects_id.forEach((project_id)=>{
                    if(project.id===project_id){
                        projects.push(project)
                    }
                })
            })*/
            db.forEach(project => {
                project.usernames.forEach(username=>{
                    if(username===target.name){
                        projects.push(project)
                    }
                })                
            });
            const payload = {
                userinfo: target,
                check: "log in success!",
                projects: projects
            }
            console.log(payload)
            return payload
        }
        else{
            const target = await User.findOne({id: args.data.id})
            if(target) return {
                check: "the id has been used"
            }
            else {
                const newUser = {
                    id: args.data.id,
                    name: args.data.name,
                    projects_id: []
                }
                await User.insertMany(newUser)
                const payload = {
                    userinfo: newUser,
                    check: "sign in success!",
                    projects: []
                }
                console.log(payload)
                return payload
            }
        }
                
            
    }

}
    
module.exports = Query

