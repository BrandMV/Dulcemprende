import React, { useEffect, useState } from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory } from "../../actions";
import Input from "../../components/UI/Input/Input";
import Modal from "../../components/UI/Modal/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowDown,
  IoIosArrowForward,
} from "react-icons/io";

const Category = () => {
  const category = useSelector((state) => state.category);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategoryId, setParentCategoryId] = useState("");
  const [categoryImage, setCategoryImage] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  const handleClose = () => {
    const form = new FormData();

    form.append("nombre", categoryName);
    form.append("idpadre", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");
    // const cat = {
    //     categoryName,
    //     parentCategoryId,
    //     categoryImage
    // }

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.nombre,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.nombre,
        idpadre: category.idpadre,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
  };

  const updateCategory = () => {
    setUpdateCategoryModal(true);
    const categories = createCategoryList(category.categories);
    const checkedArray = [];
    const expandedArray = [];

    checked.length > 0 &&
      checked.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && checkedArray.push(category);
      });
    expanded.length > 0 &&
      expanded.forEach((categoryId, index) => {
        const category = categories.find(
          (category, _index) => categoryId == category.value
        );
        category && expandedArray.push(category);
      });

    setCheckedArray(checkedArray)
    setExpandedArray(expandedArray)
    console.log({ checked, expanded, categories, checkedArray, expandedArray });
  };

  const handleCategoryInput = (key, value, index, type) => {
    if(type == 'checked'){
      const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? {...item, [key]: value} : item)
      setCheckedArray(updatedCheckedArray)
    }else if(type == "expanded"){
      const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? {...item, [key]: value} : item)
      setExpandedArray(updatedExpandedArray)
    }  
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
            {/* <ul>{renderCategories(category.categories)}</ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={(checked) => setChecked(checked)}
              onExpand={(expanded) => setExpanded(expanded)}
              icons={{
                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button>Borrar</button>
            <button onClick={updateCategory}>Editar</button>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        handleClose={handleClose}
        modalTittle={"Añadir nueva categoria"}
      >
        <Input
          value={categoryName}
          placeholder={`Nombre de la categoria`}
          onChange={(e) => setCategoryName(e.target.value)}
        />

        <select
          value={parentCategoryId}
          className="form-control"
          onChange={(e) => setParentCategoryId(e.target.value)}
        >
          <option>Selecciona una categoria</option>
          {createCategoryList(category.categories).map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        />
      </Modal>

      {/* Para editar las categorías */}
      <Modal
        show={updateCategoryModal}
        handleClose={() => setUpdateCategoryModal(false)}
        modalTittle={"Actualizar categoria"}
        size="lg"
      >
        <Row>
          <Col>
            <h6>Expandido</h6>
          </Col>
        </Row>
        {expandedArray.length > 0 &&
          expandedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Nombre de la categoria`}
                  onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                />
              </Col>
              <Col>
                <select
                  value={item.idpadre}
                  className="form-control"
                  onChange={(e) => handleCategoryInput('idpadre', e.target.value, index, 'expanded')}
                >
                  <option>Selecciona una categoria</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Selecciona el tipo</option>
                  <option value="store">filtrado de precios</option>
                  <option value="product">Todos los productos</option>
                  <option value="page">Pagina</option>
                </select>
              </Col>
            </Row>
          
          ))}
          <h6>
            Seleccionados
          </h6>
           {checkedArray.length > 0 &&
          checkedArray.map((item, index) => (
            <Row key={index}>
              <Col>
                <Input
                  value={item.name}
                  placeholder={`Nombre de la categoria`}
                  onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                />
              </Col>
              <Col>
                <select
                  value={item.idpadre}
                  className="form-control"
                  onChange={(e) => handleCategoryInput('idpadre', e.target.value, index, 'checked')}
                >
                  <option>Selecciona una categoria</option>
                  {createCategoryList(category.categories).map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </Col>
              <Col>
                <select className="form-control">
                  <option value="">Selecciona el tipo</option>
                  <option value="store">filtrado de precios</option>
                  <option value="product">Todos los productos</option>
                  <option value="page">Pagina</option>
                </select>
              </Col>
            </Row>
          
          ))}

        {/* <input
          type="file"
          name="categoryImage"
          onChange={handleCategoryImage}
        /> */}
      </Modal>
    </Layout>
  );
};

export default Category;
