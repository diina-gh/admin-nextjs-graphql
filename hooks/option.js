import useSWR from 'swr'
import request from 'graphql-request'
import { optionQuery, optionsQuery } from '../graphql/queries'

const endpoint = "https://trade-two.vercel.app/graphql "

export function getOptions (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(optionsQuery,fetcher);
  
    return {
        items: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}


export function getOption (id) {

    var variables = {"id": id}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(optionQuery,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}
