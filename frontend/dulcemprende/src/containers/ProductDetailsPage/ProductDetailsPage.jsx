import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsById, getProductsBySlug } from '../../actions/product.action';
import { 
  IoIosArrowForward, 
  IoIosStar, 
  IoMdCart 
} from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { AiFillThunderbolt } from 'react-icons/ai';
import { MaterialButton } from '../../components/MaterialUI/MaterialUI';
import './style.css';
import { generatePublicUrl } from '../../urlConfig';
import Diseño from '../../components/Diseño/Diseño';

const ProductDetailsPage = (props) => {

  // const dispatch = useDispatch();
  // const product = useSelector(state => state.product);

  // useEffect(() => {
    
  //   const { productId } = props.match.params;
  //   console.log(props);
  //   const payload = {
  //     params: {
  //       productId
  //     }
  //   }
  //   dispatch(getProductDetailsById(payload));
  // }, []);
  const product = useSelector((state) => state.product);
  console.log("product",props);

  

    const dispatch = useDispatch();
    useEffect(() => {
      const { match } = props;
      // console.log("slug",match.params.slug);
      dispatch(getProductsBySlug(match.params.slug));
    }, []);
    console.log("pp",product);

  // if(Object.keys(product).length === 0){
  //     console.log("p",product.productDetails)
  //   return <p>Nada</p> ;
  // }

  return (
    <Diseño>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer">
        <div className="flexRow">
          <div className="verticalImageStack">
            {/* {
              product.productPictures.map((thumb, index) => 
              <div className="thumbnail">
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />
              </div>
              )
            } */}
            {/* <div className="thumbnail active">
              {
                product.productDetails.productPictures.map((thumb, index) => 
                <img src={generatePublicUrl(thumb.img)} alt={thumb.img} />)
              }
            </div> */}
          </div>
          <div className="productDescContainer">
            {/* <div className="productDescImgContainer">
              <img src={generatePublicUrl(product.productPictures[0].img)} alt={`${product.productPictures[0].img}`} />
            </div> */}

            {/* action buttons */}
            <div className="flexRow">
              <MaterialButton
                title="Añadir al carrito"
                bgColor="#ff9f00"
                textColor="#ffffff"
                style={{
                  marginRight: '5px'
                }}
                icon={<IoMdCart />}
              />
              <MaterialButton
                title="Comprar ahora"
                bgColor="#fb641b"
                textColor="#ffffff"
                style={{
                  marginLeft: '5px'
                }}
                icon={<AiFillThunderbolt />}
              />
            </div>
          </div>
        </div>
        <div>

          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li><a href="#">Home</a><IoIosArrowForward /></li>
              <li><a href="#">Mobiles</a><IoIosArrowForward /></li>
              <li><a href="#">Samsung</a><IoIosArrowForward /></li>
              <li><a href="#">{product.name}</a></li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
              <p className="productTitle">{product.name}</p>
            <div>
              <span className="ratingCount">4.3 <IoIosStar /></span>
              <span className="ratingNumbersReviews">72,234 Ratings & 8,140 Reviews</span>
            </div>
            <div className="extraOffer">Extra <BiRupee />4500 off </div>
            <div className="flexRow priceContainer">
              <span className="price"><BiRupee />{product.price}</span>
              <span className="discount" style={{ margin: '0 10px' }}>22% off</span>
              {/* <span>i</span> */}
              </div>
            <div>
              <p style={{ 
                color: '#212121', 
                fontSize: '14px',
                fontWeight: '600' 
                }}>Available Offers</p>
              <p style={{ display: 'flex' }}>
                <span style={{
                  width: '100px',
                  fontSize: '12px',
                  color: '#878787',
                  fontWeight: '600',
                  marginRight: '20px'
              }}>Description</span>
              <span style={{
                fontSize: '12px',
                color: '#212121',
              }}>{product.description}</span>
              </p>
            </div>
          </div>
          

        </div>
      </div>
    </Diseño>
  )

}

export default ProductDetailsPage