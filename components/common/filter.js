import React, { Component, Fragment } from 'react';
import { Listbox, Dialog, Popover, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { ChevronDownIcon } from '@heroicons/react/solid'
import FilterBoldIcon from '../ui/icons/filterBoldIcon'
import { classNames } from '../../libs/util'

var genders = ['UNISEX', 'HOMME', 'FEMME']

class Filter extends Component {

  constructor(props){
      super(props);
      this.state = {gender: null, categories: [], category: null, brands: [], brand: null, clients: [], client: null, variants: [], variant: null, options: [], option: null}
  }

  async componentDidMount(){
    if(this.props.category == true) this.getCategories
    if(this.props.brand == true) this.getBrands
    if(this.props.variant == true) this.getVariants
  }
  
  getCategories = async() => {
      var {response} = await allCategories()
      if(response){
          this.setState({categories: response.categories})
      }
  }

  getBrands = async() => {
      var {response} = await allBrands()
      if(response){
          this.setState({brands: response.brands})
      }
  }

  getVariants = async() => {
      var {response} = await allVariants()
      if(response){
          this.setState({variants: response.variants})
      }
  }

  render() {

      const {gender, } = this.state

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
                    <Popover.Panel className="absolute left-[8.9rem] z-10 w-72 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl shadow-2xl">
                      <div className="overflow-hidden rounded-lg border border-gray-100 ring-1 ring-black ring-opacity-5">
                        <div className="flex flex-col bg-white p-4 h-96 overflow-y-scroll">
      
                          <div className="text-sm font-semibold text-purple-600 ">
                              Filtrer par
                          </div>
      
                          {this.props.gender == true && genders != null &&
      
                            <div className='mt-4 mb-6'>
                              <Listbox value={gender} onChange={(e) => this.setState({gender: e})}>
                                  {({ open }) => (
                                      <>
                                      <Listbox.Label className="block text-sm font-medium text-gray-900">Sexe <span className='font-bold text-purple-600'>*</span></Listbox.Label>
                                      <div className="mt-1 relative">
                                          <Listbox.Button className="relative w-full bg-white border border-gray-400 rounded-md shadow-sm pl-3 pr-10 py-[0.525rem] text-left cursor-default focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
                                              <span className="flex items-center">
                                                  <span className="ml-3 block truncate">{gender ? gender : 'Choisir un sexe'}</span>
                                              </span>
                                              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                  <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                              </span>
                                          </Listbox.Button>
      
                                          <Transition show={open} as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                                  {genders.map((item) => (
                                                  <Listbox.Option key={item.id} className={({ active }) => classNames(active ? 'text-white bg-purple-600' : 'text-gray-900','cursor-pointer select-none relative py-2 pl-3 pr-9')} value={item}>
                                                      {({ gender, active }) => (
                                                      <>
                                                          <div className="flex items-center">
                                                              <span className={classNames(gender == item ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                                                                  {item}
                                                              </span>
                                                          </div>
      
                                                          {gender || active &&
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