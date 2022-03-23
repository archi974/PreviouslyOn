import React from "react";
import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
} from "./NavbarElements";

const Navbar = () => {
    return (

        <Nav>
            <NavLogo to="/home">
                Previously on
            </NavLogo>
            <Bars />
            <NavMenu>
                <NavLink to="/profile"> {/*activeStyle*/}
                    Profil
                </NavLink>
            </NavMenu>
        </Nav>
    );
};
export default Navbar;