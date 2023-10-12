/*
 * Example call using the formv3 endpoint: 
 * https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication
 */

module.exports.postForm = function () {

    // Create the new request 
    var xhr = new XMLHttpRequest();
    var url = `https://api.hsforms.com/submissions/v3/integration/secure/submit/${PORTAL_ID}/${FORM_ID}`
    
    // Example request JSON:
    var data = {
      "submittedAt": "1517927174000",
      "fields": [
        {
          "objectTypeId": "0-1",
          "name": "email",
          "value": "example@example.com"
        },
        {
          "objectTypeId": "0-1",
          "name": "firstname",
          "value": "First"
        },
        {
            "objectTypeId": "0-1",
            "name": "lastname",
            "value": "Last"
        },
        {
            "objectTypeId": "0-1",
            "name": "mp_app_feedback_topics",
            "value": "other"
        },
        {
            "objectTypeId": "0-1",
            "name": "mp_app_feedback_description",
            "value": "Manpower App Feedback Description"
        },
      ],
      "context": {
        "hutk": ':hutk', // include this parameter and set it to the hubspotutk cookie value to enable cookie tracking on your submission
        "pageUri": "www.example.com/page",
        "pageName": "Manpower Feedback App"
      },
      "legalConsentOptions":{ // Include this object when GDPR options are enabled
        "consent":{
          "consentToProcess":true,
          "text":"I agree to allow Manpower to store and process my personal data.",
          "communications":[
            {
              "value":true,
              "subscriptionTypeId":999,
              "text":"I agree to receive marketing communications from Manpower."
            }
          ]
        }
      }
    }

    var final_data = JSON.stringify(data)

    xhr.open('POST', url);

    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    // Sets the value of the 'Content-Type' HTTP request headers to 'application/json'
    xhr.setRequestHeader(headers);


    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) { 
            alert(xhr.responseText); // Returns a 200 response if the submission is successful.
        } else if (xhr.readyState == 4 && xhr.status == 400){ 
            alert(xhr.responseText); // Returns a 400 error the submission is rejected.          
        } else if (xhr.readyState == 4 && xhr.status == 403){ 
            alert(xhr.responseText); // Returns a 403 error if the portal isn't allowed to post submissions.           
        } else if (xhr.readyState == 4 && xhr.status == 404){ 
            alert(xhr.responseText); //Returns a 404 error if the formGuid isn't found     
        }
       }


    // Sends the request 
    xhr.send(final_data)

};

