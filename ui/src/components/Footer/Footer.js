import React from 'react';
import { Link } from 'react-router-dom';
import gitLogo from '../../images/git-logo.svg';

function Footer() {
    return (
        <footer className="footer">
            <Link className="footer__link" to="https://github.com/mockgician/mockgician" rel="noreferrer" target="_blank">
                <img className="footer__logo" src={gitLogo} alt="GitHub Logo" /> 
            </Link>
        </footer>   
    );
}

export default Footer;