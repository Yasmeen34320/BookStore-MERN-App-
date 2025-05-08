const router = require('express').Router(); 
const User = require('../Models/user.js');
const {authenticateToken} = require('../routes/userAuth.js');


// add book to favourite (array in the user schema getting id of the book)
// update favourite array in user schema
router.put('/add-book-to-favourite', async (req, res) => { 
    try{
       const {bookid,id}=req.headers;
        const user = await User.findById(id);
        const isBookInFav = user.favorites.includes(bookid);
        if(isBookInFav){
            return res.status(200).json({message:"Book already in favourite list"});    
        }   
        await User.findByIdAndUpdate(id, { $push: { favorites: bookid } });
        res.status(200).json({message:"Book added to favourites list"});
        // user.favorites.push(bookid);
    }catch{
        
        res.status(500).json({message:"Internal server error"});    
    }

});
// delete book from favourite (array in the user schema getting id of the book)
// update favourite array in user schema
router.put('/remove-book-from-favourite',authenticateToken, async (req, res) => {    
try{
    const {bookid,id}=req.headers;
    const user = await User.findById(id);
    const isBookInFav = user.favorites.includes(bookid);    
    if(!isBookInFav)
        return res.status(200).json({message:"Book not in favourite list"});
    await User.findByIdAndUpdate(id, { $pull: { favorites: bookid } });
    res.status(200).json({message:"Book removed from favourites list"});
}catch(error){
    res.status(500).json({message:"Internal server error"});
}

});

// get all favourite books of the user
router.get('/get-favourite-books',authenticateToken, async (req, res) => {  
    try{
        const {id}=req.headers;
        const user = await User.findById(id).populate("favorites"); // populate the favorites array with book details (as the fav only contain the id of the book )
        if(!user){
            return res.status(400).json({message:"User not found"});    
        }   
        return res.status(200).json({message:"User found",data:user.favorites});
    }catch(error){
        res.status(500).json({message:"Internal server error"});
    }   

}); 


module.exports=router;


