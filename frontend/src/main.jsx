import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './app/store'

// import App from './App.jsx'
import { Header, Home, About, Subscription, Video, Login, Register, VideoUpload } from './components/index.js'
import './index.css';
import '@fortawesome/fontawesome-free/css/all.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <div className='bg-gray-700'>
      <Router>
        <Header />
        <div className='pt-12'>
          <Routes>
            <Route path='/' Component={Home} />
            <Route path='/video-play/:channel/:videoId' Component={Video} />
            <Route path='/upload-video' Component={VideoUpload} />
            <Route path='/login' Component={Login} />
            <Route path='/register' Component={Register} />
            <Route path='/about' Component={About} />
            <Route path='/subscription' Component={Subscription} />
          </Routes>
        </div>
      </Router>
    </div>
  </Provider>,
)
