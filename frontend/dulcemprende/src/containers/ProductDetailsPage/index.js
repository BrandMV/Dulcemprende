import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { addToCart } from "../../actions";
import { generatePublicUrl } from "../../urlConfig";

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [pictureIndex, setPictureIndex] = useState(0);

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails).length === 0) {
    return <h1>Algo salio mal...</h1>;
  }

  return (
    <Layout>
      <div className="small-container single-product">
        <div className="row">
          <div className="col-2">
            <img
              src={generatePublicUrl(
                product.productDetails.productPictures[pictureIndex].img
              )}
              width="100%"
            />
            <div className="small-img-row">
              {product.productDetails.productPictures.map((thumb, index) => (
                <div className="small-img-col" key={index}>
                  <img
                    src={generatePublicUrl(thumb.img)}
                    alt={thumb.img}
                    onClick={() => setPictureIndex(index)}
                    width="100%"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-2">
            <p>Productos / {product.productDetails.name}</p>
            <h1>{product.productDetails.name}</h1>
            <h4>{product.productDetails.price}MXN</h4>
            <MaterialButton
              title="Añadir al carrito"
              bgColor="#ff9f00"
              textColor="#ffffff"
              style={{
                marginRight: "5px",
                margin: "20px 0",
              }}
              icon={<IoMdCart />}
              onClick={() => {
                const { _id, name, price } = product.productDetails;
                const img = generatePublicUrl(
                  product.productDetails.productPictures[0].img
                );
                dispatch(addToCart({ _id, name, price, img }));
                // props.history.push(`/cart`);
              }}
            />
            <h3>
              Detalles del producto <i className="fas fa-info-circle"></i>
            </h3>
            <br />
            <p>{product.productDetails.description}</p>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </Layout>
  );
};

export default ProductDetailsPage;
