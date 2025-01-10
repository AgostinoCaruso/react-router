import { Link, NavLink } from "react-router-dom";

function Header() {
    return (
        <header className=" text-center">
            <h1 className="">React Blog Api</h1>
            <nav className=" flex flex-col">
                <NavLink to="/book">Home</NavLink>
                <br />
                <NavLink to="/contactus">Contact Us</NavLink>
                <br />
                <NavLink to="/aboutus">About Us</NavLink>
                <br />
            </nav>
        </header>
    );
}

export default Header;