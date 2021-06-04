import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Layout from "../../components/Layout/Layout";
import Price from "../../components/UI/Price";
import {generatePublicUrl} from '../../urlConfig'

import "./style.css";



const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        style={{
          width: "1160px",
          margin: "10px auto",
        }}
      >
        
          <div className="delAdrContainer">
            <div className="delAdrDetails">
              <div className="delTitle">Dirección de envio</div>
              <div className="delName">{orderDetails.address.name}</div>
              <div className="delAddress">{orderDetails.address.address}</div>
              <div className="delPhoneNumber">
                Número: {orderDetails.address.mobileNumber}
              </div>
            </div>
          
          </div>
        

        {orderDetails.items.map((item, index) => (
          
            <div>
            <div className="flexRow">
              <div className="delItemImgContainer">
                <img src={generatePublicUrl(item.productId.productPictures[0].img)} alt="" />
              </div>
              <div style={{ width: "250px" }}>
                <div className="delItemName">{item.productId.name}</div>
                <Price value={item.payablePrice} />
              </div>
            </div>
            <div style={{ padding: "25px 50px" }}>
              <div className="orderTrack">
                {orderDetails.orderStatus.map((status) => (
                  <div
                    className={`orderStatus ${
                      status.isCompleted ? "active" : ""
                    }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div className="status">{status.type}</div>
                      <div className="date">{formatDate(status.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
              <br />
              <br />
            </div>
            <div style={{ fontWeight: "500", fontSize: 14 }}>
              {orderDetails.orderStatus[3].isCompleted &&
                `Enviado en ${formatDate2(orderDetails.orderStatus[3].date)}`}
            </div>
            </div>
        ))}
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
    </Layout>
  );
};

export default OrderDetailsPage;
