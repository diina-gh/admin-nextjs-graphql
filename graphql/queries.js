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
        option(id: $id) {
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
            }
        }
    }
`

export const countryQuery = gql`
    query($id: Int){
        country(id: $id) {
            id
            name
            iso3
            isoNum
            createdat
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
                createdat
                code
                country {
                    id
                    name
                }
            }
        }
    }
`

export const regionQuery = gql `
    query($id: Int){
        region(id: $id) {

                id
                name
                createdat
                code
                country {
                    id
                    name
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
            }
        }
    }
`

export const districtQuery = gql`
    query($id: Int){
        district(id: $id) {
            id
            name
            region{
                id
                name
            }
            shipping
            createdat
        }
    }
`