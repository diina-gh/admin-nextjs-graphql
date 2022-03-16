import { gql } from "graphql-request";

export const saveDeliveryManMutation = gql`
    mutation($firstname: String, $lastname: String, $email: String, $phonenumber: String, $civility: Civility){
        saveDeliveryMan(firstname: $firstname, lastname: $lastname, email: $email, phonenumber: $phonenumber, civility: $civility) {
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
    mutation($name: String, $desc: String, $order: Int, $imageId: Int){
        saveBrand(name: $name, desc: $desc, order: $order, imageId: $imageId) {
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
    mutation($url: String, $imageref: String){
        saveImage(url: $url, imageref: $imageref) {
            id
            url
            imageref
        }
    }
`

export const deleteImageMutation = gql `
    mutation($id: Int){
        saveImage(id: $id) {
            id
            url
            imageref
        }
    }
`