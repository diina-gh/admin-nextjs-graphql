import { gql } from 'graphql-request'
import * as Types from './types'

export const newslettersQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: NewsletterOrderByInput){
        newsletters(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            newsletters {
                id
                email
                createdat
            }
        }
    }
`

export const newsletterQuery = gql`
    query($newsletterId: Int){
        newsletter(id: $newsletterId) {
            id
            email
            createdat
        }
    }
`

export const districtsOnUsersQuery = gql `
    query($page: Int, $take: Int, $filter: String, $orderBy: DistrictsOnUsersOrderByInput, $userId: Int){
        districtsOnUsers(page: $page, take: $take, filter: $filter, orderBy: $orderBy, userId: $userId) {
            id
            line1
            line2
            default
            count
            user {
                email
                firstname
                lastname
            }
            district {
                name
                region {
                    name
                    country {
                        name
                    }
                }
            }
        }
    }
`

export const categoriesQuery = gql`
    ${Types.categoryFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: CategoryOrderByInput,
          $categoryName: Boolean = false, $categoryDesc: Boolean = false, $categoryOrder: Boolean = false, $imageUrl: Boolean = false, 
          $categoryCreatedat: Boolean = false, $categoryActivated: Boolean = false, $categoryParentId: Boolean = false, $imageImageref: Boolean = false, 
          $categoryImage: Boolean = false, $categoryParent: Boolean = false, $parentName: Boolean = false, $parentDesc: Boolean = false,
          $categoryChilds: Boolean = false, $childName: Boolean = false, $childDesc: Boolean = false, $childImage: Boolean = false   
        ){

        categories(page: $page, take: $take, filter: $filter, orderBy: $orderBy ){
            count
            countSub
            categories {
                ...categoryFields
            }
        }

    }
`

export const subCategoriesQuery = gql`
    ${Types.categoryFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: CategoryOrderByInput,
          $categoryName: Boolean = false, $categoryDesc: Boolean = false, $categoryOrder: Boolean = false, $imageUrl: Boolean = false, 
          $categoryCreatedat: Boolean = false, $categoryActivated: Boolean = false, $categoryParentId: Boolean = false, $imageImageref: Boolean = false, 
          $categoryImage: Boolean = false, $categoryParent: Boolean = false, $parentName: Boolean = false, $parentDesc: Boolean = false,
          $categoryChilds: Boolean = false, $childName: Boolean = false, $childDesc: Boolean = false, $childImage: Boolean = false   
        ){

        subCategories(page: $page, take: $take, filter: $filter, orderBy: $orderBy ){
            count
            countSub
            categories {
                ...categoryFields
            }
        }
    }
`

export const categoryQuery = gql `
    ${Types.InputError}
    query($id: Int){
        category(id: $id) {
            __typename
            ... on Category{
                id
                name
                desc
                long_desc
                parentId
                order
                activated
                image {
                    id
                    url
                    imageref
                }
                parent {
                    id
                    name
                }
                
            }
            ...InputError
        }
    }
`

export const variantQuery = gql`
    ${Types.InputError}
    query($id: Int){
        variant(id: $id) {
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

export const variantsQuery = gql`
    query($filter: String, $page: Int, $take: Int, $orderBy: VariantOrderByInput){
        variants(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            countOpt
            variants {
                id
                name
                desc
                createdat
                options {
                    id
                    value
                    colorCode
                }
            }
        }
    }
`

export const optionQuery = gql `
    query($id: Int){
        option(id: $id) {
            id
            value
            colorCode
            variantId
            variant {
                id
                name
            }
        }
    }
`

export const optionsQuery = gql `
    query($filter: String, $page: Int, $take: Int, $orderBy: OptionOrderByInput){
        options(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            options {
                id
                value
                colorCode
                variantId
                variant {
                    id
                    name
                }
            }
        }
    }
`

export const countriesQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: CountryOrderByInput){
        countries(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            countries{
                id
                name
                iso3
                isoNum
                createdat
                updatedat
            }
        }
    }
`

export const countryQuery = gql`
    ${Types.InputError}
    query($id: Int){
        country(id: $id) {
            __typename
            ... on Country{
                id
                name
                iso3
                isoNum
                createdat
                updatedat
            }
            ...InputError 
        }
    }
`

export const regionsQuery = gql `
    query($page: Int, $take: Int, $filter: String, $orderBy: RegionOrderByInput){
        regions(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            regions {
                id
                name
                code
                country {
                    id
                    name
                }
                createdat
                updatedat
            }
        }
    }
`

export const regionQuery = gql `
    ${Types.InputError}
    query($id: Int){
        region(id: $id) {
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
                createdat
                updatedat
            }
            ...InputError
        }
    }
`

export const districtsQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: DistrictOrderByInput){
        districts(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            countRegions
            countCountries
            districts {
                id
                name
                region{
                    id
                    name
                }
                shipping
                createdat
                updatedat
            }
        }
    }
`

export const districtQuery = gql`
    ${Types.InputError}
    query($id: Int){
        district(id: $id) {
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
                createdat
                updatedat
            }
            ...InputError
        }
    }
`

export const shippingMethodsQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: ShippingMethodOrderByInput){
        shippingMethods(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            shippingMethods {
                id
                code
                desc
                name
            }
        }
    }
`

export const shippingMethodQuery = gql`
    ${Types.InputError}
    query($id: Int){
        shippingMethod(id: $id) {
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

export const paymentMethodsQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: PaymentMethodOrderByInput){
        paymentMethods(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            paymentMethods {
                id
                code
                desc
                name
            }
        }
    }
`

export const paymentMethodQuery = gql`
    ${Types.InputError}
    query($id: Int){
        paymentMethod(id: $id) {
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

export const deliveryMansQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: DeliveryManOrderByInput){
        deliveryMans(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            deliveryMans {
                id
                civility
                firstname
                lastname
                email
                phonenumber
            }
        }
    }
`

export const deliveryManQuery = gql`
    ${Types.InputError}
    query($id: Int){
        deliveryMan(id: $id) {
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

export const brandsQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: BrandOrderByInput){
        brands(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            brands {
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
        }
    }
`

export const brandQuery = gql`
    ${Types.InputError}
    query($id: Int){
        brand(id: $id) {
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
                createdat
                updatedat
            }
            ...InputError
        }
    }
`

export const productsQuery = gql `
    query($page: Int, $take: Int, $filter: String, $orderBy: ProductOrderByInput){
        products(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            products {
                id
                name
                desc
                activated
                unit
                unitweight
                unitprice
                order
                category {
                    id
                    name
                }
                images {
                    id
                    url
                }
                brand {
                    id
                    name
                }
                
                discount {
                    id
                    percent
                }
                inventory {
                    id
                    quantity
                }
            }
        }
    }
`

export const productQuery = gql `
    ${Types.InputError}
    query($id: Int){
        product(id: $id){
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
                gender
                categoryId
                category{
                    id
                    name
                }
                brandId
                brand{
                    id
                    name
                }
                variants {
                    variant {
                        id
                        name
                        desc
                        options {
                            id
                            value
                            colorCode
                        }
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
                discount {
                    id
                    percent
                }
                inventory {
                    id
                    quantity
                }
                images {
                    id
                    url
                    imageref
                }
                relatives {
                    id
                    name
                    desc
                    unitprice
                    category {
                        id
                        name
                    }
                    brand {
                        id
                        name
                    }
                    images {
                        id
                        url
                    }
                }
            }
            ...InputError
        }
            
    }
`

export const inventoriesQuery = gql `
    query($page: Int, $take: Int, $filter: String, $orderBy: InventoryOrderByInput){
        inventories(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            inventories {
                id
                quantity
                details
                product {
                    id
                    name
                }
            }
        }
    }
`

export const inventoryQuery = gql `
    query($id: Int){
        inventory(id: $id) {
            id
            quantity
            details
            product {
                id
                name
            }
        }
    }
`

export const permissionsQuery = gql `
    query($filter: String, $page: Int, $take: Int, $orderBy: PermissionOrderByInput){
        permissions(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            permissions {
                id
                name
                desc
            }
        }
    }
`

export const permissionQuery = gql `
    ${Types.InputError}
    query($id: Int){
        permission(id: $id) {
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

export const rolesQuery = gql`
    query($filter: String, $page: Int, $take: Int, $orderBy: RoleOrderByInput){
        roles(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            roles {
                id
                name
                desc
                permissions {
                    permissionId
                    permission{
                        id
                        name
                    }
                }
            }
        }
    }
`

export const roleQuery = gql`
    ${Types.InputError}
    query($id: Int){
        role(id: $id) {
            __typename
            ...on Role{
                id
                name
                desc
                permissions {
                    permissionId
                    permission {
                        id
                        name
                        desc
                    }
                }
            }
            ...InputError
        }
    }
`

export const usersQuery = gql `
    query($filter: String, $page: Int, $take: Int, $orderBy: UserOrderByInput){
        users(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            users {
                id
                firstname
                lastname
                activated
                email
                phonenumber
                image {
                    id
                    url
                    imageref
                }
                roles {
                    roleId
                    role{
                        id
                        name
                        desc
                    }
                }
            }
        }
    }
`

export const clientsQuery = gql `
    query($filter: String, $page: Int, $take: Int, $orderBy: UserOrderByInput){
        clients(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            users {
                id
                civility
                activated
                firstname
                lastname
                email
                phonenumber
                districts {
                    districtId
                    line1
                    line2
                    district {
                        id
                        name
                    }
                }
            }
        }
    }
`

export const userQuery = gql `
    ${Types.InputError}
    query($id: Int){
        user(id: $id){
            __typename
            ...on User{
                id
                civility
                firstname
                lastname
                activated
                email
                phonenumber
                image {
                    id
                    url
                    imageref
                }
                roles {
                    roleId
                    role{
                        id
                        name
                        desc
                    }
                }
            }
            ...InputError
        }
    }
`