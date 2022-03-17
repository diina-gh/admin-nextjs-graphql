import { gql } from "graphql-request";

export const saveCountryMutation = gql `
    mutation($id: Int, $iso3: String, $isoNum:String, $name:String){
        saveCountry(id: $id, iso3: $iso3, isoNum: $isoNum, name: $name ){
            __typename
            ... on Country{
                id
                name
                iso3
                isoNum
            }
            ... on InputError{
                message
                input
            }    
        }
    }
`

export const deleteCountryMutation = gql `
    mutation($id: Int){
        deleteCountry(id: $id ){
            __typename
            ... on Country{
                id
                name
                iso3
                isoNum
            }
            ... on InputError{
                message
                input
            }    
        }
    }
`

export const deleteDeliveryManMutation = gql`
    mutation($id: Int){
        DeleteDeliveryMan(id: $id) {
            id
            firstname
            lastname
            email
            phonenumber
        }
    }
`

export const saveBrandMutation = gql`
    mutation($id: Int, $name: String, $desc: String, $order: Int){
        saveBrand(id: $id, name: $name, desc: $desc, order: $order){
            __typename
            ... on Brand{
                id
                name
                desc
                order
                image {
                    id
                    url
                    imageref
                }
            }
            ... on InputError{
                message
                input
            }
        }
    }
`

export const deleteBrandMutation = gql`
    mutation($id: Int){
        deleteBrand(id: $id){
            __typename
            ... on Brand{
                id
                name
                desc
                order
                image {
                    id
                    url
                    imageref
                }
            }
            ... on InputError{
                message
                input
            }
        }
    }
`

export const saveImageMutation = gql `
    mutation($id: Int, $url: String, $imageref:String, $default: Boolean, $productId: Int, $optionId: Int, $brandId: Int ){
        saveImage(id: $id, url: $url, imageref: $imageref, default: $default, productId: $productId, optionId: $optionId, brandId: $brandId){
            __typename
            ... on Image{
                id
                url
                imageref
                default
            }
            ... on InputError{
                message
                input
            }
        } 
    }
`

export const deleteImageMutation = gql `
    mutation($id: Int ){
        deleteImage(id: $id){
            __typename
            ... on Image{
                id
                url
                imageref
                default
            }
            ... on InputError{
                message
                input
            }
        } 
    }
`