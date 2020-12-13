const express = require('express')
const app = express();
const port = process.env.PORT || 4000
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Project = require('./models/project')
const data = require('../src/data.json');
//const updateRoute = require('./routes/updateRoute')

app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res)=>{

})

app.post('/', async (req, res) => {
    const projectName = req.body.name
    console.log('project name: ', projectName)
    const data = await Project.findOne({name: projectName})
    console.log(data)
    res.send(data)
});

app.post('/update',async (req, res)=>{
    const projectName = req.body.name
    const newProjectEvents = req.body.data.events
    console.log('project name: ', projectName)
    console.log('new projec: ', newProjectEvents)

    await Project.findOne({ name: projectName }, function (err, doc){
        console.log(newProjectEvents)
        doc.events = newProjectEvents
        console.log('sent data:', doc)
        doc.save();
    });
    console.log('update success')
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