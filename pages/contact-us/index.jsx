import React from 'react';
import BaseLayout from 'components/layout/base-layout';
import Head from 'next/head';

const contactUs = () => {
  return (
    <BaseLayout>
      <Head>
        <title>Contact Us</title>
        <link rel="stylesheet" href="/css/contactUs.css" />
      </Head>

      <div className="container-fluid">
        <div className="contactMap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14605.88690770744!2d90.36374143036696!3d23.766210653303634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8968a250d73%3A0x8f874ef58c652d1a!2sbanijjo.com!5e0!3m2!1sen!2sbd!4v1580383181324!5m2!1sen!2sbd"
            width="100%"
            height="550px"
            frameBorder="0"
            style={{ border: '3px solid #ccc' }}
            allowFullScreen=""
            title="googleMap"
          />
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="h2 text-center">Contact Us</h1>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <form action="">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="subject"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Telephone"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      placeholder="Description"
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-primary btn-contact" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="col-md-4 offset-md-2">
            <div className="row">
              <div className="contact-info mt-3">
                <div className="col-md-12 mb-3">
                  <div className="contact-info-left float-left pr-3">
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <div className="contact-info-right d-table-cell">
                    <span>164/A Shahjahan Rd, Dhaka 1207</span>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="contact-info-left float-left pr-3">
                    <i
                      className="fa fa-envelope-open"
                      style={{ fontSize: '8px' }}
                    ></i>
                  </div>
                  <div className="contact-info-right d-table-cell">
                    <span>info@banijjo.com.bd</span>
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <div className="contact-info-left float-left pr-3">
                    <i className="fa fa-phone-volume"></i>
                  </div>
                  <div className="contact-info-right d-table-cell">
                    <span>09677-222 222</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="my-3">
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
      </div>
    </BaseLayout>
  );
};

export default contactUs;
