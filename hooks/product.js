import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { filterInt } from '../libs/util'
import { productsQuery, productQuery } from '../graphql/queries'

const endpoint = "https://trade-two.vercel.app/graphql "
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getProducts (page, take, filter, orderBy) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(productsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allProducts(page = null, take = null, filter = null, orderBy = null){
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    const data = await graphQLClient.request(productsQuery, variables)
    console.info("The response : ", data )
    return {response: data.products}
}

export async function getProduct (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(productQuery, variables)
    console.info("The response : ", data )
    return {response: data.product}
}
