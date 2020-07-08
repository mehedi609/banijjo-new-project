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

      <div className="container-fluid mt-3">
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

        <h1 className="h2 text-center bg-light mt-4 py-3">Contact Us</h1>
      </div>

      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control no-border-radius"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control no-border-radius"
                  placeholder="subject"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  className="form-control no-border-radius"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  className="form-control no-border-radius"
                  placeholder="Telephone"
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  className="form-control no-border-radius"
                  id="exampleFormControlTextarea1"
                  placeholder="Description"
                  rows="3"
                  required
                />
              </div>

              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </form>
          </div>

          <div className="col-md-5 offset-md-1 mt-md-5 mt-3">
            <div className="row">
              <div className="col-1">
                <i className="fas fa-map-marker-alt fa-2x text-primary" />
              </div>
              <div className="col-11">
                <p className="d-inline-block mt-1">
                  164/A Shahjahan Rd, Dhaka 1207
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-1">
                <i className="fas fa-envelope fa-2x text-primary" />
              </div>
              <div className="col-11">
                <p className="d-inline-block mt-1">info@banijjo.com.bd</p>
              </div>
            </div>

            <div className="row">
              <div className="col-1">
                <i className="fas fa-phone-volume fa-2x text-primary" />
              </div>
              <div className="col-11">
                <p className="d-inline-block mt-1">
                  <b>09677-222 222</b>
                </p>
              </div>
            </div>

            <div className="row mt-2">
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
    </BaseLayout>
  );
};

export default contactUs;
