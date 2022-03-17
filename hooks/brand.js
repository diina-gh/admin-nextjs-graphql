import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { brandsQuery, brandQuery } from '../graphql/queries'
import {saveBrandMutation, deleteBrandMutation, saveImageMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getBrands (page, take, filter, orderBy) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(brandsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function getBrand (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(brandQuery, variables)
    return {item: data, isLoading: !data,}
}

export async function saveBrand (id, name, desc, order) {
    var variables = {"id": filterInt(id), "name": name, "desc": desc, "order": filterInt(order)}
    const data = await graphQLClient.request(saveBrandMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveBrand }
}

export async function deleteBrand (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteBrandMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteBrand }
}
