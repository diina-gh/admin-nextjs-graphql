import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { paymentMethodsQuery, paymentMethodQuery } from '../graphql/queries'
import {savePaymentMethodMutation, deletePaymentMethodMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getPaymentMethods (page = null, take = null, filter= null, orderBy =null, fields) {
    var variables = {...fields, "page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(paymentMethodsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allPaymentMethods(fields){
    const data = await graphQLClient.request(paymentMethodsQuery, fields)
    console.info("The response : ", data )
    return {response: data.paymentMethods}
}

export async function getPaymentMethod (id, fields) {
    var variables = {...fields, "id": filterInt(id)}
    const data = await graphQLClient.request(paymentMethodQuery, variables)
    console.info("The response : ", data )
    return {response: data.paymentMethod}
}

export async function savePaymentMethod (id, name, code, desc) {
    var variables = {"id": filterInt(id), "name": name, "code": code, "desc": desc}
    const data = await graphQLClient.request(savePaymentMethodMutation, variables)
    console.info("The response : ", data )
    return {response: data.savePaymentMethod }
}

export async function deletePaymentMethod (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deletePaymentMethodMutation, variables)
    console.info("The response : ", data )
    return {response: data.deletePaymentMethod }
}
