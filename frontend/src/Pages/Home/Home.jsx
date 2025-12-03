import React, { useState } from "react";
import Addtask from "../../Components/Popup/Addtask";
import Items from "../../Components/ListItems/Items";
import "./Home.css";

const Home = () => {
  const [search, setSearch] = useState({
    find: "",
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleFind = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(search);
  };

  return (
    <div className="home-container">
      <div className="search-panel">
        {/* FILTER DROPDOWN */}
        <div className="select-box">
          <select name="status">
            <option value="">Pending</option>
            <option value="">Completed</option>
            <option value="">Cancelled</option>
          </select>
        </div>

        {/* SEARCH BAR */}
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search task"
            name="find"
            value={search.find}
            onChange={handleFind}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {/* Add Button */}
      <button className="add-btn" onClick={() => setIsPopupOpen(true)}>+ Add Item</button>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <Addtask onClose={() => setIsPopupOpen(false)} />
          </div>
        </div>
      )}
      <Items/>
    </div>
  );
};

export default Home;
