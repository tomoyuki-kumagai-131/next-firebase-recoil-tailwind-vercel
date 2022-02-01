import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Button, IconButton, useToast } from '@chakra-ui/react';
import { useState } from 'react';
// import Image from 'next/image';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
// import { registerVersion } from 'firebase/app';
// import { SubmitHandler, useForm } from 'react-hook-form';
// import ModalCharacter from '../components/ModalCharacter';
// import { useRecoilState } from 'recoil';
// import { modalCharacter } from '../components/atoms/modalAtom';
import CharactersList from '../components/CharactersList';

function Graphql(results) {
  const initialState = results;

  const [characters, setCharacters] = useState(initialState.characters);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');

  const toast = useToast();

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
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className='border rounded-lg p-3 mt-5 mb-3 lg:mt-10'
          placeholder='search word...'
        />
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
      </form>

      <div className='gap-4 grid-col-1 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
        {characters.map((character, index) => (
          <CharactersList key={`${index} - ${character.id}`} character={character} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
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

export default Graphql;
