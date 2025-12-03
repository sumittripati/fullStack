const curd = require('../../Models/curdSchema')


// get data
const getItem = async (req, res) => {
      try {
       let data =await curd.find()

       if(data.length === 0){
       return res.status(404).json({message: "data not found"})
       }

        return res.status(200).json({ 
            message: "data found",
            data: data
        })
   
      } catch (error) {
        console.error("error in getting data", error)
        return res.status(500).json({message: "internal server error"})
      }
}

// create data

const createItem = async(req, res)=>{
    const {title, description} = req.body;
    try {
        if(!title || !description){
          return res.status(400).json({message: "all fields are required"})
        }

        let data = await curd.create({title, description})
        return res.status(201).json({
            message: "data created",
            data: data
        })
    } catch (error) {
        console.error("error in creating data", error)
        return res.status(500).json({message: "internal server error"})
    }
}

// update data

const updateItem = async(req, res)=>{
    try {
        const {id} = req.params;
        const isMatch = await curd.findById(id);
        // console.log("mach data",isMatch)
        if(!isMatch){
            return res.status(404).json({message: "data not found"})
        }
        let data = await curd.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).json({
            message: "data updated",
            data: data
        })
    } catch (error) {
        console.error("error in updating data", error)
        return res.status(500).json({message: "internal server error"})
    }
}

// delete data
const deleteItem = async(req, res)=>{
    const {id} = req.params;
    try {
        if(!id){
            return res.status(400).json({message: "id is required"})
        }
        let data = await curd.findByIdAndDelete(id)

        if (!data) {
            return res.status(404).json({ message: "Data not found" });
        }

        return res.status(200).json({
            message: "data deleted",
            data: data
        })
    } catch (error) {
        console.error("error in deleting data", error)
        return res.status(500).json({message: "internal server error"})
    }
}

module.exports = {getItem, createItem, updateItem, deleteItem};