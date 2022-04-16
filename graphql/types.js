import { gql } from 'graphql-request'

export const InputError = gql `
    fragment InputError on InputError {
        message
        input
    }
`

export const imageFields = gql `           
    fragment imageFields on Image {
        id
        url @include(if: $imageUrl)
        imageref @include(if: $imageImageref)
    }
`

export const newsletterFields = gql `           
    fragment newsletterFields on Newsletter {
        id
        email @include(if: $newsletterEmail)
        createdat @include(if: $newsletterCreatedat)
    }
`

export const parentFields = gql `           
    fragment parentFields on Category {
        id
        name @include(if: $parentName)
        desc  @include(if: $parentDesc)
    }
`

export const childFields = gql `  
    fragment childFields on Category {
        id
        name @include(if: $childName)
        desc  @include(if: $childDesc)
        image @include(if: $childImage){
            ...imageFields
        }
    }
`

export const categoryFields = gql `
    ${parentFields} ${imageFields} ${childFields}
    fragment categoryFields on Category {
        id
        name @include(if: $categoryName)
        desc @include(if: $categoryDesc)
        order @include(if: $categoryOrder)
        createdat @include(if: $categoryCreatedat)
        activated @include(if: $categoryActivated)
        parentId @include(if: $categoryParentId)
        parent @include(if: $categoryParent) {
            ...parentFields
        }
        childs @include(if: $categoryChilds){
            ...childFields  
        }
        image @include(if: $categoryImage){
            ...imageFields
        }
    }
`

export const optionFields = gql `           
    fragment optionFields on Option {
        id
        value @include(if: $optionValue)
        colorCode @include(if: $optionColorCode)
        variantId @include(if: $optionVariantId)
        variant @include(if: $optionVariant) {
            id
            name @include(if: $optionVariantName)
        }
    }
`

export const variantFields = gql `  
    ${optionFields}
    fragment variantFields on Variant {
        id
        name @include(if: $variantName)
        desc @include(if: $variantDesc)
        createdat @include(if: $variantCreatedat)
        options @include(if: $variantOptions){
            ...optionFields  
        }
    }
`

export const countryFields = gql`
    fragment countryFields on Country {
        id
        name @include(if: $countryName)
        iso3 @include(if: $countryIso3)
        isoNum @include(if: $countryIsoNum)
        createdat @include(if: $countryCreatedAt)
        updatedat @include(if: $countryUpdatedAt)
    }
`

export const regionFields = gql`
    ${countryFields}
    fragment regionFields on Region {
        id
        name @include(if: $regionName)
        code @include(if: $regionCode)
        createdat @include(if: $regionCreatedAt)
        updatedat @include(if: $regionUpdatedAt)
        country @include(if: $regionCountry) {
            id
            name @include(if: $regionCountryName)
        }
    }
`

export const districtFields = gql`
    ${regionFields}
    fragment districtFields on District {
        id
        name @include(if: $districtName)
        shipping @include(if: $districtShipping)
        createdat @include(if: $regionCreatedAt)
        updatedat @include(if: $regionUpdatedAt)
        region @include(if: $districtRegion) {
            id
            name @include(if: $districtRegionName)
        }
    }
`
export const shippingMethodFields = gql`
    fragment shippingMethodFields on ShippingMethod {
        id
        code @include(if: $shippingMethodCode)
        name @include(if: $shippingMethodName)
        desc @include(if: $shippingMethodDesc)
        createdat @include(if: $shippingMethodCreatedAt)
        updatedat @include(if: $shippingMethodUpdatedAt)
    }
`

export const paymentMethodFields = gql`
    fragment paymentMethodFields on PaymentMethod {
        id
        code @include(if: $paymentMethodCode)
        name @include(if: $paymentMethodName)
        desc @include(if: $paymentMethodDesc)
        createdat @include(if: $paymentMethodCreatedAt)
        updatedat @include(if: $paymentMethodUpdatedAt)
    }
`

export const deliveryManFields = gql`
    fragment deliveryManFields on DeliveryMan {
        id
        civility @include(if: $deliveryManCivility)
        firstname @include(if: $deliveryManFirstname)
        lastname @include(if: $deliveryManLastname)
        email @include(if: $deliveryManEmail)
        phonenumber @include(if: $deliveryManPhonenumber)
        createdat @include(if: $deliveryManCreatedAt)
        updatedat @include(if: $deliveryManUpdatedAt)
    }
`

export const brandFields = gql`
    ${imageFields} 
    fragment brandFields on Brand {
        id
        name @include(if: $brandName)
        desc @include(if: $brandDesc)
        order @include(if: $brandOrder)
        image @include(if: $brandImage){
            ...imageFields
        }
    }
`

export const discountFields = gql`
    fragment discountFields on Discount {
        id
        percent @include(if: $discountPercent)
    }
`

export const inventoryFields = gql`
    fragment inventoryFields on Inventory {
        id
        quantity @include(if: $inventoryQuantity)
        details @include(if: $inventoryDetails)
    }
`

export const relativeFields = gql `  
    fragment relativeFields on Product {
        id
        name @include(if: $relativeName)
        desc  @include(if: $relativeDesc)
        unitprice  @include(if: $relativeUnitPrice)
        image @include(if: $relativeImage){
            ...imageFields
        }
        brand @include(if: $relativeBrand){
            id
            name
            image{
                url
            }
        }
        category @include(if: $relativeCategory){
            id
            name
            image{
                url
            }
        }
    }
`

export const productFields = gql`
    ${variantFields} ${optionFields} ${imageFields} ${relativeFields} ${discountFields} ${inventoryFields}
    fragment productFields on Product {
        id
        name @include(if: $productName)
        desc @include(if: $productDesc)
        order @include(if: $productOrder)
        unit @include(if: $productUnit)
        unitprice @include(if: $productUnitprice)
        unitweight @include(if: $productUnitweight)
        status @include(if: $productStatus)
        activated @include(if: $productActivated)
        taxable @include(if: $productTaxable)
        ranking @include(if: $productRanking)
        likes @include(if: $productLikes)
        views @include(if: $productViews)
        createdat @include(if: $productCreatedat)
        updatedat @include(if: $productUpdatedat)
        gender @include(if: $productGender)
        brand @include(if: $productBrand){
            id
            name
            image{url}
        }
        category @include(if: $productCategory){
            id
            name
            image{url}
        }
        variant @include(if: $productVariant){
            ...variantFields
        }
        option @include(if: $productOption){
            ...optionFields
        }
        discount @include(if: $productDiscount){
            ...discountFields
        }
        inventory @include(if: $productInventory){
            ...inventoryFields
        }
        relatives @include(if: $productRelatives){
            ...relativeFields
        }
        related @include(if: $productRelated){
            ...relativeFields
        }
        image @include(if: $productImage){
            ...imageFields
        }
    }
`

export const permissionFields = gql`
    fragment permissionFields on Permission {
        id
        name @include(if: $permissionName)
        desc @include(if: $permissionDesc)
    }
`

export const roleFields = gql`
    ${permissionFields}
    fragment roleFields on Role {
        id
        name @include(if: $roleName)
        desc @include(if: $roleDesc)
        permission @include(if: $rolePermission){
            ...permissionFields
        }
    }
`

export const userFields = gql`
    ${roleFields}
    fragment userFields on User {
        id
        activated @include(if: $userActivated)
        civility @include(if: $userCivility)
        firstname @include(if: $userFirstname)
        lastname @include(if: $userLastname)
        email @include(if: $userEmail)
        phonenumber @include(if: $userPhonenumber)
        roles @include(if: $userRoles){
            ...permissionFields
        }
    }
`