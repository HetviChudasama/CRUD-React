import React, { useState, useEffect } from "react";
import { employeedata } from "./Data";

const App = () => {
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    setData(employeedata);
  }, []);

  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id);
    if (dt) {
      setId(id);
      setFirstname(dt.firstname);
      setLastname(dt.lastname);
      setAge(dt.age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure to delete this item?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
        handleClear(); // Clear the form if the currently edited item is deleted
      }
    }
  };

  const handleSave = () => {
    if (firstname && lastname && age) {
      // Edit case
      if (id > 0) {
        const updatedData = data.map((item) =>
          item.id === id ? { ...item, firstname, lastname, age } : item
        );
        setData(updatedData);
      } else {
        // Add case
        const newId = data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
        const newItem = { id: newId, firstname, lastname, age };
        setData([...data, newItem]);
      }
      handleClear();
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleClear = () => {
    setId(0);
    setFirstname("");
    setLastname("");
    setAge(0);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px",
          padding: "10px",
        }}
      >
        <div>
          <label htmlFor="firstname"> FirstName : </label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="Enter your firstname"
          />
          &nbsp;
          <label htmlFor="lastname"> LastName : </label>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Enter your lastname"
          />
          &nbsp;
          <label htmlFor="age"> Age : </label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            placeholder="Enter your age"
          />
        </div>
        <div className="buttons" style={{ paddingLeft: "12px" }}>
          <button onClick={handleSave}>{id > 0 ? "Update" : "Save"}</button>
          &nbsp;
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>

      <table
        border="1"
        cellPadding="10"
        style={{ borderCollapse: "collapse", margin: "20px auto" }}
      >
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.age}</td>
                <td>
                  <button onClick={() => handleEdit(item.id)}>Edit</button>
                  &nbsp;
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default App;
