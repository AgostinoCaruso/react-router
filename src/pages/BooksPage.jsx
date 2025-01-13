import { Link } from "react-router-dom";
import Card from "../components/Card";
import { useContext, useEffect } from "react";
import { BooksContext } from "../context/BooksContext";

function BooksPage() {
    const {getData} = useContext(BooksContext);
    useEffect(() => {
        getData();
    }, []);

    return (
        <main>
            <Link to="/book/addbook">Add new book</Link>
            <Card />
        </main>
    );
}

export default BooksPage;