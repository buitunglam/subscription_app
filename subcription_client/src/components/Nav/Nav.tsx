import React from "react";
import { Navbar, NavItem, NavLink } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {};

const Nav = (props: Props) => {
    return (
        <Navbar>
            <NavItem>
                <Link to="/">Home</Link>
            </NavItem>
            {localStorage.getItem("token") ? (
                <NavItem>
                    <Link to="/">Logout</Link>
                </NavItem>
            ) : null}
        </Navbar>
    );
};

export default Nav;
