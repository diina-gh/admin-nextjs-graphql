import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { usersQuery, userQuery } from '../graphql/queries'
import {saveUserMutation, deleteUserMutation, loginMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getUsers (page = null, take = null, filter= null, orderBy =null) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(usersQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allUsers(){
    const data = await graphQLClient.request(usersQuery)
    console.info("The response : ", data )
    return {response: data.users}
}

export async function getUser (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(userQuery, variables)
    console.info("The response : ", data )
    return {response: data.user}
}

export async function saveUser (id, firstname, lastname, email, phonenumber, roles, password = null, repassword = null, civility) {
    var variables = {"id": filterInt(id), "firstname": firstname, "lastname": lastname, "phonenumber": phonenumber, "email":email, "password": password, "repassword": repassword, "roles": roles, "civility": civility}
    const data = await graphQLClient.request(saveUserMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveUser }
}

export async function login(email, password) {
    var variables = {"email": email, "password": password}
    const data = await graphQLClient.request(loginMutation, variables)
    console.info("The response : ", data )
    return {response: data.login }
}

export async function deleteUser(id) {
    var variables = {"id": parseInt(id)}
    const data = await graphQLClient.request(deleteUserMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteUser }
}
