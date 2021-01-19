const typeDefs = `
type Query {
    project(name: String!): Project!
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
    addProjectIdForUser(data: _userInput!): String
}

type Subscription {
    update_project(project_name: String!): projectSubscriptionPayload
}

type Project {
    id: String!
    name: String!
    usernames: [String]
    events: [Event]
}

type User {
    id: String!
    name: String!
    projects_id: [String]
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
    id: String!
}

input _userInput {
    name: String!
    project_id: String!
}

input projectInput {
    name: String!
    id: String!
    usernames: [String]
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
    name: String!
    recentContent: String!
}

input eventInput {
    project_name: String!
    event_name: String!
    progress: String!
    time: timeInput!
}

input _eventInput {
    project_name: String!
    event_name: String!
}

input itemInput {
    project_name: String!
    event_name: String!
    item_name: String!
    progress: String!
    time: timeInput!
}

input _itemInput {
    project_name: String!
    event_name: String!
    item_name: String!
}

enum MutationType{
  CREATED
  DELETED
  EDITED
}
`

module.exports = typeDefs;