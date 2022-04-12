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
            id
            url
        }
    }
`

export const categoryFields = gql `

    ${parentFields}
    ${imageFields}
    ${childFields}

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
