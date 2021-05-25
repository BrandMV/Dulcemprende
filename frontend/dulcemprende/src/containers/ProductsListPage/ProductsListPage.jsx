import React, { useEffect, useState } from "react";
import Diseño from "../../components/Diseño/Diseño";
import getParams from "../../utils/getParams";
import ProductPage from "./ProductPage/ProductPage";
import ProductStore from "./ProductStore/ProductStore";
import "./styles.css";

const ProductsListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
      case "page":
        content = <ProductPage {...props} />;

        break;

        default:
          content = null
    }

    return content
  };
  return (
    <Diseño>
      {renderProduct()}
    </Diseño>
  );
};

export default ProductsListPage;
