import React, { useEffect, useState } from "react";
import Diseño from "../../components/Diseño/Diseño";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions/product.action";
import "./styles.css";
import { generatePublicUrl } from "../../urlConfig";

const ProductsListPage = (props) => {
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
    <Diseño>
      {Object.keys(product.productsByPrice).map((key, index) => {
        return (
          <div className="card">
            <div className="cardHeader">
              <div>{props.match.params.slug} por menos de {priceRange[key]}</div>
              <button>Ver todos</button>
            </div>
            <div style={{ display: "flex" }}>
              {product.productsByPrice[key].map((product) => (
                <div className="productContainer">
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
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </Diseño>
  );
};

export default ProductsListPage;