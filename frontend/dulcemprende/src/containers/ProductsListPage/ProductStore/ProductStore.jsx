import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions/product.action";
import "./style.css";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from 'react-router-dom'
const ProductStore = (props) => {
    const product = useSelector((state) => state.product);
    const dispatch = useDispatch();
      const [priceRange, setPriceRange] = useState({
          uder5k: 5000,
          under10k: 10000,
          under15k: 15000,
          under20k: 20000,
          under30k: 30000
      })
    useEffect(() => {
      const { match } = props;
      dispatch(getProductsBySlug(match.params.slug));
    }, []);
  return (
    <>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card" key={index}>
            <div className="cardHeader">
              <div>
                {props.match.params.slug} por menos de {priceRange[key]}
              </div>
              <button>Ver todos</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product, index) => (
                <Link to={`/${product.slug}/${product._id}/p`} style={{display:'block'}} className="productContainer" key={index}>
                  <div className="productImgContainer">
                    <img
                      src={generatePublicUrl(product.productPictures[0].img)}
                      alt=""
                    />
                  </div>
                  <div className="productInfo">
                    <div style={{ margin: "5px 0" }}>{product.name}</div>
                    <div>
                      <span>4.3</span>&nbsp;
                      <span>3332</span>
                    </div>
                    <div className="productPrice">{product.price}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductStore;
