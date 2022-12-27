import React from "react";
import "./CustomerSummary.scss";
import { BsCart4 } from "react-icons/bs";
import InfoBox from "../../infoBox/InfoBox";

// Icon
const productIcon = <BsCart4 size={40} color="#fff" />;


const CustomerSummary = ({ customers }) => {


    return (
        <div className="product-summary">
      <h3 className="--mt">Customer Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Customers"}
          count={customers.length}
          bgColor="card1"
        />
      </div>
    </div>
    )
}

export default CustomerSummary;  