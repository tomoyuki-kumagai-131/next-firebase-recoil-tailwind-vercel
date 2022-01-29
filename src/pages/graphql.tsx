import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { IconButton, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import Image from 'next/image'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'

function Graphql(results) {
  const initialState = results

  const [characters, setCharacters] = useState(initialState.characters)

  const [isLoading, setIsLoading] = useState()

  const [search, setSearch] = useState('')

  const toast = useToast()

  return (
    <div className='text-center max-w-7xl mx-auto'>
      <form className=''>
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className='border rounded-lg p-2 mt-4'
          placeholder='search word...'
        />
        <CloseIcon w={4} h={4} onClick={() => setSearch('')} className='ml-3 cursor-pointer' />
        <button type='submit' className='rounded-lg p-2 ml-1'>
          <SearchIcon w={5} h={5} />
        </button>
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
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_URI,
    cache: new InMemoryCache(),
  })

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
  })

  return {
    props: {
      characters: data.characters.results,
    },
  }
}

export default Graphql
