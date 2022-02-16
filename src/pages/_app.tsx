import { ChakraProvider } from '@chakra-ui/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { modalUpdate } from '../components/atoms/modalAtom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ModalCharacter from '../components/ModalCharacter';
import ModalUpdate from '../components/ModalUpdate';
import { AuthProvider } from '../context/AuthContext';
import { db } from '../lib/firebase';
import '../styles/globals.css';
import '../styles/markdown.css';
import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';

const clientSideEmotionCache = createEmotionCache();

function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
  return (
    <>
      <AuthProvider>
        <RecoilRoot>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
              <ChakraProvider>
                <Header />
                <Component {...pageProps} />
                {/* <ModalUpdate /> */}
              </ChakraProvider>
            </ThemeProvider>
          </CacheProvider>
        </RecoilRoot>
      </AuthProvider>
    </>
  );
}

export default MyApp;
