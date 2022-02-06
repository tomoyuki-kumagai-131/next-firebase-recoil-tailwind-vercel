import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { IconButton, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// import Image from 'next/image';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
// import { registerVersion } from 'firebase/app';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import ModalCharacter from '../components/ModalCharacter';
// import { useRecoilState } from 'recoil';
// import { modalCharacter } from '../components/atoms/modalAtom';
import CharactersList from '../components/CharactersList';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

function Graphql({ results }) {
  console.log(results);

  const initialState = results;

  const [characters, setCharacters] = useState(initialState.characters);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const results = await fetch('/api/SearchCharacters', {
      method: 'post',
      body: search,
    });
    const { characters, error } = await results.json();

    if (error) {
      toast({
        position: 'top',
        title: 'エラーが発生しました',
        description: error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      toast({
        position: 'top',
        title: '読み込みが完了しました',
        description: 'success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setCharacters(characters);
    }
  };

  return (
    <div className='text-center max-w-7xl mx-auto'>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      <input
        onClick={onOpen}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        className='border rounded-lg p-3 mt-5 mb-3 lg:mt-10 cursor-pointer'
        placeholder='search word...'
      />
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className=''>
          <ModalHeader className='text-gray-600'>キャラクター検索</ModalHeader>
          <ModalCloseButton />
          <ModalBody className=''>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                onClick={onOpen}
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className='border rounded-lg p-3 mt-5 mb-3 cursor-pointer'
                placeholder='search characters...'
              />
              {isLoading ? (
                <Button
                  isLoading
                  colorScheme='teal'
                  variant='solid'
                  type='submit'
                  className='rounded-lg ml-6'
                >
                  検索
                </Button>
              ) : (
                <Button
                  disabled={search === ''}
                  type='submit'
                  colorScheme='teal'
                  variant='solid'
                  className='rounded-lg lg:ml-32'
                  onClick={onClose}
                >
                  検索
                </Button>
              )}
            </form>
          </ModalBody>

          {/* <ModalFooter>
              {isLoading ? (
                <Button
                  isLoading
                  colorScheme='teal'
                  variant='solid'
                  type='submit'
                  className='rounded-lg ml-2'
                >
                  検索
                </Button>
              ) : (
                <Button
                  disabled={search === ''}
                  type='submit'
                  colorScheme='teal'
                  variant='solid'
                  className='rounded-lg ml-1'
                >
                  検索
                </Button>
              )}
            </ModalFooter> */}
        </ModalContent>
      </Modal>
      <CloseIcon
        w={4}
        h={4}
        onClick={() => {
          setSearch(''), setCharacters(initialState.characters);
        }}
        className='ml-4 mr-3 cursor-pointer'
      />
      {isLoading ? (
        <Button
          isLoading
          colorScheme='teal'
          variant='solid'
          type='submit'
          className='rounded-lg ml-2'
        >
          検索
        </Button>
      ) : (
        <Button
          disabled={search === ''}
          type='submit'
          colorScheme='teal'
          variant='solid'
          className='rounded-lg ml-1'
        >
          検索
        </Button>
      )}
      {/* </form> */}

      <div className='gap-4 grid-col-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        {characters.map((character, index) => (
          <CharactersList key={`${index} - ${character.id}`} character={character} />
        ))}
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const client = new ApolloClient({
//     uri: process.env.NEXT_PUBLIC_URI,
//     cache: new InMemoryCache(),
//   });

//   const { data } = await client.query({
//     query: gql`
//       query {
//         characters(page: 1) {
//           results {
//             id
//             name
//             species
//             image
//             episode {
//               id
//               name
//             }
//             location {
//               id
//               name
//             }
//           }
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       characters: data.characters.results,
//     },
//   };
// }

export default Graphql;
