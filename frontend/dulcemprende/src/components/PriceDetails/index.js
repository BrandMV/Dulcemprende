import React from "react";
import "./style.css"

const PriceDetails = (props) => {
  return (
    // <Card headerLeft={"Price Details"} style={{ maxWidth: "380px" }}>
    //   <div
    //     style={{
    //       padding: "20px",
    //       boxSizing: "border-box",
    //     }}
    //   >
    //     <div className="flexRow sb" style={{ margin: "10px 0" }}>
    //       <div>Price ({props.totalItem} items)</div>
    //       <div>{props.totalPrice}</div>
    //     </div>
    //     <div className="flexRow sb" style={{ margin: "10px 0" }}>
    //       <div>Delivery Charges</div>
    //       <div>FREE</div>
    //     </div>
    //     <div className="flexRow sb" style={{ margin: "10px 0" }}>
    //       <div>Total Amount</div>
    //       <div>{props.totalPrice}</div>
    //     </div>
    //   </div>
    // </Card>
    <div className="total-price">
            <table>
              <tr>
                <td>Subtotal</td>
                <td>{props.totalPrice}</td>
              </tr>
              <tr>
                <td>Envio</td>
                <td>{props.totalPrice > 800 ? "Envio gratis" : "Envio: 99MXN"}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{props.totalPrice > 800 ? props.totalPrice : props.totalPrice+99}</td>
              </tr>
            </table>

          </div>
  );
};

export default PriceDetails;
