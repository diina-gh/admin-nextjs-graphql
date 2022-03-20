import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { shippingMethodsQuery, shippingMethodQuery } from '../graphql/queries'
import {saveShippingMethodMutation, deleteShippingMethodMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getShippingMethods (page = null, take = null, filter= null, orderBy =null) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(shippingMethodsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allShippingMethods(){
    const data = await graphQLClient.request(shippingMethodsQuery)
    console.info("The response : ", data )
    return {response: data.shippingMethods}
}

export async function getShippingMethod (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(shippingMethodQuery, variables)
    console.info("The response : ", data )
    return {response: data.shippingMethod}
}

export async function saveShippingMethod (id, name, code, desc) {
    var variables = {"id": filterInt(id), "name": name, "code": code, "desc": desc}
    const data = await graphQLClient.request(saveShippingMethodMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveShippingMethod }
}

export async function deleteShippingMethod (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteShippingMethodMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteShippingMethod }
}
