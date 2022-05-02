import React, { Component } from 'react';
import Link from 'next/link'
import { motion } from "framer-motion";
import Header from '../../components/common/header'
import Sidebar from '../../components/common/sidebar'
import HeadInfo from '../../components/common/headinfo'
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { xof } from '../../libs/util';
import GroupBoldIcon from '../../components/ui/icons/groupBoldIcon';
import { allProducts, getProduct, getProducts } from '../../hooks/product';
import { useDebouncedCallback } from 'use-debounce';
import {Pagination as Paginate}  from "react-pagination-bar"
import 'react-pagination-bar/dist/index.css'
import ChevronLeftIcon from '../../components/ui/icons/chevronLeftIcon';
import ChevronRightIcon from '../../components/ui/icons/chevronRightIcon';
import DoubleChevronLeftIcon from '../../components/ui/icons/doubleChevronLeftIcon';
import DoubleChevronRightIcon from '../../components/ui/icons/doubleChevronRightIcon';
import ArrowLeftBoldIcon from '../../components/ui/icons/arrowLeftBoldIcon';
import { capitalize } from '../../libs/util';
import router from 'next/router'
import toast, { Toaster } from 'react-hot-toast';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { debounce } from 'lodash';

export async function getServerSideProps(context) {
    return {
      props: {},
    }
}

class Index extends Component {

    constructor(props){
        super(props);
        this.state = { id:null, block1: true, block2: false, block3: false, product: null, relatives: [], page: 1, take: 6, filter:'', orderBy: {"id": 'asc'}, };
        this.getRelatives = this.getRelatives.bind(this)
        this.refetch = this.refetch.bind(this)
    }

    async componentDidMount(){

        var itemId = router.query.id
        this.setState({block1: true, block2: true, block3: true})

        if(itemId !=null){
    
            const fields = {
                "productName": true, "productDesc": true, "productGender": true, "productUnit": true, "productUnitprice": true, "productUnitweight": true, "productActivated": true, "productBrand": true, "productBrandName": true, "productCategory": true, "productCategoryName": true, "productImage": true, "imageUrl": true, "imageImageref": true, "productInventory": true, "productInventoryQuantity": true,
                "productVariants": true, "productVariantName": true,"productVariantOptions": true, "productVariantOptionValue": true, "productVariantOptionColorCode": true, "productOptions": true, "productOptionColorCode": true,"productOptionValue": true, "productRelatives": true, "productRelated": true, "relativeName": true, "relativeUnitPrice": true, "relativeImage": true, "relativeCategory": true, "relativeCategoryName": true, "productCategoryImage": true, "productBrandImage": true,
                "productOptionVariantId": true, "productOptionVariant": true, "productOptionVariantName": true,
            }
    
            var {response} = await getProduct(itemId, fields)
            if(response?.__typename == 'Product'){
                this.setState({product: response, block1:false})
            }
            else if(response?.__typename == 'InputError'){
                toast.error(response.message);
                router.push('./')
            }
            else{
                toast.error("Erreur inconnue. Veuillez contacter l'administrateur.");
                router.push('./')
            }
        }
        this.getRelatives()
    }

    getRelatives = async() => {
        const{page, take, filter, orderBy} = this.state
        const relativeFields = {"productName": true, "productUnit": true, "productUnitprice": true, "productBrand": true, "productBrandName": true, "productCategory": true, "productCategoryName": true, "productImage": true, "imageUrl": true}
        var {response} = await allProducts(page, take, filter, orderBy,relativeFields )
        if(response) this.setState({relatives: response, block3: false})
        console.log("In relatives ", this.state.relatives)
    }

    refetch = debounce(
        (newPage, newFilter = null, newOrder = null ) => {
           this.setState({block3: true})
           if(newPage != null && newPage != this.state.page) this.setState({page: newPage}) 
           if(newFilter != null) this.setState({filter: newFilter})
           if(newOrder != null) this.setState({filter: newOrder})
           this.getRelatives()         
       },695
   );

 
    render() {
        const {product, relatives, page, take} = this.state

        return(
            <div className="app-container h-screen">

            <Toaster position='top-right' />
            <HeadInfo title= 'Dashboard' description='description here'/>
            <Header/>

            <div className='w-full pt-3 px-3 md:px-6 flex flex-row justify-between'>

                <Sidebar />

                <motion.div initial={{ opacity: 0.45, x: 150 }}  whileInView={{ opacity: 1, x: 0, transition: { duration: 0.60 }, }}>
                    <div className='app-body rounded-xl'>

                        <div className='w-full h-full bg-white rounded-xl overflow-y-hidden pt-4 pb-3'>

                            <div className='w-full flex flex-row justify-between mt-2 h-10 px-6'>
                                <Link href="./">
                                    <div className='text-purple-600 hover:text-opacity-80 cursor-pointer self-center ml-0.5'>
                                            <ArrowLeftBoldIcon customClass="w-4" /> 
                                    </div>
                                </Link>
                                {product &&
                                    <div className='flex flex-col self-center'>
                                        <div className='flex flex-row text-center'>
                                            <div className='text-[16.5px] font-bold text-purple-600 mr-2 self-center'>{product?.name}</div>
                                            <div className="text-[12px] self-center">
                                                {product?.activated &&
                                                    <span className="px-2.5 py-1 font-semibold rounded-full bg-green-100 text-green-800">
                                                        ● Activé
                                                    </span>
                                                }
                                                {product?.activated == false &&
                                                        <span className="px-1.5 py-1 font-semibold rounded-full bg-red-100 text-red-800">
                                                        ● Inactif
                                                    </span>
                                                }
                                            </div> 
                                        </div>
                                        <div className='w-full text-center text-[12px] font-semibold text-gray-500 ml-0.5'>{ capitalize(product?.brand?.name ) + ' - ' + capitalize(product?.category?.name)}</div>
                                    </div>
                                }
                                <div className='bg-purple-50 bg-opacity-50 rounded-xl px-2 py-1 h-max self-center cursor-pointer'>
                                    <DotsHorizontalIcon className='text-purple-600 w-[1.15rem]' />
                                </div>
                            </div>

                            {this.state.block1 == true &&
                                <div className='app-details w-full flex flex-row justify-center mt-2'>
                                    <div className='h-10 self-center'><img className='h-full' src="../spinner.gif"/></div>
                                </div>  
                            }

                            {product &&
                                <div className='w-full app-details overflow-y-scroll mt-2'>

                                    <div className='w-full px-6'>

                                        <div className='w-full h-max bg-gradient-to-b from-purple-300/80 to-pink-300/80 rounded-xl'>
                                            <Swiper className="swiper-type4 h-[19rem] swiper-bg1 rounded-xl" spaceBetween={18} slidesPerView={3} loop={true} speed={5000} freeMode={true} autoplay={true} pagination={true} modules={[Pagination, FreeMode]}>
                                                {product?.images?.map((item, i) => (
                                                    <SwiperSlide key={i} className='glass-bg'>
                                                        <div className='w-full h-full flex flex-row justify-center'>
                                                            <div className='self-center galery-image'>
                                                                <img src={item?.url} />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                                
                                            </Swiper>
                                        </div>
                                        
                                    </div>

                                    <div className='text-[15.5px] font-semibold text-purple-700 truncate mt-6 mb-3 ml-0.5 px-6'>Informations générales</div>

                                    <div className='w-full grid grid-cols-12 grid-flow-row gap-5 px-6'>
                                        <div className='col-span-5 flex flex-col'>
                                            <div className='text-[14px] font-semibold text-gray-900'>Description</div>
                                            <div className='text-[12.5px] font-medium text-gray-700 bg-gray-100 rounded-lg leading-relaxed tracking-wide py-4 mt-2'>
                                                <div className='w-full h-[12.5rem] overflow-y-scroll px-4' dangerouslySetInnerHTML={{__html: product?.desc}}>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-7 grid grid-cols-3 grid-flow-row gap-5 h-max'>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Catégorie</div>
                                                <div className='w-full bg-gray-100 rounded-lg h-11 flex flex-row items-center px-1.5 mt-2'>
                                                    <div className='w-7 h-7 bg-gray-300 border-2 border-purple-600 mr-1.5 rounded-full'>
                                                        <img className='w-full h-full rounded-full object-cover' src={product?.category?.image?.url} />
                                                    </div>
                                                    <div className='text-[12.5px] font-medium text-gray-800 w-8/12 truncate'>{capitalize(product?.category?.name)}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Marque</div>
                                                <div className='w-full bg-gray-100 rounded-lg h-11 flex flex-row items-center px-1.5 mt-2'>
                                                    <div className='mini-brand mr-1.5'>
                                                        <img src={product?.brand?.image?.url} />
                                                    </div>
                                                    <div className='text-[12.5px] font-medium text-gray-800 w-8/12 truncate'>{capitalize(product?.brand?.name)}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Sexe</div>
                                                <div className='w-full bg-gray-100 rounded-lg h-11 flex flex-row items-center px-1.5 mt-2'>
                                                    {/* <div className='w-7 h-7 bg-gray-500 mr-1.5 rounded-full'></div> */}
                                                    <div className='text-[12.5px] font-medium text-gray-800 w-8/12 truncate'>{product?.gender}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Unité</div>
                                                <div className='w-full bg-gray-100 rounded-lg h-11 flex flex-row items-center px-1.5 mt-2'>
                                                    <div className='text-[12.5px] font-medium text-blue-700 w-8/12 truncate'>{product?.unit}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Poids par unité</div>
                                                <div className='w-full bg-gray-100 rounded-lg h-11 flex flex-row items-center px-1.5 mt-2'>
                                                    <div className='text-[12.5px] font-medium text-red-700 w-8/12 truncate'>{product?.unitweight}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Prix unitaire</div>
                                                <div className='w-full bg-gray-100 rounded-lg h-11 flex flex-row items-center px-1.5 mt-2'>
                                                    <div className='text-[12.5px] font-medium text-orange-700 w-8/12 truncate'>{xof(product?.unitprice)}</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Quantité en stock</div>
                                                <div className='w-full bg-gray-100 rounded-lg h-11 flex flex-row items-center px-1.5 mt-2'>
                                                    <div className='text-[12.5px] font-medium text-green-700 w-8/12 truncate'>200</div>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className='text-[14px] font-semibold text-gray-900'>Couleurs</div>
                                                <div className='bg-gray-100 rounded-lg h-10 mt-2'>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <div className='text-[15.5px] font-semibold text-purple-700 truncate mt-8 mb-5 ml-0.5 px-6'>Statistiques</div>
                                    
                                    <div className='w-full grid grid-cols-4 grid-flow-row gap-5 overflow-hidden px-6'>
                                        <motion.div initial={{ opacity: 0.35, x:-50 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-full bg-red-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Commandes</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0.35, y:-60 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-full bg-green-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Vues</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0.35, y:40 }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-full bg-blue-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Likes</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                        <motion.div initial={{ opacity: 0.35, x:40 }} whileInView={{ opacity: 1, x: 0, transition: { duration: 1.05 }, }}>
                                            <div className='w-full h-[8.485rem] bg-gray-200 bg-opacity-50 shadow-sm rounded-xl mb-4'>
                                                <div className='h-full rounded-xl flex flex-col justify-between px-3 py-4 cursor-pointer'>

                                                    <div className='flex flex-row'>
                                                        <div className='w-7 h-7 rounded-full bg-orange-600 flex flex-row justify-center self-center mr-2'>
                                                            <div className='self-center'><GroupBoldIcon customClass="w-3 h-3 text-gray-100"/></div>
                                                        </div>
                                                        <div className='text-[1.05rem] font-semibold text-gray-900 self-center leading-5'>Total revenu</div>
                                                    </div>

                                                    <div className='w-full flex flex-col'>
                                                        <div className='w-full text-right text-sm font-medium text-gray-900'> <span className='font-bold'>45 394</span> Utilisateurs</div>
                                                        <div className='w-full text-right text-[11px] font-medium text-gray-900 tracking-wide'> <span className='font-bold text-green-600'>▲ 3%</span> cette semaine</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className='text-[15.5px] font-semibold text-purple-700 truncate mt-8 mb-3 ml-0.5 px-6'>Produits associés</div>

                                    <div className='w-full px-6 mb-6'>
                                        {this.state.block3 == true &&
                                            <div className='h-[11.85rem] w-full flex flex-row justify-center'>
                                                <div className='h-10 self-center'><img className='h-full' src="../spinner.gif" /></div>
                                            </div>                                                  
                                        }

                                        {(relatives && relatives?.products && relatives?.page == null && relatives?.filter == null && relatives?.orderBy == null ) && this.state.block3 == false &&
                                            <div className="w-full grid grid-cols-6 gap-4">
                                                {relatives?.products?.map((item, i) => (
                                                    <div key={i} className="w-full">
                                                        <motion.div initial={{ opacity: 0, y: ( Math.random() + i * 5) }} whileInView={{ opacity: 1, y: 0, transition: { duration: 1.05 }, }}>
                                                            <div className="w-full pt-1 pb-5 rounded-xl bg-gray-200 bg-opacity-80 cursor-pointer relative parent-layer">

                                                                <div className='w-full image-layer-00 flex flex-row justify-center'>
                                                                    <div className='image-layer-01 self-center'>
                                                                        <img src={item.images[0]?.url} />
                                                                    </div>
                                                                </div>

                                                                <div className='w-full mt-2 px-3'>
                                                                    <div className='w-full text-gray-500 text-[0.7rem] font-medium truncate'>{capitalize(item.category?.name)}</div>
                                                                    <div className='w-full flex mt-1'>
                                                                        <div className='self-center w-full'>
                                                                            <div className='w-full main-item text-gray-900 cursor-pointer text-[0.87rem] font-semibold truncate transition duration-700 ease-in-out'>{capitalize(item.name)}</div>
                                                                            <div className='w-full text-gray-800 text-[0.71rem] font-medium mt-1'> {new Intl.NumberFormat('fr-FR', {style: 'currency', currency:'XOF'}).format(item.unitprice)}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </motion.div>
                                                    </div>
                                                ))}
                                            </div>
                                        }
                        
                                        <div className='w-full flex flex-row justify-end mt-5'>
                                            {relatives?.products != null &&
                                                <Paginate 
                                                    initialPage={page} 
                                                    itemsPerPage={take} 
                                                    onPageСhange={(pageNumber) => pageNumber == this.state.page ? '' : this.refetch(pageNumber)}  
                                                    totalItems={relatives?.count}  
                                                    pageNeighbours={2} 
                                                    startLabel= {<DoubleChevronLeftIcon customClass="w-3 h-3"/>}
                                                    endLabel={<DoubleChevronRightIcon customClass="w-3 h-3"/>}
                                                    nextLabel={<ChevronRightIcon customClass="w-3 h-3"/>}
                                                    prevLabel={<ChevronLeftIcon customClass="w-3 h-3"/>}
                                                    customClassNames={{rpbItemClassName:'pg-btn', rpbItemClassNameActive:'pg-active-btn',}}
                                                />
                                            }
                                        </div>
                                    </div>

                                </div>
                            }

                            

                        </div>

                    </div>
                </motion.div>
                

            </div>

        </div>
        )
    }

}

export default Index;


