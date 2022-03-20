import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { deliveryMansQuery, deliveryManQuery } from '../graphql/queries'
import {saveDeliveryManMutation, deleteDeliveryManMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getDeliveryMans (page = null, take = null, filter= null, orderBy =null) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(deliveryMansQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allDeliveryMans(){
    const data = await graphQLClient.request(deliveryMansQuery)
    console.info("The response : ", data )
    return {response: data.deliveryMans}
}

export async function getDeliveryMan (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deliveryManQuery, variables)
    console.info("The response : ", data )
    return {response: data.deliveryMan}
}

export async function saveDeliveryMan (id, civility, firstname, lastname, email, phonenumber) {
    var variables = {"id": filterInt(id), "civility": civility, "firstname": firstname, "lastname": lastname, email: email, phonenumber: phonenumber}
    const data = await graphQLClient.request(saveDeliveryManMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveDeliveryMan }
}

export async function deleteDeliveryMan (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteDeliveryManMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteDeliveryMan }
}
