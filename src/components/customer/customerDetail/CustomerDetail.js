import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useRedirectLoggedOutUser from "../../../customHook/useRedirectLoggedOutUser";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import Card from "../../card/Card";
import { SpinnerImg } from "../../loader/Loader";
import "./CustomerDetail.scss";
import DOMPurify from "dompurify";
import { getCustomer } from "../../../redux/features/customer/customerSlice";

const CustomerDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();

  const { id } = useParams();

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { customer, isLoading, isError, message } = useSelector(
    (state) => state.customer
  );
  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getCustomer(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Customer Detail</h3>
      <Card cardClass="card">
        {isLoading && <SpinnerImg />}
        {customer && (
          <div className="detail">
            <h4>
              <span className="badge">Name: </span> &nbsp; {customer.name}
            </h4>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(customer.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {customer.createdAt.toLocaleString("en-US")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {customer.updatedAt.toLocaleString("en-US")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomerDetail;