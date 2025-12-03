import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Addtask.css";
import { useAddTaskMutation, useUpdateTaskMutation } from '../../Redux/Slices/crudSlice'

const Addtask = ({ onClose, editdata }) => {
  const [addTask, { isLoading, isError, error, isSuccess }] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // handle data
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // handle Submit
  // const handleSubmit = async(e) => {
  //   e.preventDefault();
  //  try {
  //     const response = await addTask(formData).unwrap();
  //     console.log("Task Added:", response);
  //  } catch (error) {
  //    console.log(error);
  //  }
  //   onClose();
  //   navigate("/");
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editdata) {
        // ========== UPDATE MODE ==========
        await updateTask({
          taskId: editdata._id,
          data: formData,
        }).unwrap();

        alert("Task Updated!");
      } else {
        // ========== ADD MODE ==========
        const response = await addTask(formData).unwrap();
        console.log("Task Added:", response);
      }
    } catch (error) {
      console.log(error);
    }
    onClose();
    navigate("/");
  };

  useEffect(() => {
    if (editdata) {
      setFormData({
        title: editdata.title,
        description: editdata.description,
      });
    }
  }, [editdata]);


  return (
    <div className="addtask-container">
      <form className="addtask-form" onSubmit={handleSubmit}>

        <h2>Add New Task</h2>

        {isError && (
          <p style={{ color: "red" }}>
            {error?.data?.message || "Failed to add task"}
          </p>
        )}

        {isSuccess && <p style={{ color: "green" }}>Task Added Successfully!</p>}

        <div className="input-group">
          <label htmlFor="taskTitle">Title</label>
          <input
            type="text"
            id="taskTitle"
            placeholder="Enter your title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="taskDescription">Description</label>
          <input
            type="text"
            id="taskDescription"
            placeholder="Enter your description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="btn-group">
          <button className="submit-btn" disabled={isLoading}>{isLoading ? "Saving..." : "Submit"}</button>
          <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Addtask;
