import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import React from "react";
import {Col, Row} from 'react-bootstrap'

const AddCategoryModal = (props) => {
  const {
    show,
    handleClose,
    modalTittle,
    categoryName,
    setCategoryName,
    parentCategoryId,
    setParentCategoryId,
    categoryList,
    handleCategoryImage,
    onSubmit
  } = props;
  return (
    <Modal show={show} handleClose={handleClose} modalTittle={modalTittle} onSubmit={onSubmit}>
      <Row>
        <Col>
          <Input
            value={categoryName}
            placeholder={`Nombre de la categoria`}
            onChange={(e) => setCategoryName(e.target.value)}
            className="form-control-sm"
          />
        </Col>
        <Col>
          <select
            value={parentCategoryId}
            className="form-control"
            onChange={(e) => setParentCategoryId(e.target.value)}
            className="form-control form-control-sm"
          >
            <option>Selecciona una categoria</option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row>
        <Col>
          <input
            type="file"
            name="categoryImage"
            onChange={handleCategoryImage}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default AddCategoryModal;
