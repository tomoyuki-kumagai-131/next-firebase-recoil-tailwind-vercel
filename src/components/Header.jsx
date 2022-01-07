/* This example requires Tailwind CSS v2.0+ */
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import NextLink from 'next/link';
import router from 'next/router';
import { Fragment } from 'react';
import { useRecoilState } from 'recoil';
import { useAuthContext } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { modalLogin } from './atoms/modalAtom';
import ModalLogin from './ModalLogin';
// import { useAuthContext } from '../context/AuthContext';
// import { auth } from '../lib/firebase';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Posts', href: '/posts' },
  { name: 'Search', href: 'search' },
  // { name: 'Login', href: '/login' },
];

export default function Header() {
  // const { user } = useAuthContext();
  // const logout = () => {
  //   auth.signOut();
  //   router.replace('/');
  //   alert('ログアウト完了');
  // };
  const [ open, setOpen ] = useRecoilState(modalLogin);

  const { user } = useAuthContext();

  const logout = () => {
    auth.signOut();
    alert('ログアウト完了')
    location.reload()
  }

  return (
    <div className='relative bg-white shadow-sm border-b'>
      <div className='max-w-7xl mx-auto'>
        <div className='relative z-10 pb-1 bg-white sm:pb-16 md:pb-5 lg:max-w-2xl lg:w-full lg:pb-5 xl:pb-5'>
          <svg
            className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
            fill='currentColor'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
            aria-hidden='true'
          >
            <polygon points='50,0 100,0 50,100 0,100' />
          </svg>

          <Popover>
            <div className='relative pt-6 px-6 sm:px-6 lg:px-8'>
              <nav
                className='relative flex items-center justify-between sm:h-10 lg:justify-start'
                aria-label='Global'
              >
                <div className='flex items-center flex-grow flex-shrink-0 lg:flex-grow-0'>
                  <div className='flex items-center justify-between w-full md:w-auto'>
                    <NextLink href='/'>
                      <span className='text-2xl -mt-4 lg:-mt-2'>⚡️ Talexy</span>
                    </NextLink>
                    <div className='-mr-2 flex items-center md:hidden'>
                      <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none'>
                        <span className='sr-only'>Open main menu</span>
                        <MenuIcon className='h-6 w-6 -mt-3' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className='hidden md:block md:ml-10 md:pr-4 md:space-x-8'>
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className='font-medium text-gray-500 hover:text-gray-900'
                    >
                      {item.name}
                    </a>
                  ))}
                  { !user && (
                    <span className='inline-block'>
                      <button onClick={()=> setOpen(true)} class='bg-teal-500 hover:bg-blue-700 text-white py-2 px-2 rounded'>
                        {/* <NextLink href='/signin'>Log in</NextLink> */}
                        <span>Log in</span>
                      </button>
                      <ModalLogin />
                    </span>
                  )}
                  { user && (
                    <span className='inline-block'>
                    <button onClick={logout} class='bg-teal-500 hover:bg-blue-700 text-white py-2 px-2 rounded'>
                      {/* <NextLink href='/signin'>Log in</NextLink> */}
                      <span>Log out</span>
                    </button>
                    <ModalLogin />
                  </span>
                  )}
                  {/* )} */}
                </div>
              </nav>
            </div>

            <Transition
              as={Fragment}
              enter='duration-150 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Popover.Panel
                focus
                className='absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'
              >
                <div className='rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden'>
                  <div className='px-5 pt-4 flex items-center justify-between'>
                    <NextLink href='/'>
                      <span className='text-2xl'>⚡️ Mastee</span>
                    </NextLink>
                    <div className='-mr-2'>
                      <Popover.Button className='bg-white rounded-md p-2 inline-flex items-center justify-center focus:outline-none'>
                        <span className='sr-only'>Close main menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='px-2 pt-2 pb-3 space-y-1'>
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <button onClick={()=> setOpen(true)} className='block w-full px-5 py-3 text-center font-medium text-gray-500 bg-white hover:bg-gray-400'>
                    <span className='font-medium text-gray-500 hover:text-gray-900'>
                      Log in
                    </span>
                  </button>
                  <ModalLogin />
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>
      </div>
    </div>
  );
}
