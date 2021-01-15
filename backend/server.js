require('dotenv-defaults').config()

const { GraphQLServer, PubSub } = require('graphql-yoga')
const mongoose = require('mongoose')
const Project = require('./models/project')
const User = require('./models/user')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const data = require('./data.json')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const pubsub = new PubSub()

const mongodb = mongoose.connection

mongodb.on('error', (error) => {
  console.error(error)
})

mongodb.once('open', async() => {
  console.log('MongoDB connected!')


  //Project.deleteMany({},()=>{})
  //User.deleteMany({},()=>{})
  Project.insertMany(data.projects)
  //User.insertMany(data.users)

  const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: {
      Query,
      Mutation,
      Subscription
    },
    context: {
      Project,
      User,
      pubsub
    }
  })

  server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}`)
  })
})