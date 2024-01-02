"use strict";

// Mandatory parameters to check - firstName, userName, emailId, & password
const validateNewUserPayload = (payload) => {
    const response = {
        resType: 'REQUEST_OK',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    const mandatoryParameters = ['firstName', 'userName', 'emailId', 'password']

    if (!payload.firstName || !payload.userName || !payload.emailId || !payload.password) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Required parameter is missing';
        response.isValid = false;

        for (const param of mandatoryParameters) {
            if (!payload[param]) {
                response.resMsg += `: ${param}`;
            }
        }
    }

    return response;
};

export {
    validateNewUserPayload
};
