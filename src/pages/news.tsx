import Link from 'next/link';
import useSWR from 'swr'
import news from './api/news';

function fetcher(url) {
  return fetch(url).then((res) => res.json())
}

function News() {
  const { data, error } = useSWR('/api/news', fetcher)

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";

  return (
    <div className='items-center justify-center text-center'>
    <h1 className='mt-12 mb-8 text-2xl'>最新国内ニュース</h1>
    <button className='mb-12 border p-2 rounded-lg bg-teal-500 text-white outline-none' onClick={()=> location.reload()}>
      更新
    </button>
    {data.data.articles.map((item, i) => {
        return (
          <div key={i} className='mb-12'>
            <Link href={item.url}>
              <span className='border-b'>{item.title}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default News
