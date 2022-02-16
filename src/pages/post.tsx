import { ChevronDoubleLeftIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useState } from 'react';
import PostPreview from '../components/PostPreview';

export default function Post() {
  const [markdown, setMarkdown] = useState();

  const setData = (e: any) => {
    e.preventDefault();

    setMarkdown(e.target.value);
  };

  const [isShow, setIsShow] = useState(false);

  return (
    <div className='post-form min-h-screen max-w-7xl mx-auto'>
      <div className='flex flex-col'>
        <div className='pl-9 pt-9'>
          <Link href='/'>
            <ChevronDoubleLeftIcon className='cursor-pointer h-10 w-10 font-bold shadow-lg rounded-lg p-1' />
          </Link>
        </div>
        <h1 className='text-center font-bold text-2xl -mt-6 mb-6 md:text-4xl md:py-10'>
          Create Post
        </h1>
        <div className='editor flex-grow flex-shrink'>
          <form className='h-full'>
            <input
              type='text'
              id='post-title'
              placeholder='Title'
              className='ml-10 px-5 block w-4/5 rounded-lg border h-14 text-2xl font-bold focus:outline-none mb-10 shadow-lg'
            />
            <div className='mx-auto flex justify-between'>
              {isShow ? (
                <div className='ml-10 w-4/5'>
                  <PostPreview markdown={markdown} />
                </div>
              ) : (
                <div className='ml-10 w-[300px] md:w-4/5 mx-auto'>
                  <textarea
                    name='md'
                    id='md'
                    placeholder='Markdownで記述'
                    className='markdown-form resize-none w-full h-[800px] border shadow-xl mb-5 rounded-xl focus:outline-none py-6 px-6'
                    value={markdown}
                    onChange={setData}
                  ></textarea>
                  <span>
                    <a
                      target='_blank'
                      rel='noopener noreferrer'
                      href='https://zenn.dev/zenn/articles/markdown-guide'
                      className='cursor-pointer'
                    >
                      <QuestionMarkCircleIcon className='absolute rounded-lg w-7 h-7 ml-[980px] -mt-[810px]' />
                    </a>
                  </span>
                </div>
              )}
              <br />
              {isShow ? (
                <button
                  className='text-2xl shadow-lg mr-6 md:mr-11 rounded-lg w-24 h-12 shadow-lg p-1 bg-pink-400 text-white font-bold'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsShow(!isShow);
                  }}
                >
                  Edit
                </button>
              ) : (
                <button
                  className='text-xl shadow-lg mr-6 md:mr-11 rounded-lg w-24 h-12 shadow-lg p-2 bg-blue-400 text-white font-bold'
                  onClick={(e) => {
                    e.preventDefault();
                    setIsShow(!isShow);
                  }}
                >
                  preview
                </button>
              )}
            </div>

            {!isShow && (
              <input
                type='submit'
                className='submit-post cursor-pointer w-36 h-10 my-8 rounded-md font-bold block mx-auto hover:opacity-70'
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
