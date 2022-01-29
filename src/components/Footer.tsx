function Footer() {
  return (
    <footer className='flex h-24 w-full items-center justify-center border-t p-4'>
      <a
        className='flex items-center justify-center'
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        ©2021 Talexy All Rights Reserved.
        <br />
        {/* <span className='ml-2'>Powered by </span> */}
        <img src='/vercel.svg' alt='Vercel Logo' className='h-4 ml-2' />
      </a>
    </footer>
    // <span className="">
    //   <p className="bg-gray-200 sticky p-4 text-center text-xs">Copyright © 2021 Talexy, Tomoyuki Kumagai, All Rights Reserved.</p>
    // </span>
  )
}

export default Footer
