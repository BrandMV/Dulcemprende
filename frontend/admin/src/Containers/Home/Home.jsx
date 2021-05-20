
import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Layout from '../../components/Diseño/Layout'
import './style.css'

const Home = () => {
    return (
        <div>
            <Layout>
              <Container fluid>
              <Row>
                    <Col md={2} className="sidebar" >lateral</Col>
                    <Col md={10}  style={{marginLeft: 'auto'}}>container</Col>
                </Row>
              </Container>
                {/* <Jumbotron style={{margin: '7rem'}} className="text-center" >
                    <h1>Bienvenido Administrador!</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis facere nulla rerum modi animi fugiat reprehenderit perferendis, et magnam unde praesentium autem nemo quis soluta, dolorem odio optio, sed iste.
                        In, doloribus asperiores minima rerum beatae repellat tempore corrupti quos obcaecati rem accusamus totam officia sequi eum fugit! Animi quia perferendis omnis, est ab eaque illo earum sint natus? Eligendi.
                        Similique labore facere praesentium, a accusamus, ab veritatis in eum nostrum earum perspiciatis molestias voluptatibus cupiditate, unde perferendis blanditiis totam tempore vitae! Distinctio, dicta perferendis! Nostrum fugit ea porro maxime.
                        Tempora itaque quis non magni, delectus animi assumenda voluptatibus rem ducimus hic nobis fugit laborum quae accusamus et pariatur quo dignissimos, dolores sunt deleniti! Deserunt necessitatibus distinctio quae ipsum voluptates?
                        Aspernatur adipisci, fugiat voluptates obcaecati consequuntur dolores praesentium dolore. Minima hic aliquid ut repellat quisquam et iste ipsum aliquam earum debitis. Iure nobis necessitatibus ut eaque quae repellendus dolore autem?
                    </p>
                </Jumbotron> */}
            </Layout>
        </div>
    )
}

export default Home
