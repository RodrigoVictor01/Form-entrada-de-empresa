import React from "react";
import Logo from '../image/logo.jpeg';
import './Header.css';


const Header = props => {
    return (
        <header>
            <div className="headerArea">
                <div className="logo">
                    <div className="boxLogo">
                        <img src={Logo} alt="" />
                    </div>
                </div>
                <h1>Igor Sena Assessoria Contábil</h1>
            </div>
        </header>
    )
}


export default Header;