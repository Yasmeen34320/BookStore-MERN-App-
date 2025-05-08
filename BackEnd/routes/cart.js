const router = require('express').Router(); 
const User = require('../Models/user.js');
const {authenticateToken} = require('../routes/userAuth.js');


// add book to cart 
router.put('/add-book-to-cart',authenticateToken, async (req, res) => { 
    try{
       const {bookid,id}=req.headers;
        const user = await User.findById(id);
        const isBookInCart = user.cart.includes(bookid);
        if(isBookInCart){
            return res.status(200).json({message:"Book already in cart "});    
        }   
        await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
        res.status(200).json({message:"Book added to cart "});
        // user.favorites.push(bookid);
    }catch{
        
        res.status(500).json({message:"Internal server error"});    
    }

});

// remove from cart 
router.put('/remove-book-from-cart/:bookid',authenticateToken, async (req, res) => {    
try{
    const {bookid}=req.params;
    const {id}=req.headers;
    const user = await User.findById(id);
    const isBookInCart = user.cart.includes(bookid);    
    if(!isBookInCart)
        return res.status(200).json({message:"Book not in cart list"});
    await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    res.status(200).json({message:"Book removed from cart list"});
}catch(error){
    res.status(500).json({message:"Internal server error"});
}

});

// get all favourite books of the user
router.get('/get-books-in-cart',authenticateToken, async (req, res) => {  
    try{
        const {id}=req.headers;
        const user = await User.findById(id).populate("cart"); // populate the cart array with book details (as the cart only contain the id of the book )
        if(!user){
            return res.status(400).json({message:"User not found"});    
        }   
        return res.status(200).json({message:"User found",data:user.cart.reverse()});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }   

}); 
module.exports=router;