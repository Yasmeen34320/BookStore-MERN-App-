const router = require('express').Router(); 
const User = require('../Models/user.js');
const {authenticateToken} = require('../routes/userAuth.js');
const Order = require('../Models/order.js')||[];
const Book = require('../Models/book.js');  


/// place order
router.post('/place-order',authenticateToken, async (req, res) => {
    try{
        const {id}=req.headers;
       //console.log(req.body.order);
        const {order}=req.body; // from the cart  
        for(const orderData of order)
        {
            const newOrder = new Order({user:id , book:orderData._id});
            const savedOrder = await newOrder.save();
            await User.findByIdAndUpdate(id,{
                $push:{orders:savedOrder._id}, // go to order and remove from the cart 
                $pull:{cart:orderData._id}
            })
        }
        return res.status(201).json({message:"Order placed successfully"});    
    }catch(err){
        console.error("Order placement error:", err); // ✅ Add this!

        res.status(500).json({message:"Internal server error"});    
    }   
});


/// get all orders of the user
router.get('/get-order-oftheuser',authenticateToken, async (req, res) => {  
    try{
        const {id}=req.headers;
        const user = await User.findById(id).populate({
            path:"orders",
            populate:{path:"book"}
        }); // populate the orders array with book details (as the orders only contain the id of the book )
        if(!user){
            return res.status(400).json({message:"User not found"});    
        }   
        return res.status(200).json({message:"User found",data:user.orders.reverse()});
    }catch(err){
        console.error("Error fetching user orders:", err); // ✅ Add this!

res.status(500).json({message:"Internal server error"});
    }

 });


 // get all orders of the admin
 router.get('/get-all-orders',authenticateToken, async (req, res) => {  
    try{
        const userData=await Order.find()
        .populate({
            path:"book"
        })
        .populate({
            path:"user"
        })
        .sort({createdAt:-1})
        //   const {userId , orderId}=req.headers;
        //         const user = await User.findById(userId);
        //         if(user.role !== 'admin'){
        //             return res.status(403).json({message:"You are not authorized to view Orders"});    
        //         } 
        //  await Order.findById(orderId).populate(Book).populate(user).sort({createdAt:-1});
         return res.status(200).json({message:"Orders found successfully",userData});  
            
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }


 });

 /// update order status --admin
 router.put('/update-status/:id',authenticateToken, async (req, res) => {  
    try{
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status})
        // const {userId , orderId}=req.headers;
        // const user = await User.findById(userId);
        // if(user.role !== 'admin'){
        //     return res.status(403).json({message:"You are not authorized to change Order status"});    
        // }
        // await Order.findByIdAndUpdate(orderId,{status:re1.body.status}); // order id from the params
        return res.status(200).json({message:"Order status updated successfully"});
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }   

  });







module.exports=router;



