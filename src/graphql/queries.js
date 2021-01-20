import { gql } from 'apollo-boost'

export const PROJECT_QUERY = gql`
    query(
        $name: String!
    ){
        project(name: $name){
            name
            color
            usernames
            events{
                name
                progress
                time{
                    start
                    end
                }
                items{
                    name
                    progress
                    time{
                        start
                        end
                    }
                    usernames
                }
            }
        }
    }
`


export const USER_QUERY = gql`
    query(
        $name: String!
        $id: String!
        $type: String!
    ){
        user(data:{
            name: $name
            id: $id
            type: $type
        }){
            userinfo{
                name
                id
            }
            check
            projects{
                name
                color
                id
                usernames
                events{
                    name
                    progress
                    time{
                        start
                        end
                    }
                    items{
                        name
                        progress
                        time{
                            start
                            end
                        }
                    }
                }
            }
        }
    }
`
