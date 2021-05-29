import React, { useState, useEffect } from 'react'
import Diseño from '../../components/Diseño/Diseño'
import { useDispatch, useSelector} from 'react-redux'
import { getProductDetailsById } from '../../actions'

const ProductDetails = (props) => {

    const dispatch = useDispatch()
console.log("propsbyID",props);
    useEffect(() => {
        const { productId } = props.match.params
        console.log(props);
        const payload = {
            params:{
                productId
            }
        }
        

        dispatch(getProductDetailsById(payload))

        
    }, [])


    return (
        <Diseño>
            <div>pruebas</div>
        </Diseño>
    )
}

export default ProductDetails
