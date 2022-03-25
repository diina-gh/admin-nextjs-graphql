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

export const saveRegionMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const deleteRegionMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const saveDistrictMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const deleteDistrictMutation = gql `
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
            ... on InputError{
                message
                input
            }
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
    mutation($id: Int, $url: String, $imageref:String, $default: Boolean, $productId: Int, $optionId: Int, $brandId: Int, $categoryId: Int ){
        saveImage(id: $id, url: $url, imageref: $imageref, default: $default, productId: $productId, optionId: $optionId, brandId: $brandId, categoryId: $categoryId){
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

export const saveVariantMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const deleteVariantMutation = gql `
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
            ... on InputError{
            message
            input
            }
        }
    }
`

export const saveCategoryMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const deleteCategoryMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const saveShippingMethodMutation = gql `
    mutation($id: Int, $name: String, $code: String, $desc: String){
        saveShippingMethod(id: $id, name: $name, code: $code, desc: $desc){
            __typename
            ... on ShippingMethod{
                id
                name
                code
                desc
            }
            ... on InputError{
                message
                input
            }
        }
    }
`

export const deleteShippingMethodMutation = gql `
    mutation($id: Int){
        deleteShippingMethod(id: $id){
            __typename
            ... on ShippingMethod{
                id
                name
                code
                desc
            }
            ... on InputError{
                message
                input
            }
        }
    }
`

export const saveDeliveryManMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const deleteDeliveryManMutation = gql `
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
            ... on InputError{
                message
                input
            }
        }
    }
`

export const saveProductMutation = gql `
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
            ... on InputError{
                message
                input
            }
    }
  }
`

export const deleteProductMutation = gql `
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
            ... on InputError{
                message
                input
            }
    }
  }
`