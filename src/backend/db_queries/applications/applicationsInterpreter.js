// All imports necessary for creation of interpreter

const { acceptApplicationOffer } = require('./acceptApplicationOffer.js');
const { acceptApplicationRequest } = require('./acceptApplicationRequest.js');
const { applyToOffer } = require('./applyToOffer.js');
const { applyToRequest } = require('./applyToRequest.js');
const { deleteConfirmedApplicationOffer } = require('./deleteConfirmedApplicationOffer.js');
const { deleteConfirmedApplicationRequest } = require('./deleteConfirmedApplicationRequest.js');
const { deletePendingApplicationOffer } = require('./deletePendingApplicationOffer.js');
const { deletePendingApplicationRequest } = require('./deletePendingApplicationRequest.js');
const { getApplicationsOffers } = require('./getApplicationsOffers.js');
const { getApplicationsRequests } = require('./getApplicationsRequests.js');
const { refuseApplicationOffer } = require('./refuseApplicationOffer.js');
const { refuseApplicationRequest } = require('./refuseApplicationRequest.js');

// Links commands to functions
const applicationsInterpreter = {
    "accept_application_offer" : acceptApplicationOffer,
    "accept_application_request" : acceptApplicationRequest,
    "apply_to_offer" : applyToOffer,
    "apply_to_request" : applyToRequest,
    "delete_pending_application_offer" : deletePendingApplicationOffer,
    "delete_confirmed_application_offer" : deleteConfirmedApplicationOffer,
    "delete_pending_application_request" : deletePendingApplicationRequest,
    "delete_confirmed_application_request" : deleteConfirmedApplicationRequest,
    "get_applications_offers" : getApplicationsOffers,
    "get_applications_requests" : getApplicationsRequests,
    "refuse_application_offer" : refuseApplicationOffer,
    "refuse_application_request" : refuseApplicationRequest,
}

exports.applicationsInterpreter = applicationsInterpreter;