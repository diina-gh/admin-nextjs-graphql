import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { variantsQuery, variantQuery } from '../graphql/queries'
import {saveVariantMutation, deleteVariantMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getVariants (page = null, take = null, filter= null, orderBy =null) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(variantsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allVariants(){
    const data = await graphQLClient.request(variantsQuery)
    console.info("The response : ", data )
    return {response: data.variants}
}

export async function getVariant (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(variantQuery, variables)
    console.info("The response : ", data )
    return {response: data.variant}
}

export async function saveVariant (id, name, desc, options) {
    var newOptions = options.map((item) => ({value: item.value, colorCode: item.colorCode}));
    var variables = {"id": filterInt(id), "name": name, "desc": desc, "options": newOptions}
    const data = await graphQLClient.request(saveVariantMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveVariant }
}

export async function deleteVariant (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteVariantMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteVariant }
}
