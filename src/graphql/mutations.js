import { gql } from 'apollo-boost'

export const CREATE_PROJECT_MUTATION = gql`
    mutation(
        $name: String!
        $id: String!
        $username: String!
        $color: Int!
        $updatetime: String!
    ){
        createProject(
            data: {
                name: $name
                id: $id
                username: $username
                color: $color
                updatetime: $updatetime
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
        $username: String!
        $updatetime: String!

    ){
        createEvent(data: {
            id: $id
            event_name: $event_name
            progress: $progress
            updatetime: $updatetime
            username: $username
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
        $updatetime: String!
    ){
        createItem(data: {
            id: $id
            event_name: $event_name
            item_name: $item_name
            progress: $progress
            username: $username
            updatetime: $updatetime

            time:{
                start: $start
                end: $end
            }
        })
    }
`

export const DELETE_PROJECT_MUTATION = gql`
    mutation deleteProject(
        $id: String!
    ){
<<<<<<< HEAD
        deleteProject(data:{
            name: $name
        })
=======
        deleteProject(id: $id)
>>>>>>> db4c44e22fcfc38defbf951a6daf347fee3700b4
    }
`
export const DELETE_EVENT_MUTATION = gql`
    mutation deleteEvent(
        $id: String!
        $event_name: String!
        $username: String!
        $updatetime: String!
    ){
        deleteEvent(data: {
            id: $id
            event_name: $event_name
            username: $username
            updatetime: $updatetime
        })
    }
`
export const DELETE_ITEM_MUTATION = gql`
    mutation deleteItem(
        $id: String!
        $event_name: String!
        $item_name: String!
        $username: String!
        $updatetime: String!
    ){
        deleteItem(data: {
            id: $id
            event_name: $event_name
            item_name: $item_name
            username: $username
            updatetime: $updatetime
        })
    }
`

export const EDIT_PROJECT_MUTATION = gql`
    mutation editProject(
        $id: String!
        $recentContent: String!
        $username: String!
        $updatetime: String!
        $message: String!
    ){
        editProject(data: {
            id: $id
            recentContent: $recentContent
            username: $username
            updatetime: $updatetime
        })
    }
`



