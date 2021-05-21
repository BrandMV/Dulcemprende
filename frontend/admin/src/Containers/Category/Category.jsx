import React, { useEffect, useState } from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory } from "../../actions";
import Input from "../../components/UI/Input/Input";

const Category = () => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategory());
  }, []);

  const handleClose = () => {

    const form = new FormData()

    form.append('nombre', categoryName)
    form.append('idpadre', parentCategoryId)
    form.append('categoryImage', categoryImage)
    dispatch(addCategory(form))
    // const cat = {
    //     categoryName,
    //     parentCategoryId,
    //     categoryImage
    // }


    setShow(false)
  }
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.nombre}>
          {category.nombre}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.nombre });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
      setCategoryImage(e.target.files[0])
  }

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Categoria</h3>
              <button onClick={handleShow}>Añadir</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir una nueva categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
      
          <Input
            value={categoryName}
            placeholder={`Nombre de la categoria`}
            onChange={(e) => setCategoryName(e.target.value)}
          />

          <select value={parentCategoryId} className="form-control" onChange={(e) => setParentCategoryId(e.target.value)}><option>Selecciona una categoria</option>
              {
                  createCategoryList(category.categories).map(option => 
                    <option key={option.value} value={option.value}>{option.name}</option> )
              }
          </select>

          <input type="file" name="categoryImage" onChange={handleCategoryImage} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Category;
