import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BooksContext = createContext();

const apiUrl = "http://localhost:3000";

export const BooksProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [currentBook, setCurrentBook] = useState(null);

    const getData = () => {
        axios
            .get(apiUrl + "/books")
            .then((res) => {
                console.log(res.data);
                setBooks(res.data.data);
            })
            .catch((error) => {
                console.error("Error fetching books:", error);
            });
    };

    const getBookById = (id) => {
        axios
            .get(`${apiUrl}/books/${id}`)
            .then((res) => {
                setCurrentBook(res.data.item)
            })
            .catch((error) => console.error("Error fetching book:", error));
    };

    const handleDelete = (bookId) => {
        axios
            .delete(`${apiUrl}/books/${bookId}`)
            .then(() => {
                setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
            })
            .catch((error) => {
                console.error("Error deleting book:", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const contextValue = { books, setBooks, handleDelete, getData, currentBook, getBookById };

    return (
        <BooksContext.Provider value={contextValue}>
            {children}
        </BooksContext.Provider>
    );
};