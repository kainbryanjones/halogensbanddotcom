import React, { useEffect, useRef, useState } from "react";
import { fetchManufactureRequest, fetchShippingOptions } from "../../apis/KunakiApi";
import XMLParser from 'react-xml-parser'

import "../ContactForm/ContactForm.css"

//Array of all countries Kunaki ship to(via the Kunaki website)
const COUNTRIES = new Array('Australia', 'Austria', 'Bahrain', 'Belarus', 'Belgium', 'Bulgaria', 'Canada', 'Chile', 'China', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'England', 'Estonia', 'Finland', 'France', 'Germany', 'Gibraltar', 'Greenland', 'Hong Kong', 'Hungary', 'Iceland', 'Ireland', 'Japan', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Montenegro, Republic Of', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Saudi Arabia', 'Serbia, Republic Of', 'Singapore', 'Slovak Republic', 'Slovenia', 'South Korea', 'Sweden', 'Switzerland', 'Taiwan', 'Thailand', 'Turkey', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vatican City');
//Array of all US States Kunaki ship to(two letter abbrivations e.g. NY = "New York")
const US_STATES = new Array("AA", "AE", "AK", "AL", "AP", "AR", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY");
//Array of all Canada provinces Kunaki ship to.
const CANADA_PROVINCES = new Array("AB", "BC", "MB", "NB", "NF", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT");

const ALBUM_1_PRODUCTID = process.env.REACT_APP_KUNAKI_ALBUM_1_PRODUCT_ID;
const ALBUM_1_PRICE =  process.env.REACT_APP_KUNAKI_ALBUM_1_PRICE;

const AlbumPurchaseForm = () => {

    //Empty string is better than null for this particular use case.
    //When sending the HTTP request to Kunaki an empty string is treated as NULL
    //whereas null will be treated as a string(i.e. "null")
    
    //Customer contact information
    const [contactInfo, setContactInfo] = useState({
        email: "",
        customerName: "",
        comapnyName: ""
    });

    //Customer shipping address
    const [shippingAddress, setShippingAddress] = useState({
        addressLine1: "",
        addressLine2: "",
        city: "",
        country: COUNTRIES.at(0),//Default country is Australia
        state_province: "",
        postalCode: ""
    });

    //Delivery service selected for the order. E.g. "USPS First Class Mail"
    const [selectedShippingOption, setSelectedShippingOption] = useState(null);
    //Number of CDs limited to 1-145
    const [quantity, setQuantity] = useState(1);
    const [cost, setCost] = useState(quantity)

    //Shipping options available to the customer's country
    const [possibleShippingOptions, setPossibleShippingOptions] = useState([]);

    //parsed XML response from Kunaki once order is sent
    const [orderResponse, setOrderResponse] = useState(null);
    //boolean value reprsents whether delivery options are being fetched.
    //used to disable form submit button when true
    const [isFetchingDeliveryOptions, setFetchingDeliveryOptions] = useState(false);

    const submitButtonRef = useRef(null);

    /*
    This useEffect updates the shipping options when the country or quantity changes.
    */
    useEffect(() => {
        if (shippingAddress) {
            //setTimeout used so that we don't just call
            //every change of country or quanitity. A 250ms 
            //wait is envoked. This is useful if the user
            //chooses the wrong country or scrolls the quantity to
            //the desired ammount.
            const timeOutId = setTimeout(() => {
                updateShippingOptions();
            }, 250)
            return (
                () => {
                    clearTimeout(timeOutId);
                }
            )
        }
    }, [shippingAddress.country, quantity])
   
    
    /*
    When the shipping options change this useEffects sets the currently
    selected shipping option to the first option in the options.
    */
    useEffect(() => {
        if (possibleShippingOptions.length > 0) {
            const value = possibleShippingOptions[0];
            setSelectedShippingOption(value)
        }
    }, [possibleShippingOptions])

    //Once a response is recieved this use effect is called.
    useEffect(() => {
        if(orderResponse){
            
        }
    }, [orderResponse]);

    //This useEffect handles making sure that the user
    //can't submit anything when the shipping options are
    //being fetched from Kunaki.
    useEffect(() => {
        if (isFetchingDeliveryOptions) {
            setPossibleShippingOptions([]);
            setSelectedShippingOption(null);
            submitButtonRef.current.disabled=true;
            return;
        }
        submitButtonRef.current.disabled=false;
    }, [isFetchingDeliveryOptions])


    const handleContactInfoChange = (e) => {
        setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    }
    const handleShippingAddressChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    }
    /**
     * This method fetches the shipping options, which are an XML string. It then converts
     * said string to an object which can be understood by the other classes.
     */
    const updateShippingOptions = async () => {
        setFetchingDeliveryOptions(true);
        //XML string of the shipping options
        const fetchedShippingOptions = await fetchShippingOptions(shippingAddress, ALBUM_1_PRODUCTID, quantity);
        setFetchingDeliveryOptions(false);
        //JSON Object of the shipping options parsed from XML string
        var parsedShippingOptionsXML = new XMLParser().parseFromString(fetchedShippingOptions);
        //JSON Object array of the XML "option" tag(s) included in the parsedShippingOptionsXML.
        const options = parsedShippingOptionsXML.getElementsByTagName("option");
        //Custom array to create new object array which easier to read.
        const shippingOptions = [];
        //Create array of JSON objects
        options.forEach((option) => {
            //The reason we use the index [0] here is because getElementsByTagName returns an array.
            //If there only one element(which there will be) this will be an array of length 1
            const optionDescription = option.getElementsByTagName("Description")[0];
            const optionDeliveryTime = option.getElementsByTagName("DeliveryTime")[0];
            const optionPrice = option.getElementsByTagName("Price")[0];
            shippingOptions.push({ description: optionDescription.value, deliveryTime: optionDeliveryTime.value, price: optionPrice.value })
        });
        setPossibleShippingOptions(shippingOptions);
    }
    const createOrder = async () => {
        const response = await fetchManufactureRequest(contactInfo, shippingAddress, selectedShippingOption.description, ALBUM_1_PRODUCTID, quantity);
        setOrderResponse(response);
    }
    const RenderedCountryOptions = ({ }) => {
        return (
            COUNTRIES.map(country => {
                return (
                    <option key={country} value={country}>{country}</option>
                )
            }))
    }
    const RenderedUSStateOptions = () => {
        return (
            US_STATES.map(state => {
                return (
                    <option key={state}>{state}</option>
                )
            }))
    }
    const RenderedCanadaProvinces = () => {
        return (
            CANADA_PROVINCES.map(province => {
                return (
                    <option key={province}>{province}</option>
                )
            }))
    }
    const RenderedShippingOptions = () => {
        if (possibleShippingOptions.length > 0) {
            return (
                possibleShippingOptions.map((shippingOption) => {
                    return (
                        <option key={shippingOption.description} value={shippingOption} >
                            {shippingOption.description} - {shippingOption.deliveryTime} - ${shippingOption.price}
                        </option>
                    )
                })
            )
        }
        return null;
    }
    const calculateTotalPrice = () => {
        return (
            ((parseFloat(quantity) * parseFloat(ALBUM_1_PRICE)) + parseFloat(selectedShippingOption ? selectedShippingOption.price : 0)).toFixed(2)
        )
    }

    return (
        <div style={{ margin: "1.5%" }}>
            <div className="form-container">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    submitButtonRef.current.disabled = true;
                    createOrder();
               }}>
                    <fieldset>
                        <legend>Order Info</legend>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="quantity">QUANTITY</label>
                            </div>
                            <div className="col-75">
                                <input required defaultValue={quantity} min="1" max="145" name="quantity" type="number" id="quantity" onChange={(e) => { setQuantity(e.target.value) }} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset name="Contact Info">
                        <legend>Contact Info</legend>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="email">EMAIL</label>
                            </div>
                            <div className="col-75">
                                <input required name="email" type="email" id="email" onChange={handleContactInfoChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="customerName">NAME</label>
                            </div>
                            <div className="col-75">
                                <input required name="customerName" type="text" id="customerName" onChange={handleContactInfoChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="company">COMPANY (optional)</label>
                            </div>
                            <div className="col-75">
                                <input name="company" type="text" id="company" onChange={handleContactInfoChange} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Shipping Address</legend>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="addressLine1">ADDRESS LINE 1</label>
                            </div>
                            <div className="col-75">
                                <input required name="addressLine1" type="text" id="addressLine1" onChange={handleShippingAddressChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="addressLine2">ADDRESS LINE 2 (optional)</label>
                            </div>
                            <div className="col-75">
                                <input name="addressLine2" type="text" id="addressLine2" onChange={handleShippingAddressChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="city">CITY</label>
                            </div>
                            <div className="col-75">
                                <input required name="city" type="text" id="city" onChange={handleShippingAddressChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="country">COUNTRY</label>
                            </div>
                            <div className="col-75">
                                <select required name="country" id="country" value={shippingAddress.country} onChange={handleShippingAddressChange}>
                                    <RenderedCountryOptions />
                                </select>
                            </div>
                        </div>
                        {
                            shippingAddress.country === "United States" &&
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="state_province">STATE</label>
                                </div>
                                <div className="col-75">
                                    <select required name="state_province" id="state_province" value={shippingAddress.state_province} onChange={handleShippingAddressChange}>
                                        <RenderedUSStateOptions />
                                    </select>
                                </div>
                            </div>
                        }{
                            shippingAddress.country === "Canada" &&
                            <div className="row">
                                <div className="col-25">
                                    <label htmlFor="state_province">PROVINCE</label>
                                </div>
                                <div className="col-75">
                                    <select required name="state_province" id="state_province" value={shippingAddress.state_province} onChange={handleShippingAddressChange}>
                                        <RenderedCanadaProvinces />
                                    </select>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="">POSTAL CODE / ZIP CODE</label>
                            </div>
                            <div className="col-75">
                                <input required name="postalcode" type="text" id="postalcode" onChange={handleShippingAddressChange} />
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Delivery</legend>
                        <div className="row">
                            <div className="col-25">
                                <label htmlFor="shippingDescription">DELIVERY SERVICE</label>
                            </div>
                            <div className="col-75">
                                {isFetchingDeliveryOptions
                                    ?
                                    <div>Loading Delivery Options...</div>
                                    :
                                    <select disabled={!possibleShippingOptions} required name="shippingDescription" id="shippingDescription" value={selectedShippingOption ? selectedShippingOption : ""} onChange={(e) => { setSelectedShippingOption(e.target.value) }}>
                                        <RenderedShippingOptions />
                                    </select>
                                }
                            </div>
                        </div>
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <div className="row">
                            <div className="col-75">
                            </div>
                            <div className="col-25">
                                <output> Total : ${calculateTotalPrice()}</output>
                            </div>
                        </div>
                    </fieldset>
                    <input type="submit" ref={submitButtonRef} />
                </form>
            </div>
        </div >
    )
}

export default AlbumPurchaseForm