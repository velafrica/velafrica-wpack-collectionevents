import React from 'react';
import { useState, useEffect } from 'react';
import CollectionEventService from '../services/collectionEventService';

const LOADING_STR = 'Sammelanlässe werden geladen...';
const ERROR_STR = 'Fehler beim Laden der Sammelanlässe';
const EMPTY_STR = 'Aktuell sind keine Sammelanlässe geplant.';


const CollectionEventWidget = (props) => {

    const [events, setEvents] = useState(undefined);
    const [error, setError] = useState(undefined);

    const getLocalDateStringFromDate = (date) => {
        return ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear()
    }

    const getOrganiserFragment = (collectionEvent) => {
        if (collectionEvent.website) {
            return <a href={collectionEvent.website} target="_blank">
                {collectionEvent.event.host}
            </a>
        }
        return <>{collectionEvent.event.host}</>;
    }

    useEffect(() => {
        async function getEvents() {
            if (events) return; // don't re-fetch

            const service = new CollectionEventService();
            const eventsResult = await service.getCollectionEvents(true);

            if (eventsResult) {
                setEvents(eventsResult);
            } else {
                setError(true);
            }
        }
        getEvents();
    }, [events]); // Run once

        return <div>
            {!events && !error && <>{LOADING_STR}</> }
            {error && <>{ERROR_STR}</> }
            {events && !error &&
            <table>
                <thead>
                    <tr>
                        <th>Wann</th>
                        <th>Wo</th>
                        <th>Standort</th>
                        <th>Veranstalter*in & Infos</th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.length === 0 && <tr><td colSpan="4">{EMPTY_STR}</td></tr>}
                    {events && events.length > 0 && events.map((e) => {
                        const eventDate = new Date(e.date_start)
                        return <tr>
                            <td>{getLocalDateStringFromDate(eventDate)}</td>
                            <td>{e.event.address?.city}</td>
                            <td>{e.event.address_notes}</td>
                            <td>{getOrganiserFragment(e)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            }
        </div>
}

export default CollectionEventWidget;