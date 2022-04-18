import { gql } from 'graphql-request'
import * as Types from './types'

export const newslettersQuery = gql`
    ${Types.newsletterFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: NewsletterOrderByInput,
        $newsletterEmail: Boolean = false, $newsletterCreatedAt: Boolean = false
    ){
        newsletters(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            newsletters {
                ...newsletterFields
            }
        }
    }
`

export const newsletterQuery = gql`
    ${Types.newsletterFields}
    ${Types.InputError}
    query($id: Int,
          $newsletterEmail: Boolean = false, $newsletterCreatedAt: Boolean = false
    ){
        newsletter(id: $id) {
            __typename
            ...newsletterFields
            ...InputError
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
          $categoryImage: Boolean = false, $categoryParent: Boolean = false, $parentName: Boolean = false, $parentDesc: Boolean = false, $parentImage: Boolean = false
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
          $categoryImage: Boolean = false, $categoryParent: Boolean = false, $parentName: Boolean = false, $parentDesc: Boolean = false, $parentImage: Boolean = false
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
          $categoryImage: Boolean = false, $categoryParent: Boolean = false, $parentName: Boolean = false, $parentDesc: Boolean = false, $parentImage: Boolean = false
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
          $districtName: Boolean = false, $districtShipping: Boolean = false, $districtCreatedAt: Boolean = false, $districtUpdatedAt: Boolean = false, $districtRegion: Boolean = false, $districtRegionName: Boolean = false
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
        $districtName: Boolean = false, $districtShipping: Boolean = false, $districtCreatedAt: Boolean = false, $districtUpdatedAt: Boolean = false, $districtRegion: Boolean = false, $districtRegionName: Boolean = false
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
          $deliveryManFirstname: Boolean = false, $deliveryManCivility: Boolean = false, $deliveryManLastname: Boolean = false, $deliveryManEmail: Boolean = false, $deliveryManPhonenumber: Boolean = false, $deliveryManCreatedAt: Boolean = false, $deliveryManUpdatedAt: Boolean = false
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
        $deliveryManFirstname: Boolean = false, $deliveryManCivility: Boolean = false, $deliveryManLastname: Boolean = false, $deliveryManEmail: Boolean = false, $deliveryManPhonenumber: Boolean = false, $deliveryManCreatedAt: Boolean = false, $deliveryManUpdatedAt: Boolean = false
    ){
        deliveryMan(id: $id) {
            __typename
            ...deliveryManFields
            ...InputError
        }
    }
`

export const brandsQuery = gql`
    ${Types.brandFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: BrandOrderByInput,
        $brandName: Boolean = false, $brandDesc: Boolean = false, $brandOrder: Boolean = false, $brandImage: Boolean = false, $imageUrl: Boolean = false, $imageImageref: Boolean = false, $brandCreatedAt: Boolean = false, $brandUpdatedAt: Boolean = false
    ){
        brands(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
            count
            brands {
                ...brandFields
            }
        }
    }
`

export const brandQuery = gql`
    ${Types.InputError}
    ${Types.brandFields}
    query($id: Int,
          $brandName: Boolean = false, $brandDesc: Boolean = false, $brandOrder: Boolean = false, $brandImage: Boolean = false, $imageUrl: Boolean = false, $imageImageref: Boolean = false, $brandCreatedAt: Boolean = false, $brandUpdatedAt: Boolean = false
    ){
        brand(id: $id) {
            __typename
            ...brandFields
            ...InputError
        }
    }
`

export const productsQuery = gql `
    ${Types.productFields}
    query($page: Int, $take: Int, $filter: String, $orderBy: ProductOrderByInput,
          $productName: Boolean = false, $productDesc: Boolean = false, $productOrder: Boolean = false, $productUnit: Boolean = false, $productUnitprice: Boolean = false, 
          $productUnitweight: Boolean = false, $productStatus: Boolean = false, $productActivated: Boolean = false, $productTaxable: Boolean = false, $productRanking: Boolean = false,
          $productLikes: Boolean = false, $productViews: Boolean = false, $productCreatedAt: Boolean = false, $productUpdatedAt: Boolean = false, $productGender: Boolean = false, $productBrand: Boolean = false,
          $productBrandName: Boolean = false, $productBrandImage: Boolean = false, $productCategory: Boolean = false, $productCategoryName: Boolean = false, $productCategoryImage: Boolean = false, 
          $productVariants: Boolean = false, $productVariantName: Boolean = false, $productVariantOptions: Boolean = false, $productVariantOptionValue: Boolean = false, $productVariantOptionColorCode: Boolean = false, $productOptions: Boolean = false, $productOptionValue: Boolean = false, $productOptionColorCode: Boolean = false,
          $productDiscount: Boolean = false, $productDiscountPercent: Boolean = false, $productInventory: Boolean = false, $productInventoryQuantity: Boolean = false, $productInventoryDetails: Boolean = false, $productRelatives: Boolean = false, $productRelated: Boolean = false, $productImage: Boolean = false, $imageUrl: Boolean = false, $imageImageref: Boolean = false
          $relativeName: Boolean = false, $relativeDesc: Boolean = false, $relativeUnitPrice: Boolean = false, $relativeImage: Boolean = false, $relativeBrand: Boolean = false, $relativeBrandName: Boolean = false, $relativeCategory: Boolean = false, $relativeCategoryName: Boolean = false,
         ){

            products(page: $page, take: $take, filter: $filter, orderBy: $orderBy) {
                count
                products {
                    ...productFields
                }
            }
        }
`

export const productQuery = gql `
    ${Types.InputError}
    ${Types.productFields}
    query($id: Int,
          $productName: Boolean = false, $productDesc: Boolean = false, $productOrder: Boolean = false, $productUnit: Boolean = false, $productUnitprice: Boolean = false, 
          $productUnitweight: Boolean = false, $productStatus: Boolean = false, $productActivated: Boolean = false, $productTaxable: Boolean = false, $productRanking: Boolean = false,
          $productLikes: Boolean = false, $productViews: Boolean = false, $productCreatedAt: Boolean = false, $productUpdatedAt: Boolean = false, $productGender: Boolean = false, $productBrand: Boolean = false,
          $productBrandName: Boolean = false, $productBrandImage: Boolean = false, $productCategory: Boolean = false, $productCategoryName: Boolean = false, $productCategoryImage: Boolean = false, 
          $productVariants: Boolean = false, $productVariantName: Boolean = false, $productVariantOptions: Boolean = false, $productVariantOptionValue: Boolean = false, $productVariantOptionColorCode: Boolean = false, $productOptions: Boolean = false, $productOptionValue: Boolean = false, $productOptionColorCode: Boolean = false,
          $productDiscount: Boolean = false, $productDiscountPercent: Boolean = false, $productInventory: Boolean = false, $productInventoryQuantity: Boolean = false, $productInventoryDetails: Boolean = false, $productRelatives: Boolean = false, $productRelated: Boolean = false, $productImage: Boolean = false, $imageUrl: Boolean = false, $imageImageref: Boolean = false
          $relativeName: Boolean = false, $relativeDesc: Boolean = false, $relativeUnitPrice: Boolean = false, $relativeImage: Boolean = false, $relativeBrand: Boolean = false, $relativeBrandName: Boolean = false, $relativeCategory: Boolean = false, $relativeCategoryName: Boolean = false
        ){
            product(id: $id){
                __typename
                ...productFields
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
    ${Types.permissionFields}
    query($filter: String, $page: Int, $take: Int, $orderBy: PermissionOrderByInput,
          $permissionName: Boolean = false, $permissionDesc: Boolean = false
          ){
        permissions(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            permissions {
                ...permissionFields
            }
        }
    }
`

export const permissionQuery = gql `
    ${Types.permissionFields}
    ${Types.InputError}
    query($id: Int,
          $permissionName: Boolean = false, $permissionDesc: Boolean = false
    ){
        permission(id: $id) {
            __typename
            ...permissionFields
            ...InputError
        }
    }
`

export const rolesQuery = gql`
    ${Types.roleFields}
    query($filter: String, $page: Int, $take: Int, $orderBy: RoleOrderByInput,
          $roleName: Boolean = false, $roleDesc: Boolean = false, $rolePermissions: Boolean = false, $permissionName: Boolean = false, $permissionDesc: Boolean = false
    ){
        roles(filter: $filter, page: $page, take: $take, orderBy: $orderBy) {
            count
            roles {
                ...roleFields
            }
        }
    }
`

export const roleQuery = gql`
    ${Types.roleFields}
    ${Types.InputError}
    query($id: Int,
          $roleName: Boolean = false, $roleDesc: Boolean = false, $rolePermissions: Boolean = false, $permissionName: Boolean = false, $permissionDesc: Boolean = false
    ){
        role(id: $id) {
            __typename
            ...roleFields
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