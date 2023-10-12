const hubspot = require('@hubspot/api-client'); //https://www.npmjs.com/package/@hubspot/api-client

module.exports.getPropertyByName = async () => {
  
  const hubspotClient = new hubspot.Client({ "accessToken": PRIVATE_APP_ACCESS });

  const objectType = "contacts"; // https://developers.hubspot.com/docs/api/crm/contacts
  const propertyName = "mp_app_feedback_topics"; // https://developers.hubspot.com/docs/api/crm/properties
  const archived = false;

  try {
    const apiResponse = await hubspotClient.crm.properties.coreApi.getByName(objectType, propertyName, archived);
    console.log(JSON.stringify(apiResponse.body, null, 2));
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }

};