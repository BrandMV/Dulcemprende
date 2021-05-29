import React, {  useState, useEffect } from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import './styles.css'
import {
  getAllCategory,
  addCategory,
  updateCategories,
  deleteCategories as deleteCategoriesAction,
} from "../../actions";
import Modal from "../../components/UI/Modal/Modal";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";
import {
  IoIosCheckbox,
  IoIosCheckboxOutline,
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosAdd,
  IoIosTrash,
  IoIosColorWand,
} from "react-icons/io";
import UpdateCategoriesModal from "./components/UpdateCategoriesModal";
import AddCategoryModal from "./components/AddCategoryModal";

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
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);


  useEffect(() => {

    if(!category.loading){
      setShow(false)
    }
    
  }, [category.loading])


  const handleClose = () => {
    const form = new FormData();

    if( categoryName === ""){
      alert('Ingresa un nombre de categoria')
      setShow(false)
      return
    }

    form.append("name", categoryName);
    form.append("parentId", parentCategoryId);
    form.append("categoryImage", categoryImage);
    dispatch(addCategory(form));
    setCategoryName("");
    setParentCategoryId("");

    setShow(false);
  };
  const handleShow = () => setShow(true);

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
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
        name: category.name,
        parentId: category.parentId,
        type: category.type
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
    updateCheckedAndExpandedCategories();
    setUpdateCategoryModal(true);
  };

  const updateCheckedAndExpandedCategories = () => {
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

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
  };

  const handleCategoryInput = (key, value, index, type) => {
    if (type == "checked") {
      const updatedCheckedArray = checkedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setCheckedArray(updatedCheckedArray);
    } else if (type == "expanded") {
      const updatedExpandedArray = expandedArray.map((item, _index) =>
        index == _index ? { ...item, [key]: value } : item
      );
      setExpandedArray(updatedExpandedArray);
    }
  };

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });

    dispatch(updateCategories(form))
    setUpdateCategoryModal(false);

  };


  const deleteCategory = () => {
    updateCheckedAndExpandedCategories();
    setDeleteCategoryModal(true);
  };

  const deleteCategories = () => {
    const checkedIdsArray = checkedArray.map((item, index) => ({
      _id: item.value,
    }));

    const expandedIdsArray = expandedArray.map((item, index) => ({
      _id: item.value,
    }));
    const idsArray = expandedIdsArray.concat(checkedIdsArray);

    if (checkedIdsArray.length > 0) {
      dispatch(deleteCategoriesAction(checkedIdsArray)).then((result) => {
        if (result) {
          dispatch(getAllCategory());
          setDeleteCategoryModal(false);
        }
      });
    }
    setDeleteCategoryModal(false)
  };

  const renderDeleteCategoryModal = () => {
    return (
      <Modal
        modalTitle="Eliminar categoria"
        show={deleteCategoryModal}
        handleClose={() => setDeleteCategoryModal(false)}
        buttons={[
          {
            label: "No",
            color: "primary",
            onClick: () => {
              setDeleteCategoryModal(false);
            },
          },
          {
            label: "Si",
            color: "danger",
            onClick: deleteCategories,
          },
        ]}
      >
        <h5>Extendido</h5>
        {expandedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
        <h5>Seleccionado</h5>
        {checkedArray.map((item, index) => (
          <span key={index}>{item.name}</span>
        ))}
      </Modal>
    );
  };

  const categoryList = createCategoryList(category.categories)

  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Categoria</h3>
    
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
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
          <div className="actionBtnContainer">
                <button onClick={handleShow}><IoIosAdd /><span>Añadir</span></button>
                <button onClick={deleteCategory}><IoIosTrash /><span>Borrar</span></button>
                <button onClick={updateCategory}><IoIosColorWand /><span>Editar</span></button>
              </div>
          </Col>
        </Row>
      </Container>
      <AddCategoryModal 
            show={show}
            handleClose={() => setShow(false)}
            onSubmit={handleClose}
            modalTitle={"Añadir categoria"}
            categoryName={categoryName}
            setCategoryName={setCategoryName}
            parentCategoryId={parentCategoryId}
            setParentCategoryId={setParentCategoryId}
            categoryList={categoryList}
            handleCategoryImage={handleCategoryImage}
      />
      <UpdateCategoriesModal  
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(false)}
          onSubmit={updateCategoriesForm}
          modalTitle={"Actualizar categoria"}
          size="lg"
          expandedArray={expandedArray}
          checkedArray={checkedArray}
          handleCategoryInput={handleCategoryInput}
          categoryList={categoryList}
      />
      
      {renderDeleteCategoryModal()}
    </Layout>
  );
};

export default Category;
