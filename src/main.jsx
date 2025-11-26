import React from 'react'
import ReactDOM from 'react-dom/client'
import SoulNavApp from './SoulNavApp'
import './index.css' // 即使为空也可以保留，防止报错

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoulNavApp />
  </React.StrictMode>,
)
