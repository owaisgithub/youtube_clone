import { Sidebar, DisplayVideos } from './components/index'

function App() {

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <DisplayVideos />
      </div>
    </div>
  )
}

export default App
