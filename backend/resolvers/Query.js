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
                    check: `Cannot find the name: ${args.data.name}`
                }
            }
            if(target.password!==args.data.password){
                return {
                    check: "The password is wrong"
                }
            }
            const db = await Project.find()
            let projects = []
            db.forEach(project => {
                project.usernames.forEach(username=>{
                    if(username===target.name){
                        projects.push(project)
                    }
                })                
            });
            const payload = {
                userinfo: target,
                check: "Log in success!",
                projects: projects
            }
            console.log(payload)
            return payload
        }
        else{
            const target = await User.findOne({name: args.data.name})
            if(target) return {
                check: `The name ${args.data.name} has been used`
            }
            else {
                const newUser = {
                    name: args.data.name,
                    password: args.data.password
                }
                await User.insertMany(newUser)
                const payload = {
                    userinfo: newUser,
                    check: "Sign in success!",
                    projects: []
                }
                console.log(payload)
                return payload
            }
        }
                
            
    }

}
    
module.exports = Query

