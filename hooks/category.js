import useSWR from 'swr'
import request from 'graphql-request'
import { categoriesQuery, categoryQuery, subCategoriesQuery } from '../graphql/queries'
const endpoint = "https://trade-two.vercel.app/graphql "

export function getCategories (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(categoriesQuery,fetcher);
  
    return {
        items: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}

export function getSubCategories (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(subCategoriesQuery,fetcher,);
  
    return {
        items: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    }
}

export function getCategory (id) {

    var variables = {"id": id}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(categoryQuery,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}
