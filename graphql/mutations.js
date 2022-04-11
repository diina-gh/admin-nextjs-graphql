import { gql } from "graphql-request";
import * as Types from './types'

export const saveCountryMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $iso3: String, $isoNum:String, $name:String){
        saveCountry(id: $id, iso3: $iso3, isoNum: $isoNum, name: $name ){
            __typename
            ... on Country{
                id
                name
                iso3
                isoNum
            }
            ...InputError    
        }
    }
`

export const deleteCountryMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteCountry(id: $id ){
            __typename
            ... on Country{
                id
                name
                iso3
                isoNum
            }
            ...InputError    
        }
    }
`

export const saveRegionMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $code: String, $countryId: Int){
        saveRegion(id: $id, name: $name, code: $code, countryId: $countryId){
            __typename
            ... on Region{
                id
                name
                code
                countryId
                country{
                    id
                    name
                }
            }
            ...InputError
        }
    }
`

export const deleteRegionMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteRegion(id: $id){
            __typename
            ... on Region{
                id
                name
                code
                countryId
                country{
                    id
                    name
                }
            }
            ...InputError
        }
    }
`

export const saveDistrictMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $shipping: Float, $regionId: Int){
        saveDistrict(id: $id, name: $name, shipping: $shipping, regionId: $regionId){
            __typename
            ... on District{
                id
                name
                shipping
                regionId
                region {
                    id
                    name
                }
            }
            ...InputError
        }
    }
`

export const deleteDistrictMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteDistrict(id: $id){
            __typename
            ... on District{
                id
                name
                shipping
                regionId
                region {
                    id
                    name
                }
            }
            ...InputError
        }
    }
`

export const saveBrandMutation = gql`
    ${Types.InputError}
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
            ...InputError
        }
    }
`

export const deleteBrandMutation = gql`
    ${Types.InputError}
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
            ...InputError
        }
    }
`

export const saveImageMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $url: String, $imageref:String, $isDefault: Boolean, $productId: Int, $optionId: Int, $brandId: Int, $categoryId: Int, $userId: Int ){
        saveImage(id: $id, url: $url, imageref: $imageref, isDefault: $isDefault, productId: $productId, optionId: $optionId, brandId: $brandId, categoryId: $categoryId, userId: $userId){
            __typename
            ... on Image{
                id
                url
                imageref
            }
            ...InputError
        } 
    }
`

export const deleteImageMutation = gql `
    ${Types.InputError}
    mutation($id: Int ){
        deleteImage(id: $id){
            __typename
            ... on Image{
                id
                url
                imageref
                isDefault
            }
            ...InputError
        } 
    }
`

export const saveVariantMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $desc: String, $options: [OptionInput]){
        saveVariant(id: $id, name: $name, desc: $desc, options: $options){
            __typename
            ... on Variant{
                id
                name
                desc
                options {
                    id
                    value
                    colorCode
                }
            }
            ...InputError
        }
    }
`

export const deleteVariantMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteVariant(id: $id){
            __typename
            ... on Variant{
            id
            name
            desc
            options {
                id
                value
                colorCode
            }
            }
            ...InputError
        }
    }
`

export const saveCategoryMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $desc: String, $order: Int, $activated: Boolean, $parentId: Int){
        saveCategory(id: $id, name: $name, desc: $desc, order: $order, activated: $activated, parentId: $parentId){
            __typename
            ... on Category{
                id
                name
                desc
                long_desc
                parentId
                order
                activated
                parent {
                    id
                    name
                }
            }
            ...InputError
        }
    }
`

export const deleteCategoryMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteCategory(id: $id){
            __typename
            ... on Category{
                id
                name
                desc
                long_desc
                parentId
                order
                activated
                parent {
                    id
                    name
                }
            }
            ...InputError
        }
    }
`

export const saveShippingMethodMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $code: String, $desc: String){
        saveShippingMethod(id: $id, name: $name, code: $code, desc: $desc){
            __typename
            ... on ShippingMethod{
                id
                name
                code
                desc
            }
            ...InputError
        }
    }
`

export const deleteShippingMethodMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteShippingMethod(id: $id){
            __typename
            ... on ShippingMethod{
                id
                name
                code
                desc
            }
            ...InputError
        }
    }
`

export const savePaymentMethodMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $code: String, $desc: String){
        savePaymentMethod(id: $id, name: $name, code: $code, desc: $desc){
            __typename
            ... on PaymentMethod{
                id
                name
                code
                desc
            }
            ...InputError
        }
    }
`

export const deletePaymentMethodMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deletePaymentMethod(id: $id){
            __typename
            ... on PaymentMethod{
                id
                name
                code
                desc
            }
            ...InputError
        }
    }
`

export const saveDeliveryManMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $firstname: String, $lastname: String, $email: String, $phonenumber: String, $civility: Civility){
        saveDeliveryMan(id: $id, firstname: $firstname, lastname: $lastname, email: $email, phonenumber: $phonenumber, civility: $civility){
            __typename
            ... on DeliveryMan{
                id
                civility
                firstname
                lastname
                email
                phonenumber

            }
            ...InputError
        }
    }
`

export const deleteDeliveryManMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteDeliveryMan(id: $id){
            __typename
            ... on DeliveryMan{
                id
                civility
                firstname
                lastname
                email
                phonenumber

            }
            ...InputError
        }
    }
`

export const saveProductMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $desc: String, $activated: Boolean, $unit: String, $unitweight: Float, $unitprice: Float, $order: Int, $categoryId: Int, $brandId: Int, $variants: [Int], $options: [Int], $gender: Gender, $relatives: [Int]){
        saveProduct(id: $id, name: $name, desc: $desc, activated: $activated, unit: $unit, unitweight: $unitweight, unitprice: $unitprice, order: $order, categoryId: $categoryId, brandId: $brandId, variants: $variants, options: $options, gender: $gender, relatives: $relatives){
            __typename
            ... on Product{
                id
                name
                desc
                activated
                unit
                unitprice
                unitweight
                order
                categoryId
                brandId
                gender
                variants {
                    variantId
                    variant {
                        id
                        name
                        desc
                    }
                }
                options {
                    optionId
                    option {
                        id
                        value
                        colorCode
                    }
                }
                images {
                    id
                    url
                    imageref
                }
            }
            ...InputError
    }
  }
`

export const deleteProductMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteProduct(id: $id){
            __typename
            ... on Product{
                id
                name
                desc
                activated
                unit
                unitprice
                unitweight
                order
                categoryId
                brandId
                gender
                variants {
                    variantId
                    variant {
                        id
                        name
                        desc
                    }
                }
                options {
                    optionId
                    option {
                        id
                        value
                        colorCode
                    }
                }
                images {
                    id
                    url
                    imageref
                }
            }
            ...InputError
    }
  }
`

export const savePermissionMutation = gql`
    ${Types.InputError}
    mutation($id: Int, $name: String, $desc: String){
        savePermission(id: $id, name: $name, desc: $desc){
            __typename
            ...on Permission{
                id
                name
                desc
            }
            ...InputError
        }
    }
`

export const deletePermissionMutation = gql`
    ${Types.InputError}
    mutation($id: Int){
        deletePermission(id: $id){
            __typename
            ...on Permission{
                id
                name
                desc
            }
            ...InputError
        }
    }
`

export const saveRoleMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $name: String, $desc: String, $permissions: [Int]){
        saveRole(id: $id, name: $name, desc: $desc, permissions: $permissions){
            __typename
            ...on Role{
                id
                name
                desc
            }
            ...InputError
        }
    }
`

export const deleteRoleMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        deleteRole(id: $id){
            __typename
            ...on Role{
                id
                name
                desc
                
            }
            ...InputError
        }
    }
`

export const saveUserMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $firstname: String, $lastname: String, $email: String, $phonenumber: String, $roles: [Int], $password: String, $repassword: String, $civility: Civility){
        saveUser(id: $id, firstname: $firstname, lastname: $lastname, email: $email, phonenumber: $phonenumber, roles: $roles, password: $password, repassword: $repassword, civility: $civility){
            __typename
            ...on AuthPayload{
            token
            user {
                id
                email
                firstname
                lastname
                phonenumber
                roles {
                    roleId
                    role{
                        id
                        name
                    }
                }
            }
            }
            ...InputError
        }
    }
`

export const deleteUserMutation = gql `
    ${Types.InputError}
    mutation($id:Int){
        deleteUser(id: $id){
            __typename
            ...on User{
                id
            }
            ...InputError
        }
    }
`

export const saveClientMutation = gql `
    ${Types.InputError}
    mutation($id: Int, $firstname: String, $lastname: String, $email: String, $phonenumber: String, $addresses: [AddressInput], $civility: Civility){
        saveClient(id: $id, firstname: $firstname, lastname: $lastname, email: $email, phonenumber: $phonenumber, addresses: $addresses, civility: $civility){
            __typename
            ...on User{
                id
                firstname
                lastname
                email
                phonenumber
                districts {
                    districtId
                    district {
                        id
                        name
                    }
                }
            }
            ...InputError
        }
    }
`


export const deleteClientMutation = gql `
    ${Types.InputError}
    mutation($id: Int){
        saveClient(id: $id){
            __typename
            ...on User{
                id
                firstname
                lastname
                email
                phonenumber
                districts {
                    districtId
                    district {
                        id
                        name
                    }
                }
            }
            ...InputError
        }
    }
`

export const loginMutation = gql `
    ${Types.InputError}
    mutation($email: String, $password: String){
        login(email: $email, password: $password){
            __typename
            ...on AuthPayload{
            token
            user {
                id
                activated
                civility
                firstname
                lastname
                email
                phonenumber
                image {
                    imageref
                    url
                }
                roles {
                    roleId
                    role{
                        id
                        name
                    }
                }
            }
            }
            ...InputError
        }
    }
`