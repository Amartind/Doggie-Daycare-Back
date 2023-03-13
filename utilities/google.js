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
    console.log(data);
    if (response.status === 200) {
        if (data.result.verdict.validationGranularity === "PREMISE") {
            reply.validatedAddress = data.result.address.formattedAddress;
            reply.placeId = data.result.geocode.placeId;
            console.log(reply);
            return reply;
        } else {
            reply.validatedAddress = data.result.address.formattedAddress;
            reply.placeId = data.result.geocode.placeId;
            console.log(reply);
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
        const rawDistance = data.routes[0].legs[0].distance.text
        const distance = parseInt((rawDistance.split(" ")[0]).split(",").join(""));
        return distance;
    }
}


module.exports = {
    validateAddress,
    getDistance,
}


// const myAddress = {
//     administrativeArea: "OH",
//     locality: "Columbus",
//     postalCode: "43214",
//     addressLines: "5142 North High Street, Apt 212"
// };
// const placeIdOne = "ChIJXa11XvSrmlQR_IzMkY63fe4";
// const placeIdTwo = "Ejw1MTQyIE5vcnRoIEhpZ2ggU3RyZWV0IEFwdCAyMTIsIENvbHVtYnVzLCBPSCA0MzIxNC0xNTQ2LCBVU0EiHxodChYKFAoSCeF-PF-BjTiIEavdy1eQr6WREgMyMTI";
// validateAddress(myAddress);
// getDistance(placeIdOne, placeIdTwo);
