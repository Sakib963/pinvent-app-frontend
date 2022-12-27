import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomerForm from "../../components/customer/customerForm/CustomerForm";
import Loader from "../../components/loader/Loader";
import { createCustomer } from "../../redux/features/customer/customerSlice";
import {  selectIsLoading,} from "../../redux/features/product/productSlice";


const initialState = {
    name: "",

}

const AddCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [customer, setCustomer] = useState(initialState);
  
    const isLoading = useSelector(selectIsLoading);
  
    const { name } = customer;
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCustomer({ ...customer, [name]: value });
    };


  
    const saveCustomer = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
  
      console.log(...formData);
  
      await dispatch(createCustomer(formData));
  
      navigate("/dashboard");
    };

    return (
        <div>
        {isLoading && <Loader />}
        <h3 className="--mt">Add New Customer</h3>
        <CustomerForm
            customer={customer}
            description={description}
            setDescription={setDescription}
            handleInputChange={handleInputChange}
            saveCustomer={saveCustomer}
        />
        </div>
    )
}

export default AddCustomer