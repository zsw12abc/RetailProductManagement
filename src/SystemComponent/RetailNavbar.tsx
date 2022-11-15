import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";

function RetailNavBar() {
    const NavBrand = {
        textDecoration: 'none',
        color: 'Black',
        fontWeight: 'bold',
        paddingTop: "0.3rem",
        paddingBottom: "0.3rem",
        marginRight: '1rem',
        marginLeft: '1rem'
    }
    const NavLink = {
        textDecoration: 'none',
        color: 'gray',
        paddingTop: "0.3rem",
        paddingBottom: "0.3rem",
        marginRight: '0.5rem',
        marginLeft: '0.5rem'
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Link to={'/'} style={NavBrand}><h4>Retail Product Management</h4></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link style={NavLink} to="/Home">Home</Link>
                        <Link style={NavLink} to="/Product/New">Add New Product</Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default RetailNavBar;

// padding-top: var(--bs-navbar-brand-padding-y);
// padding-bottom: var(--bs-navbar-brand-padding-y);
// margin-right: var(--bs-navbar-brand-margin-end);
// font-size: var(--bs-navbar-brand-font-size);
// color: var(--bs-navbar-brand-color);
// text-decoration: none;
// white-space: nowrap;
