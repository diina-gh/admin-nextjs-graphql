import { gql } from "graphql-request";

export const saveDeliveryManMutation = gql`
    mutation($id: Int, $firstname: String, $lastname: String, $email: String, $phonenumber: String, $civility: Civility){
        saveDeliveryMan(id: $id, firstname: $firstname, lastname: $lastname, email: $email, phonenumber: $phonenumber, civility: $civility) {
            id
            firstname
            lastname
            email
            phonenumber
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