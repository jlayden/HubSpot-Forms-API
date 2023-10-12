const express = require('express');
const axios = require('axios');
const hubspot = require('@hubspot/api-client');

const app = express();

require('dotenv').config();
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;
const PORTAL_ID = process.env.PORTAL_ID;
const FORM_ID = process.env.FORM_ID;


/**
 * GET Contact Record by Email
 * https://developers.hubspot.com/docs/api/crm/contacts
 */
app.get('/contacts', async (req, res) => {
    // NOTE: Used for testing in browser
    const email = "mp_feedback_anonymously@manpowergroup.com;"

    const getContact = `https://api.hubapi.com/crm/v3/objects/contacts/${email}?idProperty=email&properties=email,firstname,lastname,country,mp_app_feedback_topics,mp_app_feedback_description,mp_app_feedback_device_name,mp_app_feedback_device_os,mp_app_feedback_device_os_version,mp_app_feedback_app_version`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const response = await axios.get(getContact, { headers });
        const data = response.data;
        res.json(data);
    } catch (error) {
        console.error(error);
    }

});


/**
 * GET Property by Name
 * https://developers.hubspot.com/docs/api/crm/properties
 */
app.get('/topics', async (req, res) => {

    const hubspotClient = new hubspot.Client({ "accessToken": PRIVATE_APP_ACCESS });

    const objectType = "contacts";
    const propertyName = "mp_app_feedback_topics"; // "country"; 
    const archived = false;

    try {
        const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(objectType, propertyName, archived);
        console.log(JSON.stringify(apiResponse.options));
        res.json(apiResponse);
    } catch (e) {
        e.message === 'HTTP request failed'
            ? console.error(JSON.stringify(e.response, null, 2))
            : console.error(e)
    }
});



/**
 * POST Submit Form Data
 * https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication
 */
app.get('/submit', async (req, res) => {

    const submitForm = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${PORTAL_ID}/${FORM_ID}`;

    /** TODO Update data with form values */
    let data = {
        "submittedAt": Date.now(),
        "fields": [
            {
                "objectTypeId": "0-1",
                "name": "email",
                "value": "mp_feedback_anonymously@manpowergroup.com"
            },
            {
                "objectTypeId": "0-1",
                "name": "firstname",
                "value": "Anonymous"
            },
            {
                "objectTypeId": "0-1",
                "name": "lastname",
                "value": "Feedback"
            },
            {
                "objectTypeId": "0-1",
                "name": "country",
                "value": "United States"
            },
            {
                "objectTypeId": "0-1",
                "name": "mp_app_feedback_topics",
                "value": "bug"
            },
            {
                "objectTypeId": "0-1",
                "name": "mp_app_feedback_description",
                "value": "A new bug lorem ipsum dolor sit amet"
            },
            {
                "objectTypeId": "0-1",
                "name": "mp_app_feedback_device_name",
                "value": "MacBook Pro"
            },
            {
                "objectTypeId": "0-1",
                "name": "mp_app_feedback_device_os",
                "value": "macOS Monterey"
            },
            {
                "objectTypeId": "0-1",
                "name": "mp_app_feedback_device_os_version",
                "value": "12.4"
            },
            {
                "objectTypeId": "0-1",
                "name": "mp_app_feedback_app_version",
                "value": "1.0"
            },
            {
                "objectTypeId": "0-1",
                "name": "mp_app_feedback_contact_consent",
                "value": "true" // OR false
            },
        ],
        "context": {
            /** TODO - requires HubSpot tracking code to be installed */
            // "hutk": ':hutk', // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission more details at https://community.hubspot.com/t5/APIs-Integrations/How-to-get-the-values-of-hubspotutk-from-using-hubspot-forms/m-p/280804
            "pageUri": "http://localhost:3000/",
            "pageName": "locahost"
        },
        /** TODO Include this object when GDPR options are enabled */
        // "legalConsentOptions": { 
        //     "consent": {
        //         "consentToProcess": true,
        //         "text": "I agree to allow Manpower to store and process my personal data.",
        //         "communications": [
        //             {
        //                 "value": true,
        //                 "subscriptionTypeId": 999,
        //                 "text": "I agree to receive marketing communications from Manpower."
        //             }
        //         ]
        //     }
        // }
    }

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(submitForm, data, { headers });
        console.log(res);
        res.json(data);
    } catch (err) {
        console.error(err);
    }

});


app.listen(3000, () => console.log('Listening on http://localhost:3000'));
