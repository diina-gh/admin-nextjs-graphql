import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { optionsQuery, optionQuery } from '../graphql/queries'
import {saveOptionMutation, deleteOptionMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getOptions (page = null, take = null, filter= null, orderBy =null) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(optionsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allOptions(){
    const data = await graphQLClient.request(optionsQuery)
    console.info("The response : ", data )
    return {response: data.options}
}

export async function getOption (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(optionQuery, variables)
    console.info("The response : ", data )
    return {response: data.option}
}

export async function saveOption (id, name, desc, options) {
    var newOptions = options.map((item) => ({value: item.value, colorCode: item.colorCode}));
    var variables = {"id": filterInt(id), "name": name, "desc": desc, "options": newOptions}
    const data = await graphQLClient.request(saveOptionMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveOption }
}

export async function deleteOption (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteOptionMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteOption }
}
