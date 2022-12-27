import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../components/card/Card";
import CustomerSummary from "../../components/customer/customerSummary/CustomerSummary";
import useRedirectLoggedOutUser from "../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../redux/features/auth/authSlice";
import { getCustomers } from "../../redux/features/customer/customerSlice";
import "./CustomerDashboard.scss"

const CustomerDashboard = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { customers, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCustomers()); 
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div>
    <CustomerSummary customers={customers} />
    <div className="no-customer">
      <Card cardClass={"card"}>
        <p>No Customer Added, Please Add a customer.</p>
      </Card>

    </div>
    </div>
  );
};

export default CustomerDashboard;