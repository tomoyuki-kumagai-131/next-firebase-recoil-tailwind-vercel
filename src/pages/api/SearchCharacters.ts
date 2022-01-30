import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { NextApiRequest, NextApiResponse } from 'next';

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_URI,
  cache: new InMemoryCache(),
});

export default async function SearchCharacters(req: NextApiRequest, res: NextApiResponse) {
  const search = req.body;

  try {
    const { data } = await client.query({
      query: gql`
        query {
          characters(filter: { name: "${search}" }) {
            info {
              count
            }
            results {
              name
              id
              location {
                name
                id
              }
              image
              origin {
                name
                id
              }
              episode {
                id
                episode
                air_date
              }
            }
          }
        }
      `,
    });
    res.status(200).json({
      characters: data.characters.results,
      error: null,
    });
  } catch (error) {
    console.log(error);
    if (error.message === '404: Not Found') {
      res.status(404).json({
        characters: null,
        error: '該当のキャラクターは見つかりませんでした',
      });
    } else {
      res.status(500).json({
        characters: null,
        error: 'サーバー側のエラーが発生しました。少し時間が経ってから再度お試しください。',
      });
    }
  }
}
