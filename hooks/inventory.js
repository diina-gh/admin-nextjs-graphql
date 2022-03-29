import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { inventoriesQuery, inventoryQuery } from '../graphql/queries'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getInventories (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(inventoriesQuery,fetcher);
  
    return {
        items: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export function getInventory (id) {

    var variables = {"id": id}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(inventoryQuery,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}
