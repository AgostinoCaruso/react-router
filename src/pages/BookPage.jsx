import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BooksContext } from "../context/BooksContext";

function BookPage() {

    const { id } = useParams();
    const {currentBook, getBookById} = useContext(BooksContext);

    useEffect(() =>{
        getBookById(id);
    }, [id]);

    return (
        <>
        <h1>Sono il libro: {id}</h1>
        {currentBook ? (
            <div>
                <h3>{currentBook.title}</h3>
                <br />
                <span>Status: {currentBook.status === "PUBLISH" || true ? "published" : "unpublished"}</span>
                <br />
                <span>Description: {currentBook.longDescription}</span>
                <br />
                <span>Page count: {currentBook.pageCount}</span>
                <br />
            </div>
        ) : (
            <p>Caricamento in corso...</p>
        )}
    </>

    );
}

export default BookPage;