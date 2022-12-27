import React, { useEffect, useState } from "react";
import "./CustomerList.scss"
import { SpinnerImg } from "../../loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import Search from "../../search/Search";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate"; 
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteCustomer, getCustomers } from "../../../redux/features/customer/customerSlice";
import { FILTER_CUSTOMERS, selectFilteredCustomers } from "../../../redux/features/product/filterSlice";


const CustomerList = ({customers, isLoading}) => {

    const [search, setSearch] = useState("");
    const filteredCustomers = useSelector(selectFilteredCustomers);

    const dispatch = useDispatch();

    const shortenText = (text, n) => {
        if (text.length > n) {
          const shortenedText = text.substring(0, n).concat("...");
          return shortenedText;
        }
        return text;
      };

    const delCustomer = async (id) => {
        console.log(id);
        await dispatch(deleteCustomer(id));
        await dispatch(getCustomers());
    };

    const confirmDelete = (id) => {
        confirmAlert({
          title: "Delete Customer",
          message: "Are you sure you want to delete this Customer.",
          buttons: [
            {
              label: "Delete",
              onClick: () => delCustomer(id),
            },
            {
              label: "Cancel",
              // onClick: () => alert('Click No')
            },
          ],
        });
    };

    //   Begin Pagination
    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredCustomers.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredCustomers.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, filteredCustomers]);

    const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredCustomers.length;
    setItemOffset(newOffset);
    };
    //   End Pagination

    useEffect(() => {
        dispatch(FILTER_CUSTOMERS({customers, search}))
    }, [customers, search, dispatch]);

    return (
        <div className="product-list">
        <hr />
        <div className="table">
            <div className="--flex-between --flex-dir-column">
                <span>
                    <h3>Customer List</h3>
                </span>
                <span>
                <Search
                value={search} onChange={(e) => setSearch(e.target.value)}/>
                </span>
            </div>

            {isLoading && <SpinnerImg />}

            <div className="table">
            {!isLoading && customers.length === 0 ? (
            <p>-- No customer found, please add a customer...</p>
            ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((customer, index) => {
                  const { _id, name, description } = customer;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 16)}</td>
                      <td>{shortenText(description, 16)}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/customer-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/edit-customer/${_id}`}>
                            <FaEdit size={20} color={"green"} />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt size={20} color={"red"} onClick={() => confirmDelete(_id)}/>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
        </div>
        </div>
    )
}

export default CustomerList;