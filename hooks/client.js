import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { clientsQuery } from '../graphql/queries'
import {saveClientMutation, deleteClientMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getClients (page, take, filter, orderBy, fields) {
    var variables = {...fields, "page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(clientsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allClients(page, take, filter, orderBy, fields){
    var variables = {...fields, "page": page, "take": take,"filter": filter, "orderBy": orderBy}
    const data = await graphQLClient.request(clientsQuery, variables)
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
