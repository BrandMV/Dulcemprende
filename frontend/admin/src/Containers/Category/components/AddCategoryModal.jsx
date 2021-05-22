import Input from "../../../components/UI/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import React from "react";


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
        handleCategoryImage
    } = props
    return (
      <Modal
        show={show}
        handleClose={handleClose}
        modalTittle={modalTittle}
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
          {categoryList.map((option) => (
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
)}

export default AddCategoryModal