import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";
import "./CustomerForm.scss"

const CustomerForm = ({
    customer,
    description,
    setDescription,
    handleInputChange,
    saveCustomer,
  }) => {
    return (
      <div className="add-product">
        <Card cardClass={"card"}>
          <form onSubmit={saveCustomer}>
            <label>Customer Name:</label>
            <input 
              type="text"
              placeholder="Customer name"
              name="name"
              value={customer?.name}
              onChange={handleInputChange}
            />
  
            <label>Customer Description:</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={CustomerForm.modules}
              formats={CustomerForm.formats}
            />
  
            <div className="--my">
              <button type="submit" className="--btn --btn-primary">
                Save Customer
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  };

  CustomerForm.modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["clean"],
    ],
  };
  CustomerForm.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "video",
    "image",
    "code-block",
    "align",
  ];
  

export default CustomerForm