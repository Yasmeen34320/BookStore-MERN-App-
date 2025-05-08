const router = require('express').Router(); 
const User = require('../Models/user.js');
const {authenticateToken} = require('../routes/userAuth.js');
const Book = require('../Models/book.js');  

/// add book --admin

router.post('/add-book',authenticateToken, async (req, res) => {    
    try{
        const {id}=req.headers;
        const user = await User.findById(id);
        if(user.role !== 'admin'){
            return res.status(403).json({message:"You are not authorized to add book"});    
        }   
       const book = req.body;
       const newBook = new Book(book);  
       await newBook.save() 
       return res.status(201).json({message:"Book added successfully"});    
    }catch(err){
        res.status(500).json({message:`Internal server error + ${err}`});    
    }   


});

// Bulk insert route
router.post('/bulk', async (req, res) => {
    try {
      const books = req.body; // Array of books
      await Book.insertMany(books);
      res.status(201).json({ message: 'Books inserted successfully', count: books.length });
    } catch (err) {
      console.error('Bulk insert error:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

/// update book 
router.post('/update-book',authenticateToken, async (req, res) => {    
    try{
        const {bookid}=req.headers;
         await Book.findByIdAndUpdate(bookid , req.body);
        return res.status(201).json({message:"Book updated successfully"});
        
         }catch(err){
            console.log(err.message);
        res.status(500).json({message:"Internal server error"});    
    }   


});

/// delete book --admin

router.delete('/delete-book',authenticateToken, async (req, res) => {   
    try{
        const {id}=req.headers;
        const user = await User.findById(id);
        if(user.role !== 'admin'){
            return res.status(403).json({message:"You are not authorized to delete book"});    
        }   
        const {bookid}=req.headers;
         await Book.findByIdAndDelete(bookid);
        return res.status(201).json({message:"Book deleted successfully"});
    }catch{
        res.status(500).json({message:"Internal server error"});    
    }



});

/// get-all-books 
router.get('/get-all-books',async (req, res) => {    
    try{
        const books = await Book.find({}).sort({createdAt:-1});
        return res.status(200).json({message:"Books found successfully",books});    
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }   


});

/// get-recently-added-books limit 4 
router.get('/get-recently-added-books',async (req, res) => {    
    try{
        const books = await Book.find({}).sort({createdAt:-1}).limit(4);
        return res.status(200).json({message:"Books found successfully",books});    
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }   


});

/// get-book-by-id
router.get('/get-book-by-id/:id',async (req, res) => {
    try{
        const id = req.params.id;
        const book = await Book.findById(id)
        return res.status(200).json({message:"Book found successfully",book}); 
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }   


});

// delete all books
router.delete('/delete-all-books',authenticateToken, async (req, res) => { 
    try{
         await Book.deleteMany({});
        return res.status(201).json({message:"All books deleted successfully"});
    }catch(err){
        res.status(500).json({message:"Internal server error"});    
    }

});


module.exports = router; // Export the router to use in other files