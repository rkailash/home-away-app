import React, { Component } from 'react';
import Header from './Header';
import Owner from './Owner';
import { Link, Redirect } from "react-router-dom";
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import 'styles/ownerDashboard.scss';

const OwnerDropdown = ({toggle, isOpen}) => {
    return (
        (
            <Dropdown className="header-menu" toggle={() => toggle()} isOpen={isOpen}>
                <DropdownToggle caret>My Account</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <svg x="0px" y="0px" viewBox="0 0 512 512" width="16px" height="16px">
                            <g>
                                <g>
                                    <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148    C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962    c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216    h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40    c59.551,0,108,48.448,108,108S315.551,256,256,256z" fill="#5e6d77" />
                                </g>
                            </g>
                        </svg>
                        <Link to="/Traveler/profile">Personal Details</Link>
                    </DropdownItem>
                    <DropdownItem>
                        <svg id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" width="16px" height="16px">
                            <g>
                                <g>
                                    <path d="M506.555,208.064L263.859,30.367c-4.68-3.426-11.038-3.426-15.716,0L5.445,208.064    c-5.928,4.341-7.216,12.665-2.875,18.593s12.666,7.214,18.593,2.875L256,57.588l234.837,171.943c2.368,1.735,5.12,2.57,7.848,2.57    c4.096,0,8.138-1.885,10.744-5.445C513.771,220.729,512.483,212.405,506.555,208.064z" fill="#5e6d77" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M442.246,232.543c-7.346,0-13.303,5.956-13.303,13.303v211.749H322.521V342.009c0-36.68-29.842-66.52-66.52-66.52    s-66.52,29.842-66.52,66.52v115.587H83.058V245.847c0-7.347-5.957-13.303-13.303-13.303s-13.303,5.956-13.303,13.303v225.053    c0,7.347,5.957,13.303,13.303,13.303h133.029c6.996,0,12.721-5.405,13.251-12.267c0.032-0.311,0.052-0.651,0.052-1.036v-128.89    c0-22.009,17.905-39.914,39.914-39.914s39.914,17.906,39.914,39.914v128.89c0,0.383,0.02,0.717,0.052,1.024    c0.524,6.867,6.251,12.279,13.251,12.279h133.029c7.347,0,13.303-5.956,13.303-13.303V245.847    C455.549,238.499,449.593,232.543,442.246,232.543z" fill="#5e6d77" />
                                </g>
                            </g>
                        </svg>
                        <Link to="/Property/">Property Details</Link>
                    </DropdownItem>
                    <DropdownItem>
                        <svg id="Capa_1" x="0px" y="0px" viewBox="0 0 471.2 471.2" width="16px" height="16px">
                            <g>
                                <g>
                                    <path d="M227.619,444.2h-122.9c-33.4,0-60.5-27.2-60.5-60.5V87.5c0-33.4,27.2-60.5,60.5-60.5h124.9c7.5,0,13.5-6,13.5-13.5    s-6-13.5-13.5-13.5h-124.9c-48.3,0-87.5,39.3-87.5,87.5v296.2c0,48.3,39.3,87.5,87.5,87.5h122.9c7.5,0,13.5-6,13.5-13.5    S235.019,444.2,227.619,444.2z" fill="#5e6d77" />
                                    <path d="M450.019,226.1l-85.8-85.8c-5.3-5.3-13.8-5.3-19.1,0c-5.3,5.3-5.3,13.8,0,19.1l62.8,62.8h-273.9c-7.5,0-13.5,6-13.5,13.5    s6,13.5,13.5,13.5h273.9l-62.8,62.8c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4l85.8-85.8    C455.319,239.9,455.319,231.3,450.019,226.1z" fill="#5e6d77" />
                                </g>
                            </g>
                        </svg>
                        <Link to="/OwnerLogin">Sign Out</Link>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    )
};

class OwnerDashboard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if(!this.props.userInfo) {
         return <Redirect to="/OwnerLogin" />;
        }
        return (
            <div className="od">
                <Header hideLyp renderDropdown={(toggle, isOpen) => (<OwnerDropdown toggle={() => toggle()} isOpen={isOpen} />)} />
                <div className="top-container">
                    <Owner />
                </div>
            </div>
        )
    }
}

export default OwnerDashboard;