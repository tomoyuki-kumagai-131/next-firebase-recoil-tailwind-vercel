function Footer() {
  return (
    <footer className='mt-2 absolute bottom-0 bg-gray-900 flex -mt-12 h-10 w-full items-center justify-center border-t p-4 md:p-3'>
      <a
        className='flex items-center text-white justify-center text-xs'
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        ©2021 Talexy All Rights Reserved.
        <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2 bg-white rounded-md p-1' />
      </a>
    </footer>
  );
}

export default Footer;
