import React from 'react'
import Header from '../Header/Header'
import MenuHeader from '../MenuHeader/MenuHeader'

const Diseño = ({children}) => {
    return (
        <>
        <Header />
        <MenuHeader />
        
        {children}
        </>
    )
}

export default Diseño
