import React from 'react'
import Demo1 from '@/components/Demo1'
import Demo2 from './components/Demo2'
import './app.less'

function App() {
  const content = `您现在位于 ${process.env.NODE_ENV} 环境中, 欢迎您: ${process.env.REACT_APP_REQUEST_URL}`
  return (
    <>
      <Demo1></Demo1>
      <Demo2></Demo2>
      <h2>{content}</h2>
    </>
  )
}

export default App
