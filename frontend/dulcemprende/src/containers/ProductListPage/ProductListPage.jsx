import React from "react";
import Layout from "../../components/Layout/Layout";
import getParams from "../../utils/getParams";
import ProductStore from "./ProductStore/ProductStore";
import "./style.css";

const ProductListPage = (props) => {
  const renderProduct = () => {
    console.log(props);
    const params = getParams(props.location.search);
    let content = null;
    switch (params.type) {
      case "store":
        content = <ProductStore {...props} />;
        break;
    }

    return content;
  };

  return <Layout>{renderProduct()}</Layout>;
};

export default ProductListPage;
