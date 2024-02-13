import express from 'express'
import Book from '../models/bookModels.js';

const router = express.Router();

//Route for to a save books
router.post('/', async (req, res) => {
    try {
        // Check if all required fields are provided in the request body
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: title, author, publishYear'
            });
        }

        // Create a new book instance based on the Book model
        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        });

        // Create a new book in the database using the Book model
        const book = await Book.create(newBook);

        // Respond with the newly created book data
        return res.status(201).send(book);

    } catch (error) {
        // Log any errors that occur during the process
        console.log(error.message);

        // Respond with an internal server error status and message
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
});

//Route for to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        return res.status(200).json({
            count: books.length,
            data: books
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
})

//Route for to get a specific book
router.get('/:id', async (req, res) => {

    try {
        const { id } = req.params
        const books = await Book.findById(id)
        return res.status(200).json(books)
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
})

//Route for to update a specific book
router.put('/:id', async (req, res) => {

    try {

        if ( 
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all the required fields: title, author, publishYear'
            });
        }

        const { id } = req.params
        const result = await Book.findByIdAndUpdate(id, req.body)

        if (!result) return res.status(500).send({ message: 'Book not found' })

        return res.status(200).send({ message: 'Book updated successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error', 
        });
    }
})

//Route for to delete a specfic book
router.delete('/:id', async (req, res) => {

    try {

        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)
 
        if (!result) return res.status(500).send({ message: 'Book not found' })

        return res.status(200).send({ message: 'Book deleted successfully' })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Internal Server Error',
        });
    }
})

export default router;
