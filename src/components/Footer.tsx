function Footer() {
  return (
    <footer className='flex -mt-12 h-24 w-full items-center justify-center border-t p-4'>
      <a
        className='flex items-center justify-center'
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        ©2021 Talexy All Rights Reserved.
        <br />
        <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' />
      </a>
    </footer>
  );
}

export default Footer;
