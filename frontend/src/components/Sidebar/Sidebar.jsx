import { Nav } from 'react-bootstrap'
import '../../static/css/sidebar.css'


const Sidebar = () => {
    return (
        <Nav className="col-md-2 bg-white sidebar">
          <div className="sidebar-sticky">
            <ul className='side-bar'>
              <li className='side-bar-item'>Home</li>
              <li className='side-bar-item'>Subscriptions</li>
              <hr />
              <li className='side-bar-item'>Your channel</li>
              <li className='side-bar-item'>Your videos</li>
            </ul>
          </div>
      </Nav>
        // <div className="side-bar">
        //     <div className='box'>
        //         <div className='side-bar-item'>
        //             <span>Home</span>
        //         </div>
        //         <div className='side-bar-item'>
        //             <span>Subscriptions</span>
        //         </div>    
        //     </div>
        //     <hr />

        //     <div className='box'>
        //         <p id='you'>You</p>
        //         <div className='side-bar-item'>
        //             <span>Your channel</span>
        //         </div>
        //         <div className='side-bar-item'>
        //             <span>Your videos</span>
        //         </div>    
        //     </div>  
            
        // </div>
    )
}

export default Sidebar