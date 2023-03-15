const googleApiKey = "AIzaSyAclDqILWEyWWPBx4rXSjDRR4wNuk5qmV4";
const escapeHTML = require("escape-html");
const fetch = require("node-fetch");


const validateAddress = async function (ownerAddress) {
    let apiUrl = `https://addressvalidation.googleapis.com/v1:validateAddress?key=${googleApiKey}`
    let reply = {
        validatedAddress: "",
        placeId: ""
    }
    let addressObject = {
        regionCode: "US",
        addressLines: ownerAddress
    }
    const body = {
        address: addressObject
    };
    const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();
    if (response.status === 200) {
        if (data.result.verdict.validationGranularity === "PREMISE") {
            reply.validatedAddress = data.result.address.formattedAddress;
            reply.placeId = data.result.geocode.placeId;
            return reply;
        } else {
            reply.validatedAddress = data.result.address.formattedAddress;
            reply.placeId = data.result.geocode.placeId;
            return reply;
        }
    } else {
        console.log(response.status);
    }
};


const getDistance = async function(placeIdOne, placeIdTwo){
    // Takes two google API place IDs and calculates DRIVING distance (not straight-line distance).
    const origin = escapeHTML(placeIdOne);
    const destination = escapeHTML(placeIdTwo); 
    const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=place_id:${origin}&destination=place_id:${destination}&mode=driving&units=imperial&key=${googleApiKey}`
    const response = await fetch(directionsUrl, {method: "POST"});
    const data = await response.json();
    if (data){
        console.log(data);
        const rawDistance = data.routes[0].legs[0].distance.text
        const distance = parseFloat((rawDistance.split(" ")[0]).split(",").join(""));
        console.log(distance)
        return distance;
    } else {
        return null;
    }
}


module.exports = {
    validateAddress,
    getDistance,
}
