import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';
import useSWRInfinite from 'swr/infinite'



function News() {
  // const { data, error } = useSWR('/api/news', fetcher)

  function fetcher(url: string) {
    return fetch(url).then((res) => res.json())
  }

  // const getKey = (index, previousPageData) => {
  //   if(previousPageData && !previousPageData.length) return null;
  //   return `https://newsapi.org/v2/top-headlines?country=jp&page=${index+1}&pageSize=3&&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
  // }
  // const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher)

  const { data, error, size, setSize } = useSWRInfinite((index: number) => `https://newsapi.org/v2/top-headlines?country=jp&page=${index +1}&pageSize=3&&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`, fetcher)

  if (error) return <span>An error has occurred.</span>;
  if (!data) return (
    <div className="relative flex justify-center mt-32">
      <div className="animate-ping h-2 w-2 bg-blue-400 rounded-full"></div>
      <div className="animate-ping h-2 w-2 bg-blue-400 rounded-full mx-4"></div>
      <div className="animate-ping h-2 w-2 bg-blue-400 rounded-full"></div>
    </div>
  )

  const isLoading = size > 0 && data && typeof data[size - 1] === "undefined"

  return (
    <div className='items-center justify-center text-center'>
      <h1 className='mt-12 mb-8 text-2xl'>最新国内ニュース</h1>
      <button className='mb-12 border p-2 rounded-lg bg-teal-500 text-white outline-none' onClick={()=> location.reload()}>
        更新
      </button>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 lg:mx-6 xl:grid-cols-3'>
        {data.map((item) => {
          return (
            <>
            {!data && '...loading'}
              {item.articles.map((item, id) => {
                return (
                  <div key={id} className='mb-12 mx-8 text-left'>
                    <div className=''>
                    <Link href={item.url}>
                      <span className='border-b cursor-pointer'>{item.title}</span>
                    </Link>
                    <a href={item.url}>
                      <img src={item.urlToImage} className='mt-6 object-contain w-96 cursor-pointer' />
                    </a>
                    </div>
                  </div>
                )
              })}
            </>
            )
          })}
      </div>
      <div className=''>
        <button className='mb-12 border p-3 rounded-lg bg-orange-400 text-white outline-none' onClick={() => setSize(size + 1) }>
          {isLoading? (
            <span className="relative flex justify-center p-3">
              <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
              <div className="animate-ping h-2 w-2 bg-white rounded-full mx-4"></div>
              <div className="animate-ping h-2 w-2 bg-white rounded-full"></div>
            </span>
          ): (
            '読み込む'
          )}
        </button>
      </div>
    </div>
  )
}

export default News
