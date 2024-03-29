import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import { countriesQuery, countryQuery } from '../graphql/queries'
import {saveCountryMutation, deleteCountryMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('userToken')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export function getCountries (page = null, take = null, filter= null, orderBy =null, fields) {
    var variables = {...fields, "page": page, "take": take,"filter": filter, "orderBy": orderBy}
    var fetcher = query => request(endpoint, query, variables)
    const { data, error, mutate } = useSWR(countriesQuery,fetcher);
    return {items: data, isLoading: !error && !data, isError: error, mutate}
}

export async function allCountries(fields){
    const data = await graphQLClient.request(countriesQuery, fields)
    console.info("The response : ", data )
    return {response: data.countries}
}

export async function getCountry (id, fields) {
    var variables = {...fields, "id": filterInt(id)}
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
