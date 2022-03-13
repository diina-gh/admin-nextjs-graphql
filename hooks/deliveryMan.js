import useSWR from 'swr'
import request from 'graphql-request'
import { deliveryManQuery, deliveryMansQuery } from '../graphql/queries'

const endpoint = "https://trade-two.vercel.app/graphql "

export function getDeliveryMans (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(deliveryMansQuery,fetcher);
  
    return {
        items: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export function getDeliveryMan(id) {

    var variables = {"id": id}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(deliveryManQuery,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}
