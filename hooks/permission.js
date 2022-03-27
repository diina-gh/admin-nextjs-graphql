import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { permissionsQuery, permissionQuery } from '../graphql/queries'
import {savePermissionMutation, deletePermissionMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('user_token')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getPermissions (page = null, take = null, filter= null, orderBy =null) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(permissionsQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allPermissions(){
    const data = await graphQLClient.request(permissionsQuery)
    console.info("The response : ", data )
    return {response: data.permissions}
}

export async function getPermission (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(permissionQuery, variables)
    console.info("The response : ", data )
    return {response: data.permission}
}

export async function savePermission (id, name, desc) {
    var variables = {"id": filterInt(id), "name": name, "desc": desc}
    const data = await graphQLClient.request(savePermissionMutation, variables)
    console.info("The response : ", data )
    return {response: data.savePermission }
}

export async function deletePermission (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deletePermissionMutation, variables)
    console.info("The response : ", data )
    return {response: data.deletePermission }
}
