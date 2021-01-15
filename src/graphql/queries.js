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
    ){
        user(name: $name){
            userinfo{
                name
                projects_id
                id
            }
            projects{
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
    }
`
