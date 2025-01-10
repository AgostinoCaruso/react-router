import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import Loader from "../components/Loader";

function FormPage() {
    const apiUrl = "http://localhost:3000";
    const webUrl = "http://localhost:5713";
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    //to get all books in the DB
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

    //to update everytime this variable changes
    useEffect(() => {
        getData();
    }, []);

    //to add a new book via form to DB
    const addBook = (newBooks) => {
        //axios call post
        setIsLoading(true);
        axios
            .post(`${apiUrl}/books`, newBooks)
            .then((res) => {
                console.log("book added", res.data);
                setBooks([...books, newBooks]);
                navigate(`/book/${res.data.id}`)
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
            })
    };

    const [formData, setFormData] = useState({
        id: 0,
        title: "",
        status: false,
        description: "",
        pageCount: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let n = 0;
        let newID = books.forEach((ele) => {
            if (ele.id > n) {
                n = ele.id;
            }
        });
        newID = n + 1;
        const book = {
            id: newID,
            title: formData.title,
            status: formData.status,
            longDescription: formData.description,
            pageCount: formData.pageCount,
        };

        addBook(book);
        setFormData({
            id: 0,
            title: "",
            status: false,
            description: "",
            pageCount: 0,
        });
        // navigate(-1);
    }

    const handleInputChange = (e) => {
        const { name, value, checked, type } = e.target;
        let inputValue = type == "checkbox" ? checked : value;
        if (name == "episodes") {
            inputValue = value ? parseInt(value, 10) : 0;
        }

        setFormData({ ...formData, [name]: inputValue });
    }


    return (
        <>
            { isLoading && < Loader/>}
            <form onSubmit={handleSubmit} className=" flex flex-col" >
                <input
                    type="text"
                    name="title"
                    placeholder="Title..."
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <br />
                <br />
                <label htmlFor="status">Published?</label>
                <input
                    type="checkbox"
                    name="status"
                    checked={formData.status}
                    onChange={handleInputChange}
                />
                <br />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Description..."
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <br />
                <br />
                <input
                    type="number"
                    name="pageCount"
                    placeholder="N' page..."
                    value={formData.pageCount}
                    onChange={handleInputChange}
                />
                <br />
                <br />
                <button type="submit" className="">Invia</button>
            </form>
        </>
    );
}

export default FormPage;