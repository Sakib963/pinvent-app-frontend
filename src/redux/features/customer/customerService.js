import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/customers/`


//Create New Customer
const createCustomer = async (formData) => {
    const response = await axios.post(API_URL, formData)

    return response.data
};

//Get All Customer
const getCustomers = async () => {
    const response = await axios.get(API_URL)

    return response.data
};

//Delete A Customer
const deleteCustomer = async (id) => {
    const response = await axios.delete(API_URL + id)

    return response.data
};

//Get A Customer
const getCustomer = async (id) => {
    const response = await axios.get(API_URL + id)

    return response.data
};

//Update Customer
const updateCustomer = async (id, formData) => {
    const response = await axios.patch(`${API_URL}${id}`, formData)

    return response.data
};


const customerService = {
    createCustomer,
    getCustomer,
    deleteCustomer,
    getCustomers,
    updateCustomer
}

export default customerService;



