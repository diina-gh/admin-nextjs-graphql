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