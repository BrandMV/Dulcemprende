import React, { useEffect} from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { getProductDetailsById } from '../../actions/'
import Diseño from '../../components/Diseño/Diseño'

const ProductDetailsPage = (props) => {

    const dispatch = useDispatch()
    const product = useSelector (state => state.product)

    useEffect(() => {

        const { productId } = props.match.params
        console.log(props);

        const payload = {
            params: {
                productId,
            },
        }
        dispatch(getProductDetailsById(payload))
       
    }, [])

    return (
        <Diseño>
            <div>
                {product.productDetails.name}
            </div>
        </Diseño>
    )
}

export default ProductDetailsPage
