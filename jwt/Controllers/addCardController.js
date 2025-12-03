let cardController = async(req, res, next)=>{
    try {
        console.log("card controller")
        res.status(200).json({message: "card controller"})
    } catch (error) {
        res.status(500).json({message: 'token not provided for reach this card controller'})
        next(error)
    }
}

module.exports = cardController;