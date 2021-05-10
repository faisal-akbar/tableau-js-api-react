import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../images/tableau.png';
import './Navbar.css';

const Navbar = () => (
    <nav className="navbar navbar-expand-lg bg-light navbar-light">
        <div className="container">
            <NavLink to="/" className="navbar-brand">
                <img src={logo} alt="Embed-Tableau" />
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav  justify-content-between nav-link ml-auto align-items-md-center">
                    {/* Home Navigation Click redirect to home */}
                    <li className="nav-item">
                        <NavLink to="/" exact className="nav-link mr-3">
                            Basic Embed
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/DynamicLoad" className="nav-link  mr-3">
                            Dynamic Load
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Tabs" className="nav-link  mr-3">
                            Tabs
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Export" className="nav-link  mr-3">
                            Export
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Filter" className="nav-link  mr-3">
                            Filter
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/GetData" className="nav-link  mr-3">
                            Get Data
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Resize" className="nav-link mr-3">
                            Resize
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Events" className="nav-link mr-3">
                            Events
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/SelectMarks" className=" nav-link mr-3">
                            Select Marks
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/Animation" className="nav-link mr-3">
                            Animation
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
);

export default Navbar;
