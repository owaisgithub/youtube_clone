import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'

import App from './App.jsx'
import { Header, About, VideoPlay, Register, Login } from './components/index.js'

import 'bootstrap/dist/css/bootstrap.min.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Header />
      <div className='m-top-5'>
        <Routes>
          <Route path='/' Component={App} />
          <Route path='/about' Component={About} />
          <Route path='/video/:id' Component={VideoPlay} />
          <Route path='/login' Component={Login} />
          <Route path='/register' Component={Register} />
        </Routes>
      </div>
    </Router>
  </Provider>,
)
