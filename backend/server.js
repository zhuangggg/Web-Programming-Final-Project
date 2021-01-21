require('dotenv-defaults').config()

// const { GraphQLServer, PubSub } = require('graphql-yoga')
const mongoose = require('mongoose')
// const Project = require('./models/project')
// const User = require('./models/user')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const Subscription = require('./resolvers/Subscription')
const data = require('./data.json')
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');
const path = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./schema')

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

  const resolvers = {
    Query,
    Mutation,
    Subscription
  }
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const app = express();
  app.use(express.static(path.join(__dirname, '../build')));

// Allow cross-origin
app.use(cors());

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

  // app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

})