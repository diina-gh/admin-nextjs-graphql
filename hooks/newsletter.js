import useSWR from 'swr'
import request from 'graphql-request'
import {newsletterQuery, newslettersQuery} from '../graphql/queries'

const endpoint = "https://trade-two.vercel.app/graphql "

export function getNewsletters (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(newslettersQuery,fetcher);
  
    return {
      items: data,
      isLoading: !error && !data,
      isError: error,
      mutate
    }
}


