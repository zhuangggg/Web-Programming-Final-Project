const express = require('express')
const app = express();
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Project = require('./models/project')
const data = require('../src/data.json');

app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res)=>{

})

app.post('/', async (req, res) => {
    const projectName = req.body.name
    const data = await Project.findOne({name: projectName})
    console.log(`${projectName} has sent`)
    res.send(data)
});

app.post('/update',async (req, res)=>{
    const projectName = req.body.name
    const newProjectEvents = req.body.data.events
    console.log("/update");
    await Project.findOne({ name: projectName }, function (err, doc){
        if(err) console.log(err)
        doc.events = newProjectEvents
        console.log("!!!")
        doc.save();
        console.log(`${projectName} updated`)
    });
    res.send("update successfully")
    
})

app.put('/', (req, res) => {
    res.send('Received a PUT HTTP method');
});
app.delete('/', (req, res) => {
    res.send('Received a DELETE HTTP method');
});

require('dotenv-defaults').config();

if (!process.env.MONGO_URL) {
    console.error('Missing MONGO_URL!!!')
    process.exit(1)
}
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.connect(process.env.MONGO_URL, dbOptions)
.then(res => {
    console.log('mongo db connection created')
})

const db = mongoose.connection;

const saveProject = (saveItem)=>{
    let {name} = saveItem
    Project.countDocuments({name}, (err, count)=>{
        if(count) console.log(`data "${name}" exists`)
        else {
            const project = new Project(saveItem)
            project.save((err)=>{
            if(err) console.log(err)
            console.log(`data "${name}" saved`)
            })
        }
    })
}

db.once('open', async()=>{
    saveProject(data.projects[0])
    app.listen(port, () =>
        console.log(`Example app listening on port ${port}!`)
    );
})