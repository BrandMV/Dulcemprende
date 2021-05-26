import React, { useState, useEffect } from "react";
import Layout from "../../components/Diseño/Layout";
import Modal from "../../components/UI/Modal/Modal";
import Input from "../../components/UI/Input/Input";
import { Row, Col, Container } from "react-bootstrap";
import linearCategories from "../../helpers/linearCategories";
import { useSelector, useDispatch } from "react-redux";
import { createPage } from '../../actions/page.action'

const NewPage = () => {
  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState("");
  const category = useSelector((state) => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [desc, setDesc] = useState('')
  const [banners, setBanners] = useState([])
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const page = useSelector(state => state.page)
  const [type, setType] = useState('')
  useEffect(() => {
    setCategories(linearCategories(category.categories));
  }, [category]);
  useEffect(() => {
    console.log(page);
    if(!page.loading){
        setCreateModal(false)
        setTitle('')
        setDesc('')
        setCategoryId('')
        setProducts([])
        setBanners([])
    }
  }, [page])

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]])
  } 
  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]])

  }
  const onCategoryChange = (e) => {
      const category = categories.find(category => category.value == e.target.value)
      setCategoryId(e.target.value)
      setType(category.type)
  }

  const submitPageForm = (e) => {
    if(title === ""){
        alert("Inserta un titulo")
        setCreateModal(false)
        return
    }
    const form = new FormData()
    form.append('title', title)
    form.append('description', desc)
    form.append('category', categoryId)
    form.append('type', type)
    banners.forEach((banner, index) => {
        form.append('banners', banner)
    })
    products.forEach((product, index) => {
        form.append('products', product)
    })

    dispatch(createPage(form))

  }
  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Crear nueva página"}
        handleClose={() => setCreateModal(false)}
        onSubmit={submitPageForm}
      >
        <Container>
          <Row>
            <Col>
              {/* <select
                className="form-control form-control-sm"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">Selecciona una categoria</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select> */}
              <Input 
                type="select"
                value={categoryId}
                onChange={onCategoryChange}
                options={categories}
                placeholder={'Slecciona una categoria'}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Titulo de la página"}
                className="form-control-sm"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={"Descripción de la página"}
                className="form-control-sm"
              />
            </Col>
          </Row>
          {
                  banners.length > 0 ?
                  banners.map((banner, index) => 
                    <Row key={index}>
                        <Col>{banner.name}</Col>
                    </Row>
                  ) : null
              }
          <Row>
  
              <Col>
                    <input type="file" name="banners" 
                        onChange={handleBannerImages}
                        className="form-control form-control-sm"
                    />
              </Col>
          </Row>
          {
                  products.length > 0 ?
                  products.map((product, index) => 
                    <Row key={index}>
                        <Col>{product.name}</Col>
                    </Row>
                  ) : null
              }

          <Row>
              <Col>
                    <Input type="file" name="products" 
                        onChange={handleProductImages}
                        className="form-control form-control-sm"
                    />
              </Col>
          </Row>

        </Container>
      </Modal>
    );
  };

  return (
    <Layout sidebar>
        {
            page.loading ? 
            <p>Creando Página</p>
            :
            <>
                {renderCreatePageModal()}
                <button onClick={() => setCreateModal(true)}>Crear página</button>
            </>
           
        }
   
    </Layout>
  );
};

export default NewPage;
