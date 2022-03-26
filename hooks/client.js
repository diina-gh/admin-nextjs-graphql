import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { clientsQuery } from '../graphql/queries'
import {saveClientMutation, deleteClientMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getClients (page = null, take = null, filter= null, orderBy =null) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(clientsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allClients(){
    const data = await graphQLClient.request(clientsQuery)
    console.info("The response : ", data )
    return {response: data.clients}
}


export async function saveClient (id, civility, firstname, lastname, email, phonenumber, addresses) {
    var variables = {"id": filterInt(id), "firstname": firstname, "civility": civility, "lastname": lastname, "phonenumber": phonenumber, "email":email, "addresses": addresses}
    const data = await graphQLClient.request(saveClientMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveClient }
}

export async function deleteClient(id) {
    var variables = {"id": parseInt(id)}
    const data = await graphQLClient.request(deleteClientMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteClient }
}
