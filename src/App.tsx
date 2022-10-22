import React from 'react'
import smallImg from '@/assets/images/title.png'
import bigImg from '@/assets/images/100411-before.jpg'
import './app.less'

function App() {
  const handleClick = () => {
    console.log(11)
  }
  return (
    <>
      <h2>2</h2>
      <img onClick={handleClick} className='smallImg' src={smallImg} alt='小于10kb的图片' />
      <img className='bigImg' src={bigImg} alt='大于于10kb的图片' />
    </>
  )
}

export default App
