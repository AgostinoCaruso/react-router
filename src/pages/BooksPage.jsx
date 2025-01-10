import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

import axios from "axios";

const apiUrl = "http://localhost:3000";

function BooksPage() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState("");

    //axios call index
    const getData = () => {

        axios
            .get(apiUrl + "/books")
            .then((res) => {
                console.log(res.data);
                setBooks(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    //axios call destroy
    const handleDelete = (itemID) => {
        axios
            .delete(`${apiUrl}/books/${itemID}`)
            .then((res) => {
                console.log("item deleted:", res.data);
                setBooks( books.filter((book) => book.id != itemID));
            })
            .catch((error) => {
                console.log(error);
            })
    };



    useEffect(() => {
        getData();
    }, []);


    return (
        <main>
            <Link to="/book/addbook">Add new book</Link>
            <Card array={books} handleDelete={handleDelete} />
        </main>
    );
}

export default BooksPage;