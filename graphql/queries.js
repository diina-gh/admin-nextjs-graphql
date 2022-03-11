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

export const countriesQuery = gql `
    query($page: Int, $take: Int, $filter: String, $orderBy: CountryOrderByInput){
        countries(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            id
            isoNum
            iso3
            name
            count
        }
    }
`

export const regionsQuery = gql `
    query($page: Int, $take: Int, $filter: String, $orderBy: RegionOrderByInput){
        regions(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            id
            code
            name
            country {
                id
                iso3
                isoNum
                name
            }
            count
        }
    }
`

export const districtsQuery = gql`
    query($page: Int, $take: Int, $filter: String, $orderBy: DistrictOrderByInput){
        districts(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            id
            name
            shipping
            region {
                id
                name
                country {
                    id
                    name
                }
            } 
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
        variants(id: $id) {
            id
            title
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
                title
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
        options(id: $id) {
            id
            value
            colorCode
            variantId
            variant {
                id
                title
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
                    title
                }
            }
        }
    }
`