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
    mutation($id: Int, $name: String, $desc: String, $order: Int, $imageId: Int){
        saveBrand(id: $id, name: $name, desc: $desc, order: $order, imageId: $imageId) {
            id
            name
            desc
            image {
                id
                imageref
                url
            }
        }
    }
`

export const deleteBrandMutation = gql`
    mutation($id: Int){
        deleteBrand(id: $id) {
            id
            name
            desc
            image {
                id
                imageref
                url
            }
        }
    }
`

export const saveImageMutation = gql `
    mutation($id: Int, $url: String, $imageref: String){
        saveImage(id:$id, url: $url, imageref: $imageref) {
            id
            url
            imageref
        }
    }
`

export const deleteImageMutation = gql `
    mutation($id: Int){
        deleteImage(id: $id) {
            id
            url
            imageref
        }
    }
`