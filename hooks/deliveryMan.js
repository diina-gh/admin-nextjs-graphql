import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { deliveryMansQuery, deliveryManQuery } from '../graphql/queries'
import {saveDeliveryManMutation, deleteDeliveryManMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getDeliveryMans (page = null, take = null, filter= null, orderBy =null, fields) {
    var variables = {...fields,"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(deliveryMansQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allDeliveryMans(fields){
    const data = await graphQLClient.request(deliveryMansQuery, fields)
    console.info("The response : ", data )
    return {response: data.deliveryMans}
}

export async function getDeliveryMan (id, fields) {
    var variables = {...fields, "id": filterInt(id)}
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
