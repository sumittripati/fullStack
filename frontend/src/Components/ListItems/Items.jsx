// import React from "react";
// import "./Items.css";
// import {useGetTaskQuery, useDeteleTaskMutation} from '../../Redux/Slices/crudSlice'
// import { useState } from "react";
// import Addtask from "../Popup/Addtask";


// const Items = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [editItem, setEditItem] = useState(null);
//   const [deletingId, setDeletingId] = useState(null);

//   const {data, isLoading, error, isError} = useGetTaskQuery()

//   const [mydeleteTask, {
//   isLoading: isDeleteLoading,
//   // isError: isDeleteError,
//   // error: deleteError
// }] = useDeteleTaskMutation();

//   if(isLoading){
//     return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
//   }

//   if(isError){
//     return (
//     <h2 style={{ textAlign: "center" }}>
//       Error: {error?.data?.message || "Something went wrong"}
//     </h2>); 
//   }

//   const handleDelete = async(id)=>{
//      try {
//       setDeletingId(id);
//       const response = await mydeleteTask(id);
//       console.log("Task Deleted:", response);
//       //  alert('Task deleted successfully!');
//      } catch (error) {
//       console.log('Error deleting task:', error);
//       alert('Failed to delete task. Please try again.');
//      }finally {
//     setDeletingId(null);
//   }
//   }

//   const handleEdit = async(item) => {
//       try {
//         setEditItem(item);
//         setShowModal(true);
//       } catch (error) {
//         console.log(error)
//       }
//   }

//   return (
//     <div className="items-container">
//       <table className="items-table">
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Edit</th>
//             <th>Delete</th>
//           </tr>
//         </thead>

//         <tbody>
//           {
//             data.map((item) => (
//               <tr key= {item._id}>
//                 <td>{item.title}</td>
//                 <td>{item.description}</td>
//                 <td>
//                   <button className="edit-btn" onClick={() => handleEdit(item)}
//                   // disabled={isDeleteLoading}
//                   >Edit</button>
//                 </td>
//                 <td>
//                   <button className="delete-btn" onClick={() => handleDelete(item._id)}  disabled={isDeleteLoading}>{isDeleteLoading ? "Deleting..." : "Delete"}</button>
//                 </td>
//               </tr>
//             ))
//           }
//         </tbody>
//       </table>
//       {showModal && (
//        <div className="popup-overlay">
//           <div className="popup-modal">
//             <Addtask onClose={() => setShowModal(false)} editdata={editItem} />
//           </div>
//        </div>
//       )}
//     </div>
//   );
// };

// export default Items;




import React, { useState } from "react";
import "./Items.css";
import {
  useGetTaskQuery,
  useDeteleTaskMutation,
} from "../../Redux/Slices/crudSlice";
import Addtask from "../Popup/Addtask";

const Items = () => {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null); // <-- Per row loading state

  const { data, isLoading, error, isError } = useGetTaskQuery();

  const [mydeleteTask] = useDeteleTaskMutation();

  if (isLoading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (isError) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Error: {error?.data?.message || "Something went wrong"}
      </h2>
    );
  }

  const handleDelete = async (id) => {
    try {
      setDeletingId(id); // <-- Only this row shows loading

      const response = await mydeleteTask(id);
      console.log("Task Deleted:", response);
    } catch (error) {
      console.log("Error deleting task:", error);
      alert("Failed to delete task. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  return (
    <div className="items-container">
      <table className="items-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>

              <td>
                <button className="edit-btn" onClick={() => handleEdit(item)}>
                  Edit
                </button>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(item._id)}
                  disabled={deletingId === item._id} // <-- disable only this row
                >
                  {deletingId === item._id ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <Addtask onClose={() => setShowModal(false)} editdata={editItem} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;


