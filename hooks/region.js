import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { regionsQuery, regionQuery } from '../graphql/queries'
import {saveRegionMutation, deleteRegionMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getRegions (page, take, filter, orderBy) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(regionsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allRegions(){
    const data = await graphQLClient.request(regionsQuery)
    console.info("The response : ", data )
    return {response: data.regions}
}

export async function getRegion (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(regionQuery, variables)
    console.info("The response : ", data )
    return {response: data.region}
}

export async function saveRegion (id, name, code, countryId) {
    var variables = {"id": filterInt(id), "name": name, "code": code, "countryId": filterInt(countryId)}
    const data = await graphQLClient.request(saveRegionMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveRegion }
}

export async function deleteRegion (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteRegionMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteRegion }
}