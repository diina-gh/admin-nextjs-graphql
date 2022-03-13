import { gql } from "graphql-request";

export const saveDeliveryMan = gql`
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

export const deleteDeliveryMan = gql`
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

export const saveBrand = gql`
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

export const deleteBrand = gql`
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