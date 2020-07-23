import React from 'react';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
} from 'react-bootstrap';
import { calculateTotalItems } from '../../utils/utils';

const Header = ({ cartProductsInfo }) => {
  const totalCartItems = calculateTotalItems(cartProductsInfo);

  return (
    <>
      <div className="d-none d-lg-block">
        <div className="top-bar" />
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="text-center">
                <a href="https://banijjo.com.bd">
                  <img
                    className="img-fluid"
                    src="/images/banijjo.com.bd.png"
                    alt="company-logo"
                  />
                </a>
              </div>
            </div>

            <div className="col-9">
              <div className="row">
                <div className="col-3">
                  <div className="d-inline-block">
                    <img
                      className="helpline-icon mt-n1"
                      src="/images/mobile_icon.png"
                      alt="help line"
                    />
                    <h1 className="text-primary h6 d-inline-block mt-2 ml-1">
                      <b>09677-222 222</b>
                    </h1>
                  </div>
                </div>

                <div className="col-9">
                  <div className="float-right">
                    <Navbar expand="lg">
                      <Navbar.Toggle aria-controls="basic-navbar-nav" />
                      <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                          <Nav.Link href="/">Home</Nav.Link>

                          <Nav.Link href="#">
                            <i className="fas fa-sign-in-alt pr-1" />
                            Seller Center
                          </Nav.Link>

                          <Nav.Link href="#">
                            <i className="fas fa-rss pr-1" />
                            Blog
                          </Nav.Link>

                          <Nav.Link href="#">
                            <i className="fas fa-lock pr-1" />
                            Buyer Protection
                          </Nav.Link>

                          <Nav.Link href="#">
                            <i className="far fa-heart pr-1" />
                            Wish List
                          </Nav.Link>

                          <NavDropdown title="Account" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#">
                              <i
                                className="far fa-user pr-1"
                                aria-hidden="true"
                              />
                              Account
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/auth/login">
                              <i
                                className="far fa-user pr-1"
                                aria-hidden="true"
                              />
                              Login
                            </NavDropdown.Item>
                            <NavDropdown.Item href="/auth/registration">
                              <i
                                className="far fa-user pr-1"
                                aria-hidden="true"
                              />
                              Register
                            </NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#">
                              Separated link
                            </NavDropdown.Item>
                          </NavDropdown>
                        </Nav>
                      </Navbar.Collapse>
                    </Navbar>
                  </div>
                </div>
              </div>

              <div className="row my-2">
                <div className="col-10">
                  {/* <form> */}
                  <div className="search-box-area">
                    <form action="#">
                      <div className="search-box">
                        <input
                          className="custom-input"
                          type="text"
                          name="search"
                          id="search"
                          placeholder="Search..."
                        />
                        <button type="submit">
                          <i className="fas fa-search" />
                        </button>
                      </div>
                    </form>
                  </div>
                  {/* </form> */}
                </div>
                <div className="col-2">
                  <a href="#" style={{ position: 'relative' }}>
                    <img
                      className="cart-image mt-n1"
                      src="/images/cart_icon.png"
                      alt="cart_icon_desk"
                    />
                    <span
                      className="badge badge-danger rounded-circle ml-n2"
                      style={{ position: 'absolute' }}
                    >
                      {totalCartItems}
                    </span>
                  </a>
                </div>
              </div>

              <div className="row mt-n1">
                <div className="col-12">
                  <span className="mr-2 main-menu">
                    <a href="#!">Mens</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">Shirt</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">Jute Products</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">Handicraft</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">Leather Products</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">Women</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">Kids</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">other</a>
                  </span>
                  <span className="mr-2 main-menu">
                    <a href="#!">Mens</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-block d-lg-none">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <a href="https://banijjo.com.bd">
                <img
                  className="img-fluid"
                  src="/images/banijjo-mobile-logo.png"
                  alt="company-logo"
                />
              </a>
            </div>
            <div className="col-9">
              <div className="d-flex flex-row justify-content-end">
                <div className="mt-4 ml-5">
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle dropdowntoggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <a href="#">
                        <img
                          src="/images/mobile_icon.png"
                          className="helpline-image mt-n1"
                          alt="Cart Icon"
                        />
                      </a>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item  helpline-number" href="#">
                        09677-222 222
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 ml-5">
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle dropdowntoggle "
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="far fa-user text-primary" />
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item" href="#">
                        Message Center
                      </a>
                      <a className="dropdown-item" href="#">
                        Wish List
                      </a>
                      <a className="dropdown-item" href="#">
                        My Favorite Stores
                      </a>
                      <a className="dropdown-item" href="#">
                        My Coupons
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 ml-5">
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle dropdowntoggle"
                      type="button"
                      data-toggle="dropdown"
                    >
                      <i className="fas fa-bars text-primary" />
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <a className="dropdown-item" href="#">
                        Seller Center
                      </a>
                      <a className="dropdown-item" href="#">
                        Help
                      </a>
                      <a className="dropdown-item" href="#">
                        Buyer Protection
                      </a>
                      <a className="dropdown-item" href="#">
                        Wish List
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-4 ml-5">
                  <a href="#" style={{ position: 'relative' }}>
                    <img
                      className="cart-image-mobile mt-n1"
                      src="/images/cart_icon.png"
                      alt="cart_icon_desk"
                    />
                    <span
                      className="badge badge-custom-mb badge-danger rounded-circle mt-n2 ml-n1"
                      style={{ position: 'absolute' }}
                    >
                      2
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-3 mt-2">
            <div className="col-12">
              {/* <form> */}
              <div className="search-box-area">
                <form action="#">
                  <div className="search-box">
                    <input
                      className="custom-input"
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search product..."
                    />
                    <button type="submit">
                      <i className="fas fa-search" />
                    </button>
                  </div>
                </form>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
