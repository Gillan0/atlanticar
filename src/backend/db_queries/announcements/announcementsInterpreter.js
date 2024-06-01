// All imports needed for creation of interpreter

const { cancelConductor } = require('./cancelConductor.js');
const { cancelPassenger } = require('./cancelPassenger.js');
const { deleteOffer } = require('./deleteOffer.js');
const { deleteRequest } = require('./deleteRequest.js');
const { getAnnouncementsOffers } = require('./getAnnouncementsOffers.js');
const { getAnnouncementsRequests } = require('./getAnnouncementsRequests.js');
const { getDefaultOffers } = require('./getDefaultOffers.js');
const { getDefaultRequests } = require('./getDefaultRequests.js');
const { getFilterOffers } = require('./getFilterOffers.js');
const { getFilterRequests } = require('./getFilterRequests.js');
const { modifyOffer } = require('./modifyOffer.js');
const { modifyRequest } = require('./modifyRequest.js');
const { uploadOffer } = require('./uploadOffer.js');
const { uploadRequest } = require('./uploadRequest.js');

// Links commands to functions
const announcementsInterpreter = {
    "cancel_conductor" : cancelConductor,
    "cancel_passenger" : cancelPassenger,
    "delete_offer" : deleteOffer,
    "delete_request" : deleteRequest,
    "get_announcements_offers" : getAnnouncementsOffers,
    "get_announcements_requests" : getAnnouncementsRequests,
    "get_default_offers" : getDefaultOffers,
    "get_default_requests" : getDefaultRequests,
    "get_filter_offers" : getFilterOffers,
    "get_filter_requests" : getFilterRequests,
    "modify_offer" : modifyOffer,
    "modify_request" : modifyRequest,
    "upload_offer" : uploadOffer,
    "upload_request" : uploadRequest
}

exports.announcementsInterpreter = announcementsInterpreter