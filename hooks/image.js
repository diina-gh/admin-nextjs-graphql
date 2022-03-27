import useSWR from 'swr'
import {GraphQLClient, request} from 'graphql-request'
import {saveImageMutation, deleteImageMutation} from "../graphql/mutations"
import { filterInt } from '../libs/util'
import Cookies from 'js-cookie'

const token = Cookies.get('user_token')
const endpoint = "https://trade-two.vercel.app/graphql"
const graphQLClient = new GraphQLClient(endpoint, {headers: {authorization: token,},})

export async function saveImage (id, imageUrl, imageref, productId = null, optionId = null, brandId = null, categoryId= null, userId= null ) {
    var variables = {id: filterInt(id) , "url": imageUrl, "imageref": imageref, "productId": filterInt(productId) , "optionId": filterInt(optionId) , "brandId": filterInt(brandId), "categoryId": filterInt(categoryId), "userId": filterInt(userId) }
    const data = await graphQLClient.request(saveImageMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveImage }
}

export async function deleteImage (id) {
    var variables = {"id": filterInt(id)}
    const data = await graphQLClient.request(deleteImageMutation, variables)
    console.info("The response : ", data )
    return {response: data.saveImage }
}
