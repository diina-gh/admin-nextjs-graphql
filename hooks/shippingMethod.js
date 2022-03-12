import useSWR from 'swr'
import request from 'graphql-request'
import { shippingMethodQuery, shippingMethodsQuery } from '../graphql/queries'

const endpoint = "https://trade-two.vercel.app/graphql "

export function getShippingMethods (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(shippingMethodsQuery,fetcher);
  
    return {
        items: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export function getShippingMethod (id) {

    var variables = {"id": id}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(shippingMethodQuery,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}
