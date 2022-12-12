import React, { useState } from "react"

import { send } from 'emailjs-com'

import ContactForm from "../../components/ContactForm/ContactForm";

import "./Contact.css"

const Contact = () => {

    return (
        <div>
            <h1>Contact Us</h1>
            <div className="contact-form-wrapper">
                <ContactForm/>
            </div>
        </div>
    )
}

export default Contact;