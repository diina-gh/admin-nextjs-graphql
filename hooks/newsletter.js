import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { newslettersQuery, newsletterQuery } from '../graphql/queries'
// import {saveNewsletterMutation, deleteNewsletterMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getNewsletters (page = null, take = null, filter= null, orderBy =null, fields) {
    var variables = {...fields, "page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(newslettersQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allNewsletters(fields){
    const data = await graphQLClient.request(newslettersQuery, fields)
    console.info("The response : ", data )
    return {response: data.newsletters}
}

export async function getNewsletter (id, fields) {
    var variables = {...fields, "id": filterInt(id)}
    const data = await graphQLClient.request(newsletterQuery, variables)
    console.info("The response : ", data )
    return {response: data.newsletter}
}

