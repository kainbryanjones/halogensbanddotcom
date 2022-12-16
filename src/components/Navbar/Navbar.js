import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdArrowDropdown } from "react-icons/io"

import "./Navbar.css"

/**
 * Custom hook designed to trigger a callback when the use clicks outside of a specific element.
 * @param {Reference element} ref 
 * @param {Function that will execute} callback 
 */
const useOutsideAlerter = (ref, callback) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const Navbar = () => {

    const navRef = useRef(null);
    const dropdownRef = useRef(null);
    const dropdownContentRef = useRef(null);

    useOutsideAlerter(navRef, () => {
        setTopNavResponsive(false);
    })

    const toggleTopNavResponsive = () => {
        const nav = navRef.current;
        if (!nav.classList.contains("responsive")) {
            nav.classList.add("responsive");
        } else {
            nav.classList.remove("responsive");
        }
    }

    const toggleDropdown = () => {
        const dropdownContent = dropdownContentRef.current;
        dropdownContent.classList.toggle("show");
    }

    const setTopNavResponsive = (isResponsive) => {
        const nav = navRef.current;
        if (isResponsive) {
            nav.classList.add("responsive");
        } else {
            nav.classList.remove("responsive");
        }
    }

    const setDropdown = (isResponsive) => {
        const dropdownContent = dropdownContentRef.current;
        if (isResponsive)
            dropdownContent.classList.add("show");
        else
            dropdownContent.classList.remove("show");
    }

    return (
        <div ref={navRef} className="topnav" id="myTopnav">
            {
                //The inner div wraps all the links to provide the same onClick method.
                //This is better than providing the top level div the onClick method because
                //this was the user can't just click anywhere on the navbar, but has to click a link.
            }
            <div onClick={toggleTopNavResponsive}>
                <Link className="link" to="/home">Home</Link>
                <Link className="link" to="/music">Music</Link>
                <Link className="link" to="/blog">Blog</Link>
                <Link className="link" to={"/about"}>About</Link>
                <Link className="link" to={"/contact"}>Contact</Link>
                <Link className="icon"><GiHamburgerMenu /></Link>
            </div>
        </div>
    )
}

//<Link className="link" to={"/store/music"}>Music</Link>
/*
<div onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    <div className="dropdown" ref={dropdownRef}>
                        <button className="dropbtn">Store
                            <i><IoMdArrowDropdown className="dropdown-icon" /></i>
                        </button>
                        <div ref={dropdownContentRef} className="dropdown-content">
                            <Link className="link" to={"/store/merch"}>Merch</Link>
                        </div>
                    </div>
                </div>
*/

export default Navbar;
