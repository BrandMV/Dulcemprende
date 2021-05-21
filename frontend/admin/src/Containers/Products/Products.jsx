import React, {useState} from "react";
import Layout from "../../components/Diseño/Layout";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Input from "../../components/UI/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions/product.action";



const Products = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [show, setShow] = useState(false);
  const category = useSelector(state => state.category)
  const dispatch = useDispatch()

  const handleClose = () => {
    const form = new FormData()
    form.append('name', name)
    form.append('quantity', quantity)
    form.append('price', price)
    form.append('description', description)
    form.append('category', categoryId)
    for(let pic of productPictures){
    form.append('productPicture', pic)

    }

    dispatch(addProduct(form))
    setShow(false)
  }
  const handleShow = () => setShow(true);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.nombre });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };

  const handleProductPictures = (e) => {
      setProductPictures([
          ...productPictures,
          e.target.files[0]
      ])
  }
console.log(productPictures);

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
        </Container>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Añadir nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
             <select value={categoryId} className="form-control" onChange={(e) => setCategoryId(e.target.value)}><option>Selecciona una categoria</option>
              {
                  createCategoryList(category.categories).map(option => 
                    <option key={option.value} value={option.value}>{option.name}</option> )
              }
          </select>

          {
              productPictures.length > 0 ?
              productPictures.map((pic, index) => <div key={index}>{pic.name}</div> ) : null
          }
          <input type="file" name="productPicture" onChange={handleProductPictures} />
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

export default Products;