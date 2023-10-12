# Manpower Feedback API

API code integrating feedback from Manpower app with CRM data in HubSpot.

## Initial Setup Steps

1. Create Private App with required Scope (These credentials provide API access to your HubSpot account. Keep them safe and secure.)
2. Create Custom Properties
3. Create HubSpot form (All form fields must match App exactly)

NOTE: Each HubSpot account (by country) requires unique environment variables for Private Access Token, Portal ID, and Form ID.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```


## Usage

Use [nodemon](https://www.npmjs.com/package/nodemon) to run app on localhost

```bash
nodemon
```


## API Details

### [GET Property Details](https://developers.hubspot.com/docs/api/crm/properties)
1. API Get Property by Name (for getting details for the dropdown i.e. feedback topics )
    mp_app_feedback_topics (dropdown select)
    - bug
    - feature
    - other
    

### [POST Form Data](https://legacydocs.hubspot.com/docs/methods/forms/submit_form_v3_authentication)
1. API POST Submit Form Data (feedback details entered by the user)


## HubSpot Default Properties
    firstname (single-line text)
    lastname (single-line text)
    email (single-line text) >> mp_feedback_anonymously@manpowergroup.com IF anon
    country (dropdown select)

## Custom Properties
    mp_app_feedback_topics (dropdown select)
    mp_app_feedback_description (multi-line text)

## Custom Properties (Meta)
    mp_app_feedback_device_name (single-line text)
    mp_app_feedback_device_os (single-line text)
    mp_app_feedback_device_os_version (single-line text)
    mp_app_feedback_app_version (single-line text)
    mp_app_feedback_contact_consent (single checkbox)
# HubSpot-Forms-API
