import { gql } from 'apollo-boost'

export const UPDATE_PROJECT_SUBSCRIPTION = gql`
    subscription(
        $project_name: String!
    ){
        update_project(project_name: $project_name){
            mutation
        }
    }
`