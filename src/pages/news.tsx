import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr'
import news from './api/news';

function fetcher(url) {
  return fetch(url).then((res) => res.json())
}

function News() {
  const { data, error } = useSWR('/api/news', fetcher)

  if (error) return <span>An error has occurred.</span>;
  if (!data) return <span className='flex items-center justify-center'>...Loading</span>;

  const headline = data.data

  return (
    <div className='items-center justify-center text-center'>
      <h1 className='mt-12 mb-8 text-2xl'>最新国内ニュース</h1>
      <button className='mb-12 border p-2 rounded-lg bg-teal-500 text-white outline-none' onClick={()=> location.reload()}>
        更新
      </button>
      <div className='grid lg:grid-cols-3 lg:mx-6 xl:grid-cols-3'>
        {headline.articles.map((item, i) => {
            return (
                <div key={i} className='mb-12 mx-8 text-left'>
                  <div className=''>
                  <Link href={item.url}>
                    <span className='border-b'>{item.title}</span>
                  </Link>
                  <img src={item.urlToImage} className='mt-6 object-contain w-96'/>
                  </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default News
