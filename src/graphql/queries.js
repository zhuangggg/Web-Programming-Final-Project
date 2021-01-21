import { gql } from 'apollo-boost'

export const PROJECT_QUERY = gql`
    query(
        $id: String!
    ){
        project(id: $id){
            name
            lastupdated{
                username
                updatetime
                message
            }
            id
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
        $password: String!
        $type: String!
    ){
        user(data:{
            name: $name
            password: $password
            type: $type
        }){
            userinfo{
                name
                password
            }
            check
            projects{
                lastupdated{
                    username
                    updatetime
                    message
                }
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
                        usernames
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
