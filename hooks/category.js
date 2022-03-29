import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { categoriesQuery, categoryQuery, subCategoriesQuery } from '../graphql/queries'
import {saveCategoryMutation, deleteCategoryMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getCategories (page, take, filter, orderBy) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(categoriesQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export function getSubCategories (page, take, filter, orderBy) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(subCategoriesQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allCategories(){
    const data = await graphQLClient.request(categoriesQuery)
    console.info("The response : ", data )
    return {response: data.categories}
}

export async function getCategory (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(categoryQuery, variables)
    console.info("The response : ", data )
    return {response: data.category}
}

export async function saveCategory (id, name, desc, order, activated, parentId) {
    var variables = {"id": filterInt(id), "name": name, "desc": desc, "order": filterInt(order) , "activated": activated, "parentId": filterInt(parentId)}
    const data = await graphQLClient.request(saveCategoryMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveCategory }
}

export async function deleteCategory (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteCategoryMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteCategory }
}