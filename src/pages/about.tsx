function About() {

  return (
    <div className="h-screen">
      <div className='items-center justify-center'>
        <h1 className='text-2xl my-3 p-5 text-center lg:text-3xl lg:p-9 lg:my-3'>⚡️Talexy</h1>
        <p className='text-xl p-4 text-center lg:text-xl'>Talexyは小さな目標から大きな目標まで、カジュアルに投稿することができるアプリです。</p>
        <p className='text-xl p-4 text-center lg:text-xl'>いいな！と思った投稿にはいいねを付けて交流しましょう。</p>
        <p className='text-xl p-4 text-center lg:text-xl'>使用技術</p>
        <p className='text-xl p-4 text-center lg:text-xl'>
          Next.js(React.js) / React Hooks / TypeScript / Recoil / Jest / React Testing Library / Tailwind CSS / Firebase v9 / Vercel
        </p>
        <img
          className='flex justify-center items-center my-1 pb-12 md:mx-auto lg:mx-auto'
          src={process.env.NEXT_PUBLIC_ABOUT_HERO_IMAGE}
          alt="AboutHeroset"
        />
      </div>
    </div>
  )
}

export default About
