import Image from 'next/image';
import { HomeIcon, PuzzleIcon } from '@heroicons/react/solid';
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  PlusCircleIcon,
  AnnotationIcon,
  CogIcon,
  ChatIcon,
} from '@heroicons/react/outline';
import { UseAuthContext } from '../context/AuthContext';
import ModalPost from './ModalPost';
import { useRecoilState } from 'recoil';
import { modalLogin, modalPost } from './atoms/modalAtom';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { Menu } from '@headlessui/react';
import { Popover, Transition } from '@headlessui/react';
import { auth } from '../lib/firebase';
import ModalLogin from './ModalLogin';
import { Divider } from '@chakra-ui/react';

const NavMenu = [
  {
    id: 1,
    name: 'Home',
    href: '/',
    icon: 'HomeIcon',
  },
  {
    id: 2,
    name: 'About',
    href: '/about',
    icon: 'Annotation',
  },
  {
    id: 3,
    name: 'GraphQL',
    href: '/graphql',
    icon: 'Puzzle',
  },
];

function SideBar() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const [openPost, setPostOpen] = useRecoilState(modalPost);

  const logout = () => {
    auth.signOut();
    alert('ログアウト完了');
    location.reload();
  };

  const [open, setOpen] = useRecoilState(modalLogin);

  const defaultImage: string = process.env.NEXT_PUBLIC_DEFAULT_PROFILE_IMAGE;

  const defaultName: string = 'ゲストユーザー';

  return (
    <div className='hidden sm:flex flex-col items-center p-1 fixed ml-5'>
      <div className='space-y-8 mt-12 mb-12 xl:ml-2'>
        {NavMenu.map((item) => {
          return (
            <>
              <div key={item.id}>
                <Link href={item.href}>
                  <span className='text-gray-600 font-bold text-lg flex cursor-pointer hover:rounded-md hover:bg-gray-200 hover:text-gray-600 p-1 mr-24'>
                    {item.id === 1 && <HomeIcon className='h-7 w-7' />}
                    {item.id === 2 && <AnnotationIcon className='h-7 w-7' />}
                    {item.id === 3 && <PuzzleIcon className='h-7 w-7' />}
                    <span className='ml-2 mt-1'>{item.name}</span>
                  </span>
                </Link>
              </div>
              <Divider />
            </>
          );
        })}
      </div>

      <button
        className='hidden xl:inline bg-pink-600 text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md hover:bg-pink-400'
        onClick={() => setPostOpen(true)}
      >
        POST
      </button>
      <Divider className='mt-12' />
      <div className='text-white mt-12 flex items-center justify-center'>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt='Profile Pic'
            className='absolute h-11 w-11 rounded-full mr-40'
          />
        ) : (
          <img
            src={defaultImage}
            alt='Profile Pic'
            className='absolute h-11 w-11 rounded-full mr-40'
          />
        )}
        {/* <img
          src={user.photoURL}
          alt=''
          className='items-center justify-center h-10 w-10 rounded-full mr-3 ml-32'
        /> */}
        <div className='xl:inline leading-5'>
          {user.displayName ? (
            <h4 className='absolute -mt-2 font-bold text-gray-600'>{user.displayName}</h4>
          ) : (
            <h4 className='absolute font-bold -mt-2 text-gray-600'>{defaultName}</h4>
          )}
        </div>
        {/* <div className='flex items-center ml-2'> */}
        <Popover>
          <div className='relative pt-6 px-6 sm:px-6 lg:px-8'>
            <nav
              className='relative flex items-center justify-between sm:h-10 lg:justify-start'
              aria-label='Global'
            >
              <div className='-mt-2 mb-1 sm:-mt-2 md:-mt-2 lg:-mb-1 lg:-mt-1 lg:ml-1'>
                {!user && (
                  <span>
                    <button
                      onClick={() => setOpen(true)}
                      className='bg-teal-500 hover:bg-blue-700 text-gray-600 py-2 px-2 rounded-md'
                    >
                      <span>Log in</span>
                    </button>
                    <ModalLogin />
                  </span>
                )}
                {user && (
                  <>
                    <Menu>
                      {({ open }) => (
                        <>
                          <span className=''>
                            <Menu.Button className=''>
                              <DotsHorizontalIcon className='absolute -mt-6 h-5 hidden xl:inline ml-24 text-gray-600' />
                            </Menu.Button>
                          </span>

                          <Transition show={open}>
                            <Menu.Items
                              static
                              className='absolute bg-white w-40 origin-top-right border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none lg:-ml-4 lg:-mt-72'
                            >
                              <div className='px-4 py-3'>
                                <p className='text-sm leading-5 text-gray-500'>Signed in as</p>
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
                                        <Link href='#'>
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
                                        <span className='justify-start items-center mt-0.5 ml-2 cursor-pointer'>
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
                                        active
                                          ? 'bg-gray-100 text-gray-900 cursor-pointer'
                                          : 'text-gray-700'
                                      } flex w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer`}
                                    >
                                      <ChatIcon className='relative h-6 w-6 ml-0' />
                                      <Link href='/about'>
                                        <span className='flex justify-center items-center mt-0.5 ml-2 cursor-pointer'>
                                          About
                                        </span>
                                      </Link>
                                    </span>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className='py-1'>
                                <Menu.Item>
                                  {({ active }) => (
                                    <span
                                      onClick={logout}
                                      className={`${
                                        active
                                          ? 'bg-gray-100 text-gray-900 cursor-pointer'
                                          : 'text-gray-700'
                                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer`}
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
  );
}

export default SideBar;
