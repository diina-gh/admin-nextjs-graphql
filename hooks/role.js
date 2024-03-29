import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { rolesQuery, roleQuery } from '../graphql/queries'
import {saveRoleMutation, deleteRoleMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getRoles (page, take, filter, orderBy, fields) {
    var variables = {...fields, "page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(rolesQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allRoles(fields){
    const data = await graphQLClient.request(rolesQuery, fields)
    console.info("The response : ", data )
    return {response: data.roles}
}

export async function getRole (id, fields) {
    var variables = {...fields, "id": filterInt(id)}
    const data = await graphQLClient.request(roleQuery, variables)
    console.info("The response : ", data )
    return {response: data.role}
}

export async function saveRole (id, name, desc, permissions) {
    var variables = {"id": filterInt(id), "name": name, "desc": desc, "permissions": permissions}
    const data = await graphQLClient.request(saveRoleMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveRole }
}

export async function deleteRole (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteRoleMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteRole }
}
