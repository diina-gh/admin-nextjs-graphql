import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { countriesQuery, countryQuery } from '../graphql/queries'
import {saveCountryMutation, deleteCountryMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export function getCountries (page, take, filter, orderBy) {
    var variables = {"page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(countriesQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function getCountry (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(countryQuery, variables)
    console.info("The response : ", data )
    return {response: data.country}
}

export async function saveCountry (id, name, iso3, isoNum) {
    var variables = {"id": filterInt(id), "name": name, "iso3": iso3, "isoNum": isoNum}
    const data = await graphQLClient.request(saveCountryMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveCountry }
}

export async function deleteCountry (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteCountryMutation, variables)
    console.info("The response : ", data )
    return {response: data.deleteCountry }
}
