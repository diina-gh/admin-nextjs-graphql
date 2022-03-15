import useSWR from 'swr'
import request from 'graphql-request'
import { brandsQuery, brandQuery } from '../graphql/queries'
import {saveBrandMutation, deleteBrandMutation} from "../graphql/mutations"

const endpoint = "https://trade-two.vercel.app/graphql "

export function getBrands (page, take, filter, orderBy) {

    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(brandsQuery,fetcher);
  
    return {
        items: data,
        isLoading: !error && !data,
        isError: error,
        mutate
    }
}


export function getBrand (id) {

    var variables = {"id": id}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(brandQuery,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}

export function saveBrand (id, name, desc, order, imageId) {

    var variables = {"id": id, "name": name, "desc": desc, "order": order, "imageId": imageId}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(saveBrandMutation,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}

export function DeleteBrand (id) {

    var variables = {"id": id}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error } = useSWR(deleteBrandMutation,fetcher);
  
    return {
      item: data,
      isLoading: !error && !data,
      isError: error,
    }
}
