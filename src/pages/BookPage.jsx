import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function BookPage() {
    const apiUrl = "http://localhost:3000";

    const { id } = useParams();
    const [ book, setBook ] = useState(null);
    useEffect(getData, [id]);
    function getData() {
        axios
            .get(`${apiUrl}/books/${id}`)
            .then((res) => {
                console.log(res.data.item);
                setBook(res.data.item);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
        <h1>Sono il libro: {id}</h1>
        {book ? (
            <div>
                <h3>{book.title}</h3>
                <br />
                <span>Status: {book.status === "PUBLISH" ? "published" : "unpublished"}</span>
                <br />
                <span>Description: {book.longDescription}</span>
                <br />
                <span>Page count: {book.pageCount}</span>
                <br />
            </div>
        ) : (
            <p>Caricamento in corso...</p>
        )}
    </>

    );
}

export default BookPage;