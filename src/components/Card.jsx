import { Link } from "react-router-dom";
const apiUrl = "http://localhost:5173";

import { useContext } from "react";
import { BooksContext } from "../context/BooksContext";


function Card() {
    const { books, handleDelete } = useContext(BooksContext);

    return (
        <section className=" grid grid-cols-4 gap-1">
            <br /><br />
            <hr />
            {books.map((ele) =>
                <div key={ele.id} >
                    <h3>{ele.title}</h3>
                    <br />
                    <span>Status: {ele.status === "PUBLISH" || true ? "published" : "unpublished"}</span>
                    <br />
                    <span>Description: {ele.longDescription}</span>
                    <br />
                    <span>Page count:{ele.pageCount}</span>
                    <br />
                    <Link to={`${apiUrl}/book/${ele.id}`}> Visualizzami</Link>
                    <span className=" cursor-pointer" onClick={() => handleDelete(ele.id)}>❌Delete</span>
                    <hr />
                </div>
            )}
        </section>
    );
}

export default Card;