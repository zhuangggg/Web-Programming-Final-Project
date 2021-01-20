const typeDefs = `
type Query {
    project(id: String!): Project!
    user(data: userInput!): UserPayload!
}

type Mutation {
    createProject(data: projectInput): String
    createEvent(data: eventInput!): String
    createItem(data: itemInput!): String
    deleteProject(name: String!): String
    deleteEvent(data: _eventInput!): String
    deleteItem(data: _itemInput!): String
    editProject(data: projectEditInput!): String
    addUserNameForItem(data: addUserInput!): String
}

type Subscription {
    update_project(id: String!): projectSubscriptionPayload
}

type Project {
    id: String!
    name: String!
    color: Int!
    usernames: [String]
    events: [Event]
}

type User {
    name: String!
    password: String!
}

type UserPayload {
    userinfo: User
    check: String!
    projects: [Project]
}

type Event {
    name: String!
    progress: String!
    time: Time!
    items: [Item]
}

type Item {
    name: String!
    usernames: [String]
    progress: String!
    time: Time!
}

type Time {
    start: String!
    end: String!
}

input timeInput {
    start: String!
    end: String!
}

type projectSubscriptionPayload{
    mutation: MutationType!
}

input userInput {
    name: String!
    type: String!
    password: String!
}

input projectInput {
    name: String!
    id: String!
    color: Int!
    username: String!
    events: [Event_]
}

input Event_ {
    name: String!
    progress: String!
    time: timeInput!
    items: [Item_]
}

input Item_ {
    name: String!
    usernames: [String]
    progress: String!
    time: timeInput!
}

input projectEditInput {
    id: String!
    recentContent: String!
}

input eventInput {
    id: String!
    event_name: String!
    progress: String!
    time: timeInput!
}

input _eventInput {
    id: String!
    event_name: String!
}

input itemInput {
    id: String!
    event_name: String!
    item_name: String!
    progress: String!
    time: timeInput!
    username: String!
}

input _itemInput {
    id: String!
    event_name: String!
    item_name: String!
}

input addUserInput {
    id: String!
    event_name: String!
    item_name: String!
    username: String!
}

enum MutationType{
  CREATED
  DELETED
  EDITED
}

`

module.exports = typeDefs;