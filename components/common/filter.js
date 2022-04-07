import React, { Component, Fragment } from 'react';
import { Listbox, Dialog, Popover, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { ChevronDownIcon } from '@heroicons/react/solid'
import FilterBoldIcon from '../ui/icons/filterBoldIcon'
import { capitalize, classNames } from '../../libs/util'
import { allCategories } from '../../hooks/category';
import { allBrands } from '../../hooks/brand';
import { allVariants } from '../../hooks/variant';

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import "swiper/css/thumbs";
// import required modules
import SwiperCore, { Autoplay, FreeMode, Navigation, Pagination } from "swiper";

import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { variants } from '../../tailwind.config';

SwiperCore.use([Autoplay, Navigation, Pagination]);

const StyledSlider = styled(SliderPrimitive.Root, {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: 'column',
    width: 20,
    height: 100,
  },
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: blackA.blackA9,
  position: 'relative',
  flexGrow: 1,
  borderRadius: '9999px',

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: 'absolute',
  backgroundColor: '#9c27b0',
  borderRadius: '9999px',
  height: '100%',
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: 'unset',
  display: 'block',
  cursor: 'pointer',
  width: 16,
  height: 16,
  backgroundColor: '#9c27b0',
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  borderRadius: 10,
  '&:hover': { backgroundColor: '#7b1fa2' },
  '&:focus': { boxShadow: `0 0 0 5px ${blackA.blackA8}` },
});

var genders = ['UNISEX', 'HOMME', 'FEMME']

class Filter extends Component {

  constructor(props){
      super(props);
      this.state = {gender: null, categories: [], allCategories: true, category: null, brands: [], allBrands: true,
                    clients: [], client: null, variants: [], allOptions: true}
      this.filterBrands = this.filterBrands.bind(this);
  }

  async componentDidMount(){
    if(this.props.category == true) this.getCategories()
    if(this.props.brand == true) this.getBrands()
    if(this.props.option == true) this.getVariants()
  }
  
  getCategories = async() => {
      var {response} = await allCategories()
      if(response){
        response.categories?.all == false
      } this.setState({categories: response.categories})
  }

  getBrands = async() => {
      var {response} = await allBrands()
      if(response) this.setState({brands: response.brands})
  }

  getVariants = async() => {
      var {response} = await allVariants()
      if(response) this.setState({variants: response.variants})
  }

  filterBrands = async(e, pos) =>{

    e.preventDefault()

    const {brands} = this.state
    var new_brands = brands

    new_brands[pos].checked = !new_brands[pos].checked

    this.setState({brands: new_brands})
  }

  render() {

      const {gender, brands, allBrands, categories, category, allCategories, variants } = this.state

      return(
          <div className="self-center mr-4">
            <Popover className="relative">
              {({ open }) => (
                <>
      
                  <Popover.Button className={` ${open ? '' : 'text-opacity-90'} text-white group bg-pink-600 bg-opacity-90 px-3 py-2 rounded-md inline-flex justify-center text-sm font-medium hover:text-opacity-100 self-center btn-effect1 shadow shadow-pink-600/50`}>
                    <FilterBoldIcon customClass={`${open ? '' : 'text-opacity-80'} h-3.5 w-3.5 text-white group-hover:text-opacity-90 transition ease-in-out duration-150 self-center mr-1 -mb-0.5`} />
                    <span>Filtrer</span>
                  </Popover.Button>
      
                  <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute left-[10.55rem] z-10 w-80 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl rounded-lg shadow-2xl">
                      <div className="overflow-hidden bg-white rounded-lg border border-gray-100 ring-1 ring-black ring-opacity-5">
                        <div className="text-sm font-semibold text-gray-900 px-4 mt-4 mb-3">
                              Filtrer par
                        </div>
                        <div className="flex flex-col px-4 h-80 overflow-y-scroll">

                          {this.props.category == true && categories != null &&
                              <div className='mb-3'>
                                  <Listbox value={category} onChange={(e) => this.setState({category: e})}>
                                      {({ open }) => (
                                          <>
                                          <Listbox.Label className="text-sm font-semibold text-purple-600 ">Catégorie</Listbox.Label>
                                          <div className="mt-2 relative">
                                              <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-[0.525rem] text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                                  <span className="flex items-center">
                                                      <span className="ml-3 block truncate">{category ? capitalize(category.name) : 'Choisir une catégorie'}</span>
                                                  </span>
                                                  <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                      <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                  </span>
                                              </Listbox.Button>
    
                                              <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                      {categories.map((item) => (
                                                      <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                          {({ category, active }) => (
                                                          <>
                                                              <div className="flex items-center">
                                                                  <span className={classNames(category ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                      {capitalize(item.name)}
                                                                  </span>
                                                              </div>
    
                                                              {category || active &&
                                                                  <span className={classNames(active ? 'text-white' : 'text-indigo-600','absolute inset-y-0 right-0 flex items-center pr-4')}>
                                                                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                  </span>
                                                              }
    
                                                          </>
                                                          )}
                                                      </Listbox.Option>
                                                      ))}
                                                  </Listbox.Options>
                                              </Transition>
                                          </div>
                                          </>
                                      )}
                                  </Listbox>
                              </div>
                          }

                          {category?.childs != null && category?.childs?.length > 0 &&
                            <>
                              {/* <div className="text-sm font-semibold text-purple-600 ">
                                Sous catégories
                              </div> */}
                              <div className='mb-3 flex flex-row flex-wrap'>
                                {category.childs.map((item, i) => (
                                  <div key={i} className={classNames(item.checked ? 'bg-purple-600 border border-purple-600 shadow-sm shadow-purple-400 text-white' : 'bg-gray-50/50 border border-gray-600 text-gray-700', 'rounded-2xl cursor-pointer px-2 py-1 mr-2 mb-2')} >
                                      <div className='font-normal text-[11px] tracking-wide'>{capitalize(item.name.toLowerCase())}</div>
                                  </div>
                                ))}
                              </div>
                            </>
                          }

                          {this.props.brand == true && brands != null &&
                            <>
                              <div className="text-sm font-semibold text-purple-600 ">
                                Marque
                              </div>
                              <div className='mt-3 mb-3 flex flex-row'>
                                <Swiper className="mb-1" spaceBetween={10} slidesPerView={4} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation]} >
                                  {brands.map((item, i) => (
                                    <SwiperSlide key={i} className="slider-type2">
                                      <div onClick={(e) => this.filterBrands(e, i) }  className={classNames(item.checked ? 'bg-purple-600 border border-purple-600 shadow-sm shadow-purple-400 text-white' : 'bg-gray-50/50 border border-gray-600 text-gray-700', 'rounded-2xl cursor-pointer px-2 py-1 my-1')} >
                                          <div className='font-normal text-[11px] tracking-wide'>{capitalize(item.name.toLowerCase())}</div>
                                      </div>
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                              </div>
                            </>
                          }

                          {this.props.gender == true && genders != null &&
                            <>
                              <div className="text-sm font-semibold text-purple-600 ">
                                Sexe
                              </div>
                              <div className='mt-3 mb-3 flex flex-row flex-wrap'>
                                {genders.map((item, i) => (
                                  <div key={i} className='bg-gray-50/50 border border-gray-600 rounded-2xl text-gray-700 cursor-pointer px-2 py-1 mr-3'>
                                      <div className='font-normal text-[11px] tracking-wide'>{capitalize(item.toLowerCase())}</div>
                                  </div>
                                ))}
                              </div>
                            </>
                          }

                          {this.props.price == true && variants != null &&
                            <>
                              {variants.map((item0, i0) => (
                                <div key={i0}>
                                  <div className="text-sm font-semibold text-purple-600 ">
                                    {capitalize(item0.name)}
                                  </div>
                                  <div className='mt-3 mb-3 flex flex-row justify-start'>
                                    <Swiper className="mb-1" spaceBetween={4} slidesPerView={9} freeMode={true} watchSlidesProgress={true} modules={[FreeMode, Navigation]} >
                                      {item0.options.map((item, i) => (
                                        <SwiperSlide key={i} className="slider-type2">
                                          <div className='mb-2' key={i}>
                                            {!item.colorCode 
                                              ?<div className='flex flex-row'>
                                                    <div className="flex flex-row justify-center w-6 h-6 mr-3 rounded-md border border-gray-400 bg-gray-200 bg-opacity-50 self-center">
                                                        <div className="self-center text-[10px] font-medium text-gray-800">{item.value}</div>
                                                    </div>
                                                    {/* <div className="text-sm text-gray-900 self-center">{item.value}</div> */}
                                                </div>
                                              :<div className='flex flex-row'>
                                                    <div className="flex flex-row justify-center w-6 h-6 mr-3 rounded-full border-2 border-gray-200 border-opacity-40 self-center" style={{backgroundColor: item.colorCode}}></div>
                                                    {/* <div className="text-sm text-gray-900 self-center">{item.value}</div> */}
                                                </div>
                                            }
                                          </div>
                                        </SwiperSlide>
                                      ))}
                                    </Swiper>
                                  </div>
                                </div>
                              ))}
                              
                            </>
                          }


                        {this.props.price == true &&
                          <>
                            <div className="text-sm font-semibold text-purple-600 ">
                                  Prix Unitaire
                            </div>
                            <div className="w-full relative mt-2 mb-3">
                            <StyledSlider defaultValue={[25, 75]} step={10} minStepsBetweenThumbs={1} aria-label="Volume">
                              <StyledTrack>
                                <StyledRange />
                              </StyledTrack>
                              <StyledThumb />
                              <StyledThumb />
                            </StyledSlider>
                            </div>
                          </>
                        }
                          
                        </div>
                        <div className='bg-black bg-opacity-90 shadow-lg h-10 px-5 rounded-md flex flex-col justify-center btn-effect1 mx-4 mt-2 mb-3'>
                            <div className='text-sm font-medium text-gray-100 hover:text-white self-center tracking-wide'>Appliquer</div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
        </div>
        )
  }

}

export default Filter;