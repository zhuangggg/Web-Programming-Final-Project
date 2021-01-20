import { gql } from 'apollo-boost'

export const CREATE_PROJECT_MUTATION = gql`
    mutation(
        $name: String!
        $id: String!
        $username: String!
        $color: Int!
    ){
        createProject(
            data: {
                name: $name
                id: $id
                username: $username
                color: $color
            }
        )
    }
`

export const CREATE_EVENT_MUTATION = gql`
    mutation createEvent(
        $id: String!
        $event_name: String!
        $progress: String!
        $start: String!
        $end: String!
    ){
        createEvent(data: {
            id: $id
            event_name: $event_name
            progress: $progress
            time:{
                start: $start
                end: $end
            }
        })
    }
`

export const CREATE_ITEM_MUTATION = gql`
    mutation createItem(
        $id: String!
        $event_name: String!
        $item_name: String!
        $progress: String!
        $start: String!
        $end: String!
        $username: String!
    ){
        createItem(data: {
            id: $id
            event_name: $event_name
            item_name: $item_name
            progress: $progress
            username: $username
            time:{
                start: $start
                end: $end
            }
        })
    }
`

export const DELETE_PROJECT_MUTATION = gql`
    mutation deleteProject(
        $name: String!
    ){
        deleteProject(name: $name)
    }
`
export const DELETE_EVENT_MUTATION = gql`
    mutation deleteEvent(
        $id: String!
        $event_name: String!
    ){
        deleteEvent(data: {
            id: $id
            event_name: $event_name
        })
    }
`
export const DELETE_ITEM_MUTATION = gql`
    mutation deleteItem(
        $id: String!
        $event_name: String!
        $item_name: String!
    ){
        deleteItem(data: {
            id: $id
            event_name: $event_name
            item_name: $item_name
        })
    }
`

export const EDIT_PROJECT_MUTATION = gql`
    mutation editProject(
        $id: String!
        $recentContent: String!
    ){
        editProject(data: {
            id: $id
            recentContent: $recentContent
        })
    }
`



