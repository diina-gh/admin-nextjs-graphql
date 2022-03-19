import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { districtsQuery, districtQuery } from '../graphql/queries'
import {saveDistrictMutation, deleteDistrictMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getDistricts (page, take, filter, orderBy) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(districtsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function getDistrict (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(districtQuery, variables)
    console.info("The response xoxo : ", data )
    return {response: data.district}
}

export async function saveDistrict (id, name, shipping, regionId) {
    var variables = {"id": filterInt(id), "name": name, "shipping": filterInt(shipping), "regionId": filterInt(regionId)}
    const data = await graphQLClient.request(saveDistrictMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveDistrict }
}

export async function deleteDistrict (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteDistrictMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteDistrict }
}