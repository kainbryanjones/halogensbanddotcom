import React, { useEffect, useRef, useState } from "react";
import { SocialIcon } from 'react-social-icons';
import { send } from 'emailjs-com'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import "./ContactForm.css"

//Captcha
const CAPTCHA_SITE_KEY = process.env.REACT_APP_CAPTCHA_SITE_KEY;

//EmailJs
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAIL_JS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE1_ID;

//Max number of characters for contact for message box.
const MESSAGE_MAX_LENGTH = 500;

const ContactForm = () => {

    const submitButtonRef = useRef();
    const captchaRef = useRef();
    const navigate = useNavigate();

    //State representing if Captcha has authenticated the user as not a robot
    const [isAuthenticated, setAuthenticated] = useState(false);
    //States represent the current state of the message.
    const [isSending, setSending] = useState(false);
    const [hasSent, setSent] = useState(false);

    //Object which holds parameterss for EmailJs to use
    //This way we can personalise the email 
    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: 'Halogens',
        message: '',
        reply_to: '',
        subject: '',
        order_id: '',
        other: ''
    });

    //Have to useEffect here because for some reason using <button disable>
    //in the JSX doesn't seem to allow it to be enabled again. The button will
    //look enabled, but I've found it lacks the functionality of a button.
    useEffect(() => {
        submitButtonRef.current.disabled = true;
    }, [])

    //useEffect call to react to when the Captcha authenticates the user.
    useEffect(() => {
        const disabled = !isAuthenticated;
        setSubmitButtonDisabled(disabled);
    }, [isAuthenticated])

    //Helper method to reset authenticated back to false.
    const resetCaptcha = () => {
        setAuthenticated(false);
        captchaRef.current.reset();
    }

    const setSubmitButtonDisabled = (isDisabled) => {
        submitButtonRef.current.disabled = isDisabled;
    }

    //Handles change of email parameters
    const handleChange = (e) => {
        //The paramter name is stores in the JSX element "name" attribute
        //And the parameter value is stored in the JSX element "value" attribute.
        setToSend({ ...toSend, [e.target.name]: e.target.value })
    }

    //Handles when the user submits
    const handleSubmit = () => {
        setSending(true);
        const handleSent = () => {
            setSent(true)
            alert("Email Sent. We'll be in touch!");
            navigate("/home");
        }
        send(EMAILJS_SERVICE_ID, EMAIL_JS_TEMPLATE_ID, toSend, EMAILJS_PUBLIC_KEY).then(
            handleSent
        ).catch(
            err => alert(err)
        );
        setSending(false);
    }

    //This component will render only when the chosen
    //Subject is "Problem With Order"
    //it displays a list of helpful links and an extra
    //paramater for the user to enter their Order Id
    const RenderedProblemWithOrderSubjectExtra = () => {
            return (
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="problemwithorder">ORDER ID</label>
                    </div>
                    <div className="col-75">
                        <input /*this input is optional*/ name="order_id" type="text" id="order_id" onChange={handleChange} />
                        <label htmlFor="problemwithorder">
                            <ul>
                                <li><a href="https://help.printful.com/hc/en-us" target="_blank" rel="noreferrer">Printful Support (Merchandise Orders) </a></li>
                                <li><a href="https://kunaki.com/answers.htm" target="_blank" rel="noreferrer">Kunaki Support (CD / Vinyl Orders)</a></li>
                                <li><Link to="/store/tracking">Order Tracking</Link></li>
                            </ul>
                        </label>
                    </div>
                </div>
            )
    }

    //This component will render only when the chosen subject
    //is "other". It displays an extra paramater for 
    const RenderedOtherSubjectExtra = () => {
        return(
            <div className="row">
            <div className="col-25">
                <label htmlFor="problemwithorder">OTHER SUBJECT</label>
            </div>
            <div className="col-75">
                <input required name="other" type="text" id="other" onChange={handleChange} />
            </div>
        </div>
        )
    }


    return (
        <div className="form-container">
            <form action="" onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }} onChange={() => {
                if (isAuthenticated) {
                    resetCaptcha()
                }
            }}>
                <div className="row">
                    <div className="title">
                        <h2>CONTACT FORM</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="name">NAME</label>
                    </div>
                    <div className="col-75">
                        <input required name="from_name" type="text" id="name" onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="email">EMAIL</label>
                    </div>
                    <div className="col-75">
                        <input required name="reply_to" type="email" id="email" onChange={handleChange} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="subject">SUBJECT</label>
                    </div>
                    <div className="col-75">
                        <select name="subject" id="subject" onChange={handleChange}>
                            <option>General Enquiry</option>
                            <option>Business Enquiry</option>
                            <option>Problem With Order</option>
                            <option>Problem With Website</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                {toSend.subject==="Problem With Order" && <RenderedProblemWithOrderSubjectExtra />}
                {toSend.subject==="Other" && <RenderedOtherSubjectExtra/>}
                <div className="row">
                    <div className="col-25">
                        <label htmlFor="message">MESSAGE</label>
                    </div>
                    <div className="col-75">
                        <textarea required maxLength={MESSAGE_MAX_LENGTH} name="message" id="message" onChange={handleChange}></textarea>
                    </div>
                </div>
                <div className="row">
                    <div className="col-25">
                        <input ref={submitButtonRef} type="submit" value="SUBMIT" />
                        {isSending && <>Sending...</>}
                        {hasSent && <>Sent</>}
                    </div>
                    <div className="col-75">
                        <ReCAPTCHA ref={captchaRef} sitekey={CAPTCHA_SITE_KEY} onChange={() => { setAuthenticated(true) }} onExpired={() => { setAuthenticated(false) }} />
                    </div>
                </div>
            </form>
        </div >
    )
}

export default ContactForm;