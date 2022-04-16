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

    ${Types.categoryFields}
    ${Types.InputError}

    query($id: Int,
          $categoryName: Boolean = false, $categoryDesc: Boolean = false, $categoryOrder: Boolean = false, $imageUrl: Boolean = false, 
          $categoryCreatedat: Boolean = false, $categoryActivated: Boolean = false, $categoryParentId: Boolean = false, $imageImageref: Boolean = false, 
          $categoryImage: Boolean = false, $categoryParent: Boolean = false, $parentName: Boolean = false, $parentDesc: Boolean = false,
          $categoryChilds: Boolean = false, $childName: Boolean = false, $childDesc: Boolean = false, $childImage: Boolean = false  
    ){
        category(id: $id) {
            __typename
            ...categoryFields
            ...InputError
        }
    }
`

export const variantQuery = gql`
    ${Types.variantFields}
    ${Types.InputError}
    query($id: Int,
          $variantName: Boolean = false, $variantDesc: Boolean = false, $variantCreatedat: Boolean = false, $variantOptions: Boolean = false,
          $optionValue: Boolean = false, $optionColorCode: Boolean = false, $optionVariant: Boolean = false, $optionVariantId: Boolean = false, $optionVariantName: Boolean = false
    ){
        variant(id: $id) {
            __typename
            ...variantFields
            ...InputError
        }
    }
`

export const variantsQuery = gql`
    ${Types.variantFields}
    query($filter: String, $page: Int, $take: Int, $orderBy: VariantOrderByInput
        $variantName: Boolean = false, $variantDesc: Boolean = false, $variantCreatedat: Boolean = false, $variantOptions: Boolean = false,
        $optionValue: Boolean = false, $optionColorCode: Boolean = false, $optionVariant: Boolean = false, $optionVariantId: Boolean = false, $optionVariantName: Boolean = false
    ){
        variants(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            countOpt
            variants {
                ...variantFields
            }
        }
    }
`

export const optionQuery = gql `
    ${Types.optionFields}
    ${Types.InputError}    
    query($id: Int,
          $optionValue: Boolean = false, $optionColorCode: Boolean = false, $optionVariantId: Boolean = false, $optionVariant: Boolean = false, $optionVariantName: Boolean = false
    ){
        option(id: $id) {
            __typename
            ...optionFields
            ...InputError
        }
    }
`

export const optionsQuery = gql `
    ${Types.optionFields}
    query($filter: String, $page: Int, $take: Int, $orderBy: OptionOrderByInput,
          $optionValue: Boolean = false, $optionColorCode: Boolean = false, $optionVariant: Boolean = false, $optionVariantId: Boolean = false, $optionVariantName: Boolean = false
    ){
        options(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            options {
                ...optionFields
            }
        }
    }
`

export const countriesQuery = gql`
    ${Types.countryFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: CountryOrderByInput,
        $countryName: Boolean = false, $countryIso3: Boolean = false, $countryIsoNum: Boolean = false, $countryCreatedAt: Boolean = false, $countryUpdatedAt: Boolean = false,
    ){
        countries(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            countries{
                ...countryFields
            }
        }
    }
`

export const countryQuery = gql`
    ${Types.InputError}
    ${Types.countryFields}
    query($id: Int,
          $countryName: Boolean = false, $countryIso3: Boolean = false, $countryIsoNum: Boolean = false, $countryCreatedAt: Boolean = false, $countryUpdatedAt: Boolean = false,
    ){
        country(id: $id) {
            __typename
            ... countryFields
            ...InputError 
        }
    }
`

export const regionsQuery = gql `
    ${Types.regionFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: RegionOrderByInput,
          $regionName: Boolean = false, $regionCode: Boolean = false, $regionCreatedAt: Boolean = false, $regionUpdatedAt: Boolean = false, $regionCountry: Boolean = false, $regionCountryName: Boolean = false
        ){
            regions(page: $page, take: $take, filter: $filter, orderBy: $orderBy,) {
                count
                regions {
                    ...regionFields
                }
            }
        }
`

export const regionQuery = gql `
    ${Types.InputError}
    ${Types.regionFields}
    query($id: Int,
          $regionName: Boolean = false, $regionCode: Boolean = false, $regionCreatedAt: Boolean = false, $regionUpdatedAt: Boolean = false, $regionCountry: Boolean = false, $regionCountryName: Boolean = false 
        ){
            region(id: $id) {
                __typename
                ...regionFields
                ...InputError
            }
        }
`

export const districtsQuery = gql`
    ${Types.districtFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: DistrictOrderByInput,
          $districtName: Boolean = false, $districtShipping: Boolean = false, $districtCreatedAt: Boolean = false, $distrcitUpdatedAt: Boolean = false, $districtRegion: Boolean = false, $districtRegionName: Boolean = false
    ){
        districts(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            countRegions
            countCountries
            districts {
                ...districtFields
            }
        }
    }
`

export const districtQuery = gql`
    ${Types.InputError}
    ${Types.districtFields}
    query($id: Int,
          $districtName: Boolean = false, $districtShipping: Boolean = false, $districtCreatedAt: Boolean = false, $distrcitUpdatedAt: Boolean = false, $districtRegion: Boolean = false, $districtRegionName: Boolean = false
    ){
        district(id: $id) {
            __typename
            ...districtFields
            ...InputError
        }
    }
`

export const shippingMethodsQuery = gql`
    ${Types.shippingMethodFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: ShippingMethodOrderByInput,
          $shippingMethodCode: Boolean = false, $shippingMethodName: Boolean = false, $shippingMethodDesc: Boolean = false, $shippingMethodUpdatedAt: Boolean = false, $shippingMethodCreatedAt: Boolean = false
    ){
        shippingMethods(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            shippingMethods {
                ...shippingMethodFields
            }
        }
    }
`

export const shippingMethodQuery = gql`
    ${Types.InputError}
    ${Types.shippingMethodFields}
    query($id: Int,
          $shippingMethodCode: Boolean = false, $shippingMethodName: Boolean = false, $shippingMethodDesc: Boolean = false, $shippingMethodUpdatedAt: Boolean = false, $shippingMethodCreatedAt: Boolean = false
    ){
        shippingMethod(id: $id) {
            __typename
            ...shippingMethodFields
            ...InputError
        }
    }
`

export const paymentMethodsQuery = gql`
    ${Types.paymentMethodFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: PaymentMethodOrderByInput,
          $paymentMethodCode: Boolean = false, $paymentMethodName: Boolean = false, $paymentMethodDesc: Boolean = false, $paymentMethodUpdatedAt: Boolean = false, $paymentMethodCreatedAt: Boolean = false
    ){
        paymentMethods(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            paymentMethods {
                ...paymentMethodFields
            }
        }
    }
`

export const paymentMethodQuery = gql`
    ${Types.InputError}
    ${Types.paymentMethodFields}
    query($id: Int,
          $paymentMethodCode: Boolean = false, $paymentMethodName: Boolean = false, $paymentMethodDesc: Boolean = false, $paymentMethodUpdatedAt: Boolean = false, $paymentMethodCreatedAt: Boolean = false
    ){
        paymentMethod(id: $id) {
            __typename
            ...paymentMethodFields
            ...InputError
        }
    }
`

export const deliveryMansQuery = gql`
    ${Types.deliveryManFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: DeliveryManOrderByInput,
          $deliveryManFirstname: Boolean = false, $deliveryManLastname: Boolean = false, $deliveryManEmail: Boolean = false, $deliveryManPhonenumber: Boolean = false, $deliveryManCreatedAt: Boolean = false, $deliveryManUpdatedAt: Boolean = false
    ){
        deliveryMans(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            deliveryMans {
                ...deliveryManFields
            }
        }
    }
`

export const deliveryManQuery = gql`
    ${Types.InputError}
    ${Types.deliveryManFields}
    query($id: Int,
          $deliveryManFirstname: Boolean = false, $deliveryManLastname: Boolean = false, $deliveryManEmail: Boolean = false, $deliveryManPhonenumber: Boolean = false, $deliveryManCreatedAt: Boolean = false, $deliveryManUpdatedAt: Boolean = false
    ){
        deliveryMan(id: $id) {
            __typename
            ...deliveryManFields
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