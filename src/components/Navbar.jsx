import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Link } from 'react-router-dom'
import Switch from './Switch'
import avatar from "../assets/icons/avatar.png"
import { useAuthContext } from '../Context/AuthProvider'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { currentUser, logOut } = useAuthContext()
  return (
    <>
      <Disclosure as="nav" className="bg-neutral-100 dark:bg-gray-900 dark:text-white fixed w-full top-0 z-20">
        <div className="mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <Link to="/" className="pr-2 text-2xl font-semibold">React Movie App</Link>
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {currentUser && <h5 className="mr-2 capitalize">{currentUser?.displayName}</h5>}
              <Switch />
              <Menu as="div" className="relative ml-3">
                <div>

                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={currentUser?.photoURL || avatar}
                      alt=""
                      referrerPolicy='no-referrer'
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/register"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Your Profile
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          to="/login"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                        >
                          Settings
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <span
                          onClick={() => logOut()}
                          role="button"
                          className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer')}
                        >
                          Sign out
                        </span>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
      <div className="h-[57px]"></div>
    </>
  )
}
