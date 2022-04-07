import React, { Component, Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import SortBoldIcon from '../ui/icons/sortBoldIcon'


class Sort extends Component {

  constructor(props){
      super(props);
      this.state = {}
  }

  async componentDidMount(){
      
  }


  render() {

      const { } = this.state

      return(
        <div className="self-center mr-2">
          <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button className={` ${open ? '' : 'text-opacity-90'} text-white group bg-gray-600 bg-opacity-90 px-4 py-2 rounded-md inline-flex justify-center text-sm font-medium hover:text-opacity-100 self-center btn-effect1 shadow shadow-gray-600/50`}>
                  <SortBoldIcon customClass={`${open ? '' : 'text-opacity-80'} h-3.5 w-3.5 text-white group-hover:text-opacity-90 transition ease-in-out duration-150 self-center mr-1 -mb-0.5`} />
                  <span>Trier</span>
                </Popover.Button>
    
                <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
                  <Popover.Panel className="absolute left-[10.005rem] z-10 w-80 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl rounded-lg shadow-2xl">
                    <div className="overflow-hidden rounded-lg border border-gray-100 ring-1 ring-black ring-opacity-5">
                      <div className="bg-white p-4">
                        <div className="text-sm font-semibold text-purple-600 ">
                            Trier par
                        </div>
    
                        <div className="flex flex-col mt-3">
                          <div>
                            <div className="form-check">
                              <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                              <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" htmlFor="flexRadioDefault1">
                                Ordre
                              </label>
                            </div>
                            <div className="form-check mt-2">
                              <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                              <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" htmlFor="flexRadioDefault2">
                                Nom
                              </label>
                            </div>
                            <div className="form-check mt-2">
                              <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                              <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" htmlFor="flexRadioDefault3">
                                Description
                              </label>
                            </div>
                            <div className="form-check mt-2">
                              <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault4"  />
                              <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" htmlFor="flexRadioDefault4">
                                Prix
                              </label>
                            </div>
                            <div className="form-check mt-2">
                              <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault5"  />
                              <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" htmlFor="flexRadioDefault5">
                                Quatité en stock
                              </label>
                            </div>
                          </div>
                        </div>
    
                        <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-90 shadow-inner mt-4 mb-4'></div>
    
                        <div className="text-sm font-semibold text-purple-600 ">
                            Ordre
                        </div>
    
                        <div className="flex flex-col mt-3">
                          <div>
                            <div className="form-check">
                              <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault2" id="flexRadioDefault11" />
                              <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" htmlFor="flexRadioDefault11">
                                Croissant
                              </label>
                            </div>
                            <div className="form-check mt-2">
                              <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault2" id="flexRadioDefault22"  />
                              <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" htmlFor="flexRadioDefault22">
                                Décroissant
                              </label>
                            </div>
                            
                          </div>
                        </div>
    
                        
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

export default Sort;