import React from 'react';
import ScrollToTop from '../shared/scroll-to-top';

const Footer = () => {
  return (
    <>
      <div className="footer-background-first mt-4" />

      <div className="d-none d-lg-block">
        <footer className="footer-background-second">
          <div className="container">
            <div className="row">
              <div className="col-4">
                <h1 className="h5 mt-2">About us</h1>
                <ul className="footer-font-size">
                  <li>
                    <a href="/privacyPolicy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/cookiePolicy">Cookie Policy</a>
                  </li>
                  <li>
                    <a href="/warrantyPolicy">Warranty Policy</a>
                  </li>
                  <li>
                    <a href="/shippingPolicy">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="/terms">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="/return">Returns and Replacement</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/contactUs">Contact us</a>
                  </li>
                </ul>
              </div>

              <div className="col-4">
                <h1 className="h5 mt-2">Special Category</h1>
                <ul className="footer-font-size">
                  <li>
                    <a href="/men">Mens</a>
                  </li>
                  <li>
                    <a href="/jute">Jute Products</a>
                  </li>
                  <li>
                    <a href="handcraft">Handicraft</a>
                  </li>
                  <li>
                    <a href="/leather">Leather Products</a>
                  </li>
                  <li>
                    <a href="/women">Women</a>
                  </li>
                  <li>
                    <a href="furniture">Furniture</a>
                  </li>
                  <li>
                    <a href="/wooden">Wooden Crafts</a>
                  </li>
                  <li>
                    <a href="/jewellary">Jewellary</a>
                  </li>
                </ul>
              </div>

              <div className="col-4">
                <h1 className="h5 mt-2">Contact</h1>

                <ul className="footer-font-size">
                  <li>
                    <a href="/contactUs">Contact us</a>
                  </li>
                </ul>

                <div className="row">
                  <div className="col-6">
                    <img
                      src="/images/qr_code_banijjo.png"
                      className="img-fluid qr-img"
                      alt="QR Code Banijjo"
                    />
                  </div>
                </div>

                <div className="row mt-3 mb-2">
                  <div className="col-1 facebook-color mr-2">
                    <a
                      href="https://www.facebook.com/banijjo.com.bd"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-facebook-square fa-2x" />
                    </a>
                  </div>

                  <div className="col-1 twitter-color mr-2">
                    <a
                      href="https://twitter.com/banijjo"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-twitter-square fa-2x" />
                    </a>
                  </div>

                  <div className="col-1 linkedin-color mr-2">
                    <a
                      href="https://www.linkedin.com/showcase/banijjo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-linkedin fa-2x" />
                    </a>
                  </div>

                  <div className="col-1 instagram-color mr-2">
                    <a
                      href="https://www.instagram.com/banijjo/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-instagram-square fa-2x" />
                    </a>
                  </div>

                  <div className="col-1 youtube-color mr-2">
                    <a
                      href="https://www.youtube.com/banijjomela"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-youtube-square fa-2x" />
                    </a>
                  </div>

                  <div className="col-1 pinterest-color mr-2">
                    <a
                      href="https://www.pinterest.com/banijjo/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fab fa-pinterest-square fa-2x" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div className="d-block d-lg-none">
        <footer className="footer-background-second">
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="h5 mt-2">About us</h1>
                <ul className="footer-font-size">
                  <li>
                    <a href="/privacyPolicy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/cookiePolicy">Cookie Policy</a>
                  </li>
                  <li>
                    <a href="/warrantyPolicy">Warranty Policy</a>
                  </li>
                  <li>
                    <a href="/shippingPolicy">Shipping Policy</a>
                  </li>
                  <li>
                    <a href="/terms">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="/return">Returns and Replacement</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/contactUs">Contact us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <div className="footer-background-last">
        <div className="container">
          <div className="row py-3">
            <div className="col-lg-6 col-md-12">
              &copy; 2010-2019{' '}
              <a href="https://banijjo.com.bd/" className="banijjo-link">
                banijjo.com.bd
              </a>{' '}
              All rights reserved.
            </div>

            <div className="col-lg-4 offset-lg-2 col-md-12 mt-lg-0 mt-md-1">
              <span> Designed and Developed By</span>{' '}
              <a
                href="http://www.ambalait.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="d-inline-block mt-n2"
                  src="/images/ambala_it.png"
                  alt="ambalait"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <ScrollToTop />
    </>
  );
};

export default Footer;
