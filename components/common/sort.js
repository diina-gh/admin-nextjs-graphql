import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Fragment } from 'react'
import SortBoldIcon from '../ui/icons/sortBoldIcon'

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: IconOne,
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: IconTwo,
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: IconThree,
  },
]

export default function Filter() {
  return (
    <div className="self-center mr-2">
      <Popover className="relative">
        {({ open }) => (
          <>

            <Popover.Button className={` ${open ? '' : 'text-opacity-90'} text-white group bg-gray-600 bg-opacity-90 px-4 py-2 rounded-md inline-flex justify-center text-sm font-medium hover:text-opacity-100 self-center btn-effect1 shadow shadow-gray-600/50`}>
              <SortBoldIcon customClass={`${open ? '' : 'text-opacity-80'} h-3.5 w-3.5 text-white group-hover:text-opacity-90 transition ease-in-out duration-150 self-center mr-1 -mb-0.5`} />
              <span>Trier</span>
            </Popover.Button>

            {/* <Popover.Button className={` ${open ? '' : 'text-opacity-90'} text-white group bg-gray-600 bg-opacity-90 px-3 py-2 rounded-md inline-flex justify-center text-sm font-medium hover:text-opacity-100 self-center btn-effect1 shadow shadow-gray-600/50`}>
                <span>Trier</span>
                <ChevronDownIcon className={`${open ? '' : 'text-opacity-80'} ml-2 h-5 w-5 text-white group-hover:text-opacity-90 transition ease-in-out duration-150 self-center`} aria-hidden="true"/>
            </Popover.Button> */}

            <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0" leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1">
              <Popover.Panel className="absolute left-[8rem] z-10 w-64 px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0 lg:max-w-3xl rounded-lg shadow-2xl">
                <div className="overflow-hidden rounded-lg border border-gray-100 ring-1 ring-black ring-opacity-5">
                  <div className="bg-white p-4">
                    <div className="text-sm font-medium text-gray-900 ">
                        Trier par
                    </div>

                    <div className="flex flex-col mt-3">
                      <div>
                        <div className="form-check">
                          <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                          <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" for="flexRadioDefault1">
                            Ordre
                          </label>
                        </div>
                        <div className="form-check mt-2">
                          <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
                          <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" for="flexRadioDefault2">
                            Nom
                          </label>
                        </div>
                        <div className="form-check mt-2">
                          <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                          <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" for="flexRadioDefault3">
                            Description
                          </label>
                        </div>
                        <div className="form-check mt-2">
                          <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault4"  />
                          <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" for="flexRadioDefault4">
                            Prix
                          </label>
                        </div>
                        <div className="form-check mt-2">
                          <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault" id="flexRadioDefault5"  />
                          <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" for="flexRadioDefault5">
                            Quatité en stock
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='divider w-full h-[1px] bg-gray-400 bg-opacity-90 shadow-inner mt-4 mb-4'></div>

                    <div className="text-sm font-medium text-gray-900 ">
                        Ordre
                    </div>

                    <div className="flex flex-col mt-3">
                      <div>
                        <div className="form-check">
                          <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault2" id="flexRadioDefault11" />
                          <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" for="flexRadioDefault11">
                            Croissant
                          </label>
                        </div>
                        <div className="form-check mt-2">
                          <input className="form-check-input appearance-none rounded-full h-3.5 w-3.5 border border-purple-300  bg-white checked:bg-purple-600 checked:border-purple-600 text-purple-500 focus:ring-2 focus:ring-purple-500 transition duration-200 mt-1.5 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="radio" name="flexRadioDefault2" id="flexRadioDefault22"  />
                          <label className="form-check-label inline-block text-gray-900 cursor-pointer font-medium text-sm" for="flexRadioDefault22">
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

function IconOne() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconTwo() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <path
        d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
        stroke="#FB923C"
        strokeWidth="2"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
        stroke="#FDBA74"
        strokeWidth="2"
      />
    </svg>
  )
}

function IconThree() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill="#FFEDD5" />
      <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
      <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
      <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
      <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
      <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
      <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
    </svg>
  )
}
