import React, { useState, useEffect } from 'react';
import './styles.css';
import flipkartLogo from '../../images/logo/flipkart.png';
import goldenStar from '../../images/logo/golden-star.png';
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown, IoIosCart, IoIosSearch } from 'react-icons/io';
import { 
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu
} from '../MaterialUI/MaterialUI';
import { login, signout } from '../../actions';


const Header = (props) => {

  const [loginModal, setLoginModal] = useState(false);
  const [correo, setCorreo] = useState('');
  const [contra, setContra] = useState('');
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  
  const userLogin = () => {
        dispatch(login({correo, contra}))
  }
  const logout = () => {
    dispatch(signout())
  }

  useEffect(() => {
      if(auth.authenticate){
          setLoginModal(false)

      }
  }, [auth.authenticate])

  const renderLoggedInMenu = () => {

    return (
        <DropdownMenu
        menu={
          <a className="nombreCompleto">
            {auth.user.nombreCompleto}
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href: '', icon: null },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Cerrar Sesión', href: '', icon: null, onClick: logout },
        ]}
      />
    )

  }
  const renderNonLoggedInMenu = () => {

    return (
        <DropdownMenu
        menu={
          <a className="loginButton" onClick={() => setLoginModal(true)}>
            Login
          </a>
        }
        menus={[
          { label: 'My Profile', href: '', icon: null },
          { label: 'Flipkart Plus Zone', href: '', icon: null },
          { label: 'Orders', href: '', icon: null },
          { label: 'Wishlist', href: '', icon: null },
          { label: 'Rewards', href: '', icon: null },
          { label: 'Gift Cards', href: '', icon: null },
        ]}
        firstMenu={
          <div className="firstmenu">
            <span>¿Nuevo en dulcemprende?</span>
            <a style={{ color: '#2874f0' }}>Registrate!</a>
          </div>
        }
      />
    )
      
}

  return (
    <div className="header">
      <Modal 
        visible={loginModal}
        onClose={() => setLoginModal(false)}
      >
        <div className="authContainer">
          <div className="row">
            <div className="leftspace">
              <h2>Login</h2>
              <p>Get access to your Orders, Wishlist and Recommendations</p>
            </div>
            <div className="rightspace">
          

                <MaterialInput 
                  type="text"
                  label="Enter Email/Enter Mobile Number"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  
                />

                <MaterialInput 
                  type="password"
                  label="Enter Password"
                  value={contra}
                  onChange={(e) => setContra(e.target.value)}
                  rightElement={<a href="#">Forgot?</a>}
                />

                <MaterialButton 
                title="Login"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{margin: '60px 0 20px 0'}}
                onClick={userLogin}
                />

                <p>O</p>
                <MaterialButton 
                    title="Registrate"
                    bgColor="#ffffff"
                    textColor="#fb641b"
                    style={{margin: '20px 0'}}
                    />
          
               

              

            </div>
          </div>
        </div>
      </Modal>
      <div className="subHeader">
        <div className="logo">
          <a href="">
            <img src={flipkartLogo} className="logoimage" alt="" />
          </a>
          <a style={{ marginTop: '-10px' }}>
            <span className="exploreText">Explore</span>
            <span className="plusText">Plus</span>
            <img src={goldenStar} className="goldenStar" alt="" />
          </a>
        </div>
        <div style={{
          padding: '0 10px'
        }}>
          <div className="searchInputContainer">
            <input
              className="searchInput"
              placeholder={'search for products, brands and more'}
            />
            <div className="searchIconContainer">
              <IoIosSearch style={{
                color: '#2874f0'
              }} />
            </div>

          </div>
        </div>
        <div className="rightMenu">
            {

                auth.authenticate ?
                renderLoggedInMenu() : renderNonLoggedInMenu()
            }
          <DropdownMenu
            menu={
              <a className="more">
                <span>More</span>
                <IoIosArrowDown />
              </a>
            }
            menus={[
              { label: 'Notification Preference', href: '', icon: null },
              { label: 'Sell on flipkart', href: '', icon: null },
              { label: '24x7 Customer Care', href: '', icon: null },
              { label: 'Advertise', href: '', icon: null },
              { label: 'Download App', href: '', icon: null }
            ]}
          />
          <div>
            <a className="cart">
              <IoIosCart />
              <span style={{ margin: '0 10px' }}>Cart</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )

}

export default Header
