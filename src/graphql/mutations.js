import { gql } from 'apollo-boost'

export const CREATE_PROJECT_MUTATION = gql`
    mutation(
        $project_name: ProjectInput!
        $progress: String!
        $start: String!
        $end: String!
    ){
        createProject(
            data: {
                name: $project_name
                progress: $progress
                time:{
                    start: $start
                    end: $end
                }
            }
        )
    }
`

export const CREATE_EVENT_MUTATION = gql`
    mutation createEvent(
        $project_name: String!
        $event_name: String!
        $progress: String!
        $start: String!
        $end: String!
    ){
        createEvent(data: {
            project_name: $project_name
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
        $project_name: String!
        $event_name: String!
        $item_name: String!
        $progress: String!
        $start: String!
        $end: String!
    ){
        createItem(data: {
            project_name: $project_name
            event_name: $event_name
            item_name: $item_name
            progress: $progress
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
        $project_name: String!
        $event_name: String!
    ){
        deleteEvent(data: {
            project_name: $project_name
            event_name: $event_name
        })
    }
`
export const DELETE_ITEM_MUTATION = gql`
    mutation deleteItem(
        $project_name: String!
        $event_name: String!
        $item_name: String!
    ){
        deleteItem(data: {
            project_name: $project_name
            event_name: $event_name
            item_name: $item_name
        })
    }
`




