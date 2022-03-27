import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { filterInt } from '../libs/util'
import { productsQuery, productQuery } from '../graphql/queries'
import { saveProductMutation, deleteProductMutation } from '../graphql/mutations'
import Cookies from 'js-cookie'

const token = Cookies.get('user_token')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

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

export async function getProduct(id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(productQuery, variables)
    console.info("The response : ", data )
    return {response: data.product}
}

export async function saveProduct(id, name, desc, activated, unit, unitweight, unitprice, order, categoryId, brandId, variants, options, gender, relatives) {
    var variables = {"id": filterInt(id), "name": name, "desc": desc, "activated": activated, "unit": unit, "unitweight": filterInt(unitweight), "unitprice": filterInt(unitprice), "order": filterInt(order), "categoryId": filterInt(categoryId), "brandId": filterInt(brandId), "variants": variants, "options": options, "gender": gender, "relatives": relatives }
    const data = await graphQLClient.request(saveProductMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveProduct }
}

export async function deleteProduct (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteProductMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteProduct }
}