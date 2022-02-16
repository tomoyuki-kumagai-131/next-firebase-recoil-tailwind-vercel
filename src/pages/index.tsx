import Head from 'next/head';
import { UseAuthContext } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { modalGuestLogin, modalLogin } from '../components/atoms/modalAtom';
import Posts from '../components/Posts';
import Graphql from '../components/Graphql';
import ModalGuestLogin from '../components/ModalGuestLogin';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { useState } from 'react';
import SideBar from '../components/SideBar';
import Footer from '../components/Footer';

import RightNav from '../components/RightNav';

export default function Home(results) {
  const { user }: any = UseAuthContext();

  const [open, setOpen] = useRecoilState(modalLogin);

  const [openGuestModal, setOpenGuestModal] = useRecoilState(modalGuestLogin);

  const router = useRouter();

  const initialState = results;

  const [characters, setCharacters] = useState(initialState.characters);

  return (
    <>
      <Head>
        <title>Talexy</title>
        <meta name='description' content='Generated by create next app' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1.0,maximum-scale=1.0'
        ></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='flex mx-auto'>
        {user ? (
          <>
            <SideBar />
            <Posts />
            <RightNav />
          </>
        ) : (
          <div className='flex grid items-center justify-center mx-auto'>
            <img
              className='hidden lg:flex justify-center items-center mt-5 mb-3 p-3 rounded-lg'
              src='https://image.freepik.com/free-vector/business-team-work-process-steps-from-idea-target-business-workflow-business-process-efficiency-working-activity-pattern-concept-pinkish-coral-bluevector-isolated-illustration_335657-1649.jpg'
            />
            <h1 className='text-2xl my-2 p-2 text-center lg:text-3xl lg:p-1 lg:my-2 mb-2 text-black'>
              ⚡️Talexy
            </h1>
            <h1 className='text-2xl p-1 text-center lg:mb-8 lg:text-3xl text-black mb-6'>
              Make your small goals come true!
            </h1>
            <div className='inline-block justify-center items-center text-center'>
              <button
                onClick={() => setOpen(true)}
                className='bg-teal-500 text-black border m-2 p-3 w-40 rounded-lg hover:bg-teal-600'
              >
                Log in
              </button>
              <button
                onClick={() => router.push('/about')}
                className='border text-black bg-yellow-400 m-2 p-3 w-40 rounded-lg hover:bg-yellow-500'
              >
                About
              </button>
              <button
                onClick={() => setOpenGuestModal(true)}
                className='bg-blue-500 text-black border m-2 p-3 w-40 rounded-lg hover:bg-blue-600'
              >
                ゲストログイン
              </button>

              <ModalGuestLogin />
              <button
                onClick={() => router.push('/graphql')}
                className='bg-pink-500 text-black border m-2 p-3 w-40 rounded-lg hover:bg-blue-600'
              >
                GraphQLを試す
              </button>
            </div>
            <img
              className='lg:flex justify-center items-center mt-5 mb-3 p-3 rounded-lg mb-12'
              src='https://image.freepik.com/free-vector/business-team-work-process-steps-from-idea-target-business-workflow-business-process-efficiency-working-activity-pattern-concept-pinkish-coral-bluevector-isolated-illustration_335657-1649.jpg'
            />
          </div>
        )}
        {/* <Footer /> */}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        characters(page: 1) {
          results {
            id
            name
            species
            image
            episode {
              id
              name
            }
            location {
              id
              name
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}
