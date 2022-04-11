import { gql } from 'graphql-request'

export const InputError = gql `
    fragment InputError on InputError {
        message
        input
    }
`