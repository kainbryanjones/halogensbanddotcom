import axios from "axios";

const BASE_URL = process.env.REACT_APP_KUNAKI_BASE_URL;
const USER_ID = process.env.REACT_APP_KUNAKI_USER_ID;
const PASSWORD = process.env.REACT_APP_KUNAKI_PASSWORD;

const KunakiAPI = axios.create({
    baseURL: `https://cors-anywhere.herokuapp.com/${BASE_URL}`,
    timeout: "60000"
})

const getShippingOptionsHTTPString = ({ country, state_province, postalcode }, productId, quantity) => {
    const HTTPString = `HTTPService.ASP?RequestType=ShippingOptions&State_Province=${state_province}&PostalCode=${postalcode}&Country=${country}&ProductId=${productId}&Quantity=${quantity}&ResponseType=xml`
    return HTTPString;
}

const getRequestManufactureHTTPString = (testmode, customerName, addressLine1, addressLine2, city, state, postCode, country, shippingDescription, productId, quantity) => {
    let mode;
    if (testmode == true) {
        mode = "Test"
    } else {
        mode = "Live";
    }
    const HTTPString = `HTTPService.ASP?RequestType=Order&UserId=${USER_ID}&Password=${PASSWORD}&Mode=${mode}&Name=${customerName}&Company=&Address1=${addressLine1}&Address2=${addressLine2}&City=${city}&State_Province=${state}&PostalCode=${postCode}&Country=${country}&ShippingDescription=${shippingDescription}&ProductId=${productId}&Quantity=${quantity}&ResponseType=xml`
    return HTTPString;
}

const getRequestOrderStatusHTTPString = (orderId) => {
    const HTTPString = `HTTPService.ASP?RequestType=OrderStatus&UserId=${USER_ID}&Password=${PASSWORD}&orderId=${orderId}&ResponseType=xml`
    return HTTPString;
}

export const fetchShippingOptions = async (shippingAddress, productId, quantity) => {
    try {
        const shippingOptionsHTTPString = getShippingOptionsHTTPString(shippingAddress, productId, quantity);
        const { data } = await KunakiAPI.get(shippingOptionsHTTPString);
        return data;
    } catch (err) {
        alert(err);
        return null;
    }
}

export const fetchManufactureRequest = async ({ customerName }, { addressLine1, addressLine2, city, state_province, postalcode, country }, shippingDescription, productId, quantity) => {
    try {
        const requestManugactureHTTPString = getRequestManufactureHTTPString(customerName, addressLine1, addressLine2, city, state_province, postalcode, country, shippingDescription, productId, quantity);
        console.log(requestManugactureHTTPString);
        const { data } = await KunakiAPI.get(requestManugactureHTTPString);
        return data;
    } catch (err) {
        alert(err); return null;
    }
}

export const fetchOrderStatus = async (orderId) => {
    try {
        const requestOrderStatusHTTPString = getRequestOrderStatusHTTPString(orderId);
        const { data } = await KunakiAPI.get(requestOrderStatusHTTPString);
        return data;
    } catch (err) {
        alert(err); return null;
    }
}
