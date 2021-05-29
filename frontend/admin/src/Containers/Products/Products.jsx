import React, { useState } from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Row, Col, Table } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";
import Modal from "../../components/UI/Modal/Modal";
import "./styles.css";
import {generatePublicUrl} from "../../urlConfig"

const Products = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const handleClose = () => {

    setShow(false);
  };

  const submitProductForm = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);
    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form)).then(() => setShow(false));
    
  }
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  const renderProducts = () => {
    return (
      <Table responsive="sm" style={{ fontSize: 14 }}>
        <thead>
          <tr>
           
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Categoria</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr
                  key={product._id}
                  onClick={() => showProductDetailsModal(product)}
                >
           
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  {/* <td>{product.category}</td> */}
                  <td>{product.category.name}</td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  const renderAddProductModal = () => {
    console.log("categoriaproduct", categoryId);
    console.log("nameproduct", name);
    console.log("categoriaproduct", quantity);
    console.log("categoriaproduct", description);
    console.log("categoriaproduct", productPictures);
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTitle={"Añadir producto"}
        onSubmit={submitProductForm}
      >
        <Input
          label="Nombre"
          value={name}
          placeholder={`Nombre del producto`}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Cantidad"
          value={quantity}
          placeholder={`Cantidad`}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <Input
          label="Precio"
          value={price}
          placeholder={`Precio`}
          onChange={(e) => setPrice(e.target.value)}
        />
        <Input
          label="Descripcion"
          value={description}
          placeholder={`Descripcion`}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={categoryId}
          className="form-control"
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option>Selecciona una categoria</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        {productPictures.length > 0
          ? productPictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
        <input
          type="file"
          name="productPicture"
          onChange={handleProductPictures}
        />
      </Modal>
    );
  };

  const handleCloseProductDetailsModal = () => {
    setProductDetailModal(false);
  };

  const showProductDetailsModal = (product) => {
    setProductDetails(product);
    setProductDetailModal(true);
  };

  const renderProductDetailsModal = () => {
    if (!productDetails) {
      return null;
    }
console.log("pDe",productDetails);

    return (
      <Modal
      size="lg"

        show={productDetailModal}
        handleClose={handleCloseProductDetailsModal}
        modalTitle={"Detalles del producto"}
        onSubmit={handleCloseProductDetailsModal}
      >
        <Row>
          <Col md="6">
            <label className="key">Nombre</label>
            <p className="value">{productDetails.name}</p>
          </Col>
          <Col md="6">
            <label className="key">Precio</label>
            <p className="value">{productDetails.price}</p>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <label className="key">Cantidad</label>
            <p className="value">{productDetails.quantity}</p>
          </Col>
          <Col md="6">
            <label className="key">Categoria</label>
            <p className="value">{productDetails.category.name}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Desccripción</label>
            <p className="value">{productDetails.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <label className="key">Imagenes</label>
            <div style={{ display: "flex" }}>
              {productDetails.productPictures.map((picture, index) => (
                <div key={index} className="productImgContainer">
                  <img src={generatePublicUrl(picture.img)} />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Producto</h3>
              <button onClick={handleShow}>Añadir</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{renderProducts()}</Col>
        </Row>
      </Container>
      {renderAddProductModal()}
      {renderProductDetailsModal()}
    </Layout>
  );
};

export default Products;
