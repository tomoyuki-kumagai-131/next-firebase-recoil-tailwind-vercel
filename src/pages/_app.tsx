import { ChakraProvider } from '@chakra-ui/react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil'
import { modalUpdate } from '../components/atoms/modalAtom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ModalUpdate from '../components/ModalUpdate'
import { AuthProvider } from '../context/AuthContext'
import { db } from '../lib/firebase'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <RecoilRoot>
          <ChakraProvider>
            <Header />
            <Component {...pageProps} />
            {/* <ModalUpdate /> */}
            <Footer />
          </ChakraProvider>
        </RecoilRoot>
      </AuthProvider>
    </>
  )
}

export default MyApp
