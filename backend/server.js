require('dotenv-defaults').config()

const { GraphQLServer, PubSub } = require('graphql-yoga')
const mongoose = require('mongoose')
const Project = require('./models/project')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


const mongodb = mongoose.connection

mongodb.on('error', (error) => {
  console.error(error)
})

mongodb.once('open', async() => {
  console.log('MongoDB connected!')


  let db = await Project.find()

  const server = new GraphQLServer({
    typeDefs: './schema.graphql',
    resolvers: {
      Query,
      Mutation,
    },
    context: {
    }
  })
  server.start({ port: process.env.PORT | 4000 }, () => {
    console.log(`The server is up on port ${process.env.PORT | 4000}`)
    console.log('db: ', db)

  })
})