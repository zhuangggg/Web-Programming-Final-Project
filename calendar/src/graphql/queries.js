import { gql } from 'apollo-boost'

export const PROJECT_QUERY = gql`
    query(
        $name: String!
    ){
        project(name: $name){
            name
            progress
            time{
                start
                end
            }
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
                projects_id
                id
            }
            check
            projects{
                name
                progress
                id
                time{
                    start
                    end
                }
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