/* This example requires Tailwind CSS v2.0+ */
import { Popover, Transition } from '@headlessui/react';
import {
  ChatIcon,
  CogIcon,
  HomeIcon,
  MenuIcon,
  PlusCircleIcon,
  SearchIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Button, Switch } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { useRecoilState } from 'recoil';
import { UseAuthContext } from '../context/AuthContext';
import { auth } from '../lib/firebase';
import { modalLogin, modalPost, renderGraphql } from './atoms/modalAtom';
import ModalLogin from './ModalLogin';
import { Menu } from '@headlessui/react';
import ModalPost from './ModalPost';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  // { name: 'GraphQL', href: '/graphql' },
];

const Header: React.FC = () => {
  const [open, setOpen] = useRecoilState(modalLogin);

  const [openPost, setPostOpen] = useRecoilState(modalPost);

  const { user } = UseAuthContext();

  const logout = () => {
    auth.signOut();
    alert('ログアウト完了');
    location.reload();
  };

  const defaultImage: string = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE;

  const defaultName: string = 'ゲストユーザー';

  const [graphql, setGraphql] = useRecoilState(renderGraphql);

  const router = useRouter();

  console.log(graphql);

  // const renderGraphqls = () => {
  //   setGraphql((prevState) => !prevState);
  //   if (graphql) {
  //     router.push('/graphql');
  //   } else if (graphql == false) {
  //     router.replace('/');
  //   }
  //   // location.reload();
  // };

  return (
    <div className='relative bg-white sticky'>
      <div className='max-w-7xl mx-auto'>
        <div className='relative z-10 pb-2 bg-white sm:pb-2 md:pb-5 lg:max-w-xl lg:w-full lg:pb-5 xl:pb-5'>
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
                    <span className='text-2xl -mt-4 lg:-mt-2 duration-500 hover:scale-110 ease-in-out'>
                      <Link href='/'>⚡️ Talexy</Link>
                    </span>
                  </div>
                </div>
                <div className='hidden md:block md:ml-10 md:pr-4 md:space-x-8'>
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className='-mt-2 mb-1 sm:-mt-2 md:-mt-2 lg:-mb-1 lg:-mt-1 lg:ml-1'>
                  {!user && (
                    <span>
                      <button
                        onClick={() => setOpen(true)}
                        className='bg-teal-500 hover:bg-blue-700 text-white py-2 px-2 rounded-md'
                      >
                        <span>Log in</span>
                      </button>
                      <ModalLogin />
                    </span>
                  )}
                  {user && (
                    <>
                      {/* <FormGroup>
                        <FormControlLabel
                          control={<Switch />}
                          label='GraphQL'
                          onClick={() => setGraphql((prevState) => !prevState)}
                        />
                      </FormGroup> */}

                      <PlusCircleIcon
                        onClick={() => setPostOpen(true)}
                        className='relative h-8 w-8 flex mr-3 -mt-7 mr-4 lg:hidden'
                      />
                      <ModalPost />
                      <Menu>
                        {({ open }) => (
                          <>
                            <span className=''>
                              <Menu.Button className='pt-2 lg:pt-2 lg:ml-2'>
                                {user.photoURL ? (
                                  <img src={user.photoURL} className='rounded-full w-9 h-9' />
                                ) : (
                                  <img
                                    src={defaultImage}
                                    className='rounded-full w-9 h-9 duration-500 hover:scale-110 ease-in-out'
                                  />
                                )}
                              </Menu.Button>
                            </span>

                            <Transition show={open}>
                              <Menu.Items
                                static
                                className='absolute right-0 w-56 mt-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none lg:mr-64 lg:-mt-1'
                              >
                                <div className='px-4 py-3'>
                                  <p className='text-sm leading-5'>Signed in as</p>
                                  {user.displayName ? (
                                    <p className='text-sm font-medium leading-8 text-gray-700 truncate'>
                                      {user.displayName}
                                    </p>
                                  ) : (
                                    <p className='text-sm font-medium leading-8 text-gray-700 truncate'>
                                      {defaultName}
                                    </p>
                                  )}
                                </div>

                                <div className='py-1'>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <>
                                        <span
                                          className={`${
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                          } flex w-full px-4 py-2 text-sm leading-5 text-left`}
                                        >
                                          <CogIcon className='relative h-6 w-6 ml-0' />
                                          <Link href='/mypage'>
                                            <span className='justify-start items-center mt-0.5 ml-2'>
                                              My page
                                            </span>
                                          </Link>
                                        </span>
                                      </>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <span
                                        className={`${
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } flex justify-start w-full px-4 py-2 text-sm leading-5 text-left`}
                                      >
                                        <HomeIcon className='relative h-6 w-6 ml-0' />
                                        <Link href='/'>
                                          <span className='justify-start items-center mt-0.5 ml-2'>
                                            Home
                                          </span>
                                        </Link>
                                      </span>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <span
                                        className={`${
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } flex w-full px-4 py-2 text-sm leading-5 text-left`}
                                      >
                                        <ChatIcon className='relative h-6 w-6 ml-0' />
                                        <Link href='/about'>
                                          <span className='flex justify-center items-center mt-0.5 ml-2'>
                                            About
                                          </span>
                                        </Link>
                                      </span>
                                    )}
                                  </Menu.Item>
                                  {/* <Menu.Item>
                                    {({ active }) => (
                                      <span
                                        className={`${
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } flex w-full px-4 py-2 text-sm leading-5 text-left`}
                                      >
                                        <ChatIcon className='relative h-6 w-6 ml-0' />
                                        <Link href='/graphql'>
                                          <span className='flex justify-center items-center mt-0.5 ml-2'>
                                            GraphQL
                                          </span>
                                        </Link>
                                      </span>
                                    )}
                                  </Menu.Item> */}
                                </div>
                                <div className='py-1'>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <span
                                        onClick={logout}
                                        className={`${
                                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                                      >
                                        Sign out
                                      </span>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </>
                  )}
                </div>
              </nav>
            </div>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default Header;
