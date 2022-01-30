import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { Button, IconButton, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import Image from 'next/image';
import { CloseIcon, SearchIcon } from '@chakra-ui/icons';
import { registerVersion } from 'firebase/app';
import { SubmitHandler, useForm } from 'react-hook-form';

function Graphql(results) {
  const initialState = results;

  const [characters, setCharacters] = useState(initialState.characters);

  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState('');

  const [submitted, setSubmitted] = useState(false);

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
          className='border rounded-lg p-2 mt-4'
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
        {characters.map((character) => {
          return (
            <div
              key={character.id}
              className='h-88 w-88 relative mb-8 mt-2 grid items-center justify-center space-x-9 border bg-gray-50 shadow-md md:mt-10 md:w-80 lg:mt-10 lg:mb-8 lg:w-96 xl:mx-10'
            >
              <div
                className='
                mt-6 cursor-pointer
                transition-transform duration-300 ease-in-out hover:scale-105'
              >
                <Image src={character.image} height={320} width={320} />
              </div>
              <span className='mb-3'>{character.name}</span>
            </div>
          );
        })}
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
