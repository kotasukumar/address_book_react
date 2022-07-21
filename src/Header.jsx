import React, { Component } from 'react'
import './Header.css'
import Logo from '../src/Assests/icon/icons8-address-book-2-48.png'

export class Header extends Component {
/*===================================================================================================
                                HTML for header(common to all the pages)
====================================================================================================== */
  render() {
    return (
      <div>
          <header className="header-content header">
		    <div className="logo-content">
			    <img src={Logo} alt="" />
			    <div>
				    <span className="address-text">Address</span><br />
				    <span className="address-text address-book">Book</span>
			    </div>
		    </div>
            <div>
            </div>
            </header>
        </div>
    )
  }
}

export default Header