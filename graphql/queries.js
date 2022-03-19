import { gql } from 'graphql-request'

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
            count
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
    query($page: Int, $take: Int, $filter: String, $orderBy: CategoryOrderByInput){
        categories(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            countSub
            categories {
                id
                name
                desc
                createdat
            }
        }
    }
`

export const subCategoriesQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: CategoryOrderByInput){
        subCategories(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            countSub
            categories {
                id
                name
                desc
                createdat
                parentId
                parent {
                    id
                    name
                }
            }
        }
    }
`

export const categoryQuery = gql `
    query($id: Int){
        category(id: $id) {
            id
            name
            desc
            parentId
            count
            parent {
                id
                name
            }
        }
    }
`

export const variantQuery = gql`
    query($id: Int){
        variant(id: $id) {
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
            ... on InputError{
                message
                input
            } 
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
            ... on InputError{
                message
                input
            }
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
            ... on InputError{
                message
                input
            }
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
    query($id: Int){
        shippingMethods(id: $id) {
            id
            code
            desc
            name
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

export const deliveryManQueryQuery = gql`
    query($id: Int){
        deliveryMan(id: $id) {
            id
            civility
            firstname
            lastname
            email
            phonenumber
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
            ... on InputError{
                message
                input
            }
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
                short_desc
                long_desc
                activated
                status
                unit
                unitweight
                unitprice
                ranking
                order
                likes
                views
                createdat
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
            }
        }
    }
`

export const productQuery = gql `
    query($id: Int){
        product(id: $id) {
            id
            name
            short_desc
            long_desc
            activated
            status
            unit
            unitweight
            unitprice
            ranking
            order
            likes
            views
            createdat
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