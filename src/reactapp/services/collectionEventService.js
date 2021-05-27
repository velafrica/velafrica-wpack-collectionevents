import axios from 'axios';

// Constants
const API_URL = 'https://velafrica-admin.herokuapp.com/api/public/collectionevents/';
const EVENT_ID_QUERY_PARAM = 'eID';

const EVENT_LIST_VIEW_ID = 'event_list_new';
const EVENT_LIST_AGENDA_ID = 'body-agenda-list';
const EVENT_LIST_EMPTY_MESSAGE = 'Aktuell sind keine Events geplant!';

const DETAIL_VIEW_ID = 'detail_view';
const DETAIL_VIEW_TITLE_ID = 'detail_title';
const DETAIL_VIEW_DESCRIPTION_ID = 'detail_desc';
const DETAIL_VIEW_DATE_ID = 'detail_date';
const DETAIL_VIEW_ADDRESS_ID = 'detail_address';
const DETAIL_VIEW_WEBSITE_INFO_ID = 'infosWebsite';

class CollectionEventService {

    buildApiUrl(onlyShowFutureEvents = true, resultLimit = 999) {
        let apiUrl = API_URL;
        if (resultLimit) {
            apiUrl += '?limit=' + resultLimit;
        }
        if (onlyShowFutureEvents) {
            apiUrl += '&date_start__gte=' + this.getCurrentDateISOString();
        }
        return apiUrl;
    }

    async getCollectionEvents(onlyShowFutureEvents = true) {
        try {
            const apiUrl = this.buildApiUrl(onlyShowFutureEvents);
            const response = await axios.get(apiUrl);
            console.log('response', response);
            return response.data.results;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    /* Helper functions */

    getLocalDateStringFromDate(date) {
        return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
    }

    getCurrentDateISOString() {
        const d = new Date();
        return d.toISOString().split("T")[0];
    }


    // ---- LEGACY Code below

    // Functions
    // getEventIdFromUrl() {
    //     const url = new URL(window.location);
    //     return url.searchParams.get(EVENT_ID_QUERY_PARAM);
    // }

    // getJsonFromUrl(url, callback) {
    //     const xhr = new XMLHttpRequest();
    //     xhr.open('GET', url, true);
    //     xhr.responseType = 'json';
    //     xhr.onload = function () {
    //         const status = xhr.status;

    //         if (status === 200) {
    //             callback(null, xhr.response);
    //         } else {
    //             callback(status, xhr.response);
    //         }
    //     };
    //     xhr.send();
    // };

    // showDetailView() {
    //     document.getElementById(DETAIL_VIEW_ID).style.display = "block";
    //     document.getElementById(EVENT_LIST_VIEW_ID).style.display = "none";
    // }

    // showListView() {
    //     document.getElementById(DETAIL_VIEW_ID).style.display = "none";
    //     document.getElementById(EVENT_LIST_VIEW_ID).style.display = "block";
    // }

    // getCollectionEventDetailLink(collectionId) {
    //     return window.location.pathname + '?eID=' + collectionId;
    // }

    // getCollectionEventRowHTML(date_start, collectionId, eventTitle, eventCity) {
    //     //extra html you want to store.
    //     const eventDetailLink = this.getCollectionEventDetailLink(collectionId);
    //     let element = '<tr><td width="20%" align="left" valign="top" nowrap="nowrap">' + date_start + '</td>';
    //     const h = 'hr';
    //     const href = h + 'ef="' + window.location.origin + eventDetailLink + '"';
    //     element += '<td width="40%" valign="top"><a ' + href + '>' + eventTitle + '</a></td>';
    //     element += '<td width="40%" valign="top">' + eventCity + '</td></tr>';
    //     return element;
    // }



    // addListViewEntry(eventDateLocalString, collectionEvent) {
    //     // view needs to be display to be manipulated
    //     this.showListView();
    //     const city = !!collectionEvent.event.address ? collectionEvent.event.address.city : "";

    //     const newRow = this.getCollectionEventRowHTML(eventDateLocalString, collectionEvent.id, collectionEvent.event.name, city);
    //     document.getElementById(EVENT_LIST_AGENDA_ID).insertAdjacentHTML('beforeend', newRow);
    // }

    // parseAddress(collectionEvent) {
    //     return collectionEvent.city;
    // }

    // buildDetailView(eventDateLocalString, collectionEvent) {
    //     // view needs to be display to be manipulated
    //     this.showDetailView();

    //     // parse title, description, date
    //     document.getElementById(DETAIL_VIEW_TITLE_ID).innerHTML = collectionEvent.event.name;
    //     document.getElementById(DETAIL_VIEW_DESCRIPTION_ID).innerHTML = collectionEvent.event.description;
    //     document.getElementById(DETAIL_VIEW_DATE_ID).innerHTML = eventDateLocalString + ' | ' + collectionEvent.time;

    //     // parse address
    //     let address = '<br /><br />';
    //     if (!!collectionEvent.event.address) {
    //         address = collectionEvent.event.address_notes + '<br />' + collectionEvent.event.address.street + '<br />' + collectionEvent.event.address.zipcode + ' ' + city + '<br /><br />';
    //     }
    //     document.getElementById(DETAIL_VIEW_ADDRESS_ID).innerHTML = address;

    //     // parse website
    //     let website = '-';
    //     if (collectionEvent.website.length > 0) {
    //         website = collectionEvent.website;
    //         const test = 'hr';
    //         const test2 = test + 'ef="' + website + '"';
    //         document.getElementById(DETAIL_VIEW_WEBSITE_INFO_ID).innerHTML = '<a ' + test2 + ' target="_blank">' + collectionEvent.event.name + '</a>';
    //     } else {
    //         document.getElementById(DETAIL_VIEW_WEBSITE_INFO_ID).innerHTML = website;
    //     }
    // }

    // handleHttpResponse(err, data) {
    //     console.log('handleHttpResponse');
    //     if (err !== null) {
    //         console.log('Something went wrong: ' + err);
    //         return;
    //     }
    //     if (data.count == 0) {
    //         document.getElementById(EVENT_LIST_AGENDA_ID).insertAdjacentHTML('beforeend', '<tr><td colspan="3"><i>' + EVENT_LIST_EMPTY_MESSAGE + '</i></td></tr>');
    //         document.getElementById(EVENT_LIST_VIEW_ID).style.display = "block";
    //         return;
    //     }
    //     const detailEventId = this.getEventIdFromUrl();

    //     for (const collectionEvent of data.results) {
    //         const eventDate = new Date(collectionEvent.date_start);
    //         const eventDateLocalString = this.getLocalDateStringFromDate(eventDate);


    //         // add event to list view
    //         this.addListViewEntry(eventDateLocalString, collectionEvent);

    //         // build detail view
    //         if (collectionEvent.id == detailEventId) {
    //             this.buildDetailView(eventDateLocalString, collectionEvent);
    //         }
    //     }

    //     // always show detail view, if detailEventId is set
    //     if (detailEventId !== null) {
    //         this.showDetailView();
    //     }

    // };

    // fetchCollectionEvents(callback = this.handleHttpResponse, onlyShowFutureEvents = true, resultLimit = 999) {
    //     let apiUrl = API_URL;
    //     if (resultLimit) {
    //         apiUrl += '?limit=' + resultLimit;
    //     }
    //     if (onlyShowFutureEvents) {
    //         apiUrl += '&date_start__gte=' + this.getCurrentDateISOString();
    //     }
    //     this.getJsonFromUrl(apiUrl, callback);
    // }


    // main
    // fetchCollectionEvents(false);
}

export default CollectionEventService;