import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { IoIosArrowForward } from "react-icons/io";
import { generatePublicUrl } from '../../urlConfig';

import "./style.css";
import { Breed } from "../../components/MaterialUI";
let tot = 0
const OrderPage = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
const [total, setTotal] = useState()
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);
  const handleTotal = () => {
    {user.orders.map((order) => {
      order.items.map((item,key) => {
        tot = tot + item.payablePrice*item.purchasedQty;
      })
    })}
    setTotal(tot)
    tot = 0
    console.log(total);
  
}
console.log(user);


  return (
    <Layout>

      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Tienda", href: "/" },
            { name: "Ordenes", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item, key) => (
            <Card key={key} style={{ display: "block", margin: "5px 0" }}>
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={generatePublicUrl(item.productId.productPictures[0].img)}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                 
                    {item.payablePrice * item.purchasedQty} MXN
                  </div>
                
                </div>
              </Link>

            </Card>
            
          ));
        })}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </Layout>
  );
};

export default OrderPage;
