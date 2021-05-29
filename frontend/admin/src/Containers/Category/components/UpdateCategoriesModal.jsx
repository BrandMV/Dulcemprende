import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import { Row, Col } from "react-bootstrap";
import React from "react";

const UpdateCategoriesModal = (props) => {
  const {
    show,
    size,
    handleClose,
    modalTitle,
    expandedArray,
    checkedArray,
    handleCategoryInput,
    categoryList,
    onSubmit
  } = props;

  console.log({expandedArray, checkedArray});

  return (
    <Modal
      show={show}
      handleClose={handleClose}
      modalTitle={modalTitle}
      size={size}
      onSubmit={onSubmit}
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
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "expanded")
                }
              />
            </Col>
            <Col>
              <select
                value={item.parentId}
                className="form-control"
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "expanded"
                  )
                }
              >
                <option>Selecciona una categoria</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select className="form-control" value={item.type} onChange={(e) =>
                  handleCategoryInput(
                    "type",
                    e.target.value,
                    index,
                    "expanded"
                  )}>
                <option value="">Selecciona el tipo</option>
                <option value="store">filtrado de precios</option>
                <option value="product">Todos los productos</option>
                <option value="page">Pagina</option>
              </select>
            </Col>
          </Row>
        ))}
      <h6>Seleccionados</h6>
      {checkedArray.length > 0 &&
        checkedArray.map((item, index) => (
          <Row key={index}>
            <Col>
              <Input
                value={item.name}
                placeholder={`Nombre de la categoria`}
                onChange={(e) =>
                  handleCategoryInput("name", e.target.value, index, "checked")
                }
              />
            </Col>
            <Col>
              <select
                value={item.parentId}
                className="form-control"
                onChange={(e) =>
                  handleCategoryInput(
                    "parentId",
                    e.target.value,
                    index,
                    "checked"
                  )
                }
              >
                <option>Selecciona una categoria</option>
                {categoryList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
              <select className="form-control" value={item.type} onChange={(e) =>
                  handleCategoryInput(
                    "type",
                    e.target.value,
                    index,
                    "checked"
                  )}>
                <option value="">Selecciona el tipo</option>
                <option value="store">filtrado de precios</option>
                <option value="product">Todos los productos</option>
                <option value="page">Pagina</option>
              </select>
            </Col>
          </Row>
        ))}
    </Modal>
  );
};

export default UpdateCategoriesModal;
