import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import {saveImageMutation, deleteImageMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'

const endpoint = "https://trade-two.vercel.app/graphql "
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY0NjI3NjgyMH0.ZP6ZUMKGFoYdWR28YV06Q4dUaY_HDDyJIjA2hqzwswQ',},})

export async function saveImage (id, imageUrl, imageref) {
    var variables = {id: filterInt(id) , "url": imageUrl, "imageref": imageref}
    const data = await graphQLClient.request(saveImageMutation, variables)
    console.log(JSON.stringify(data, undefined, 2))
    return {imageInfo: data.saveImage, imageLoading: !data, }
}

export async function DeleteImage (id) {

    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteImageMutation, variables)
    return {imageInfo: data,isLoading: !data,}
}
