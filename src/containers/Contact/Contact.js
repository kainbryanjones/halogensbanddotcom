import React, { useState } from "react"

import { send } from 'emailjs-com'

import ContactForm from "../../components/ContactForm/ContactForm";

import "./Contact.css"
import useDocumentTitle from "../../utils/Hooks/useDocumentTitle";

const Contact = () => {

    useDocumentTitle("Contact");

    return (
        <div>
            <div className="contact-form-wrapper">
                <ContactForm/>
            </div>
        </div>
    )
}

export default Contact;