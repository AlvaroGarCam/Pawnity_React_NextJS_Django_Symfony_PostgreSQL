"use client";

import React from "react";
import { Event } from "@/types/Event";
import { Subevent } from "@/types/Subevent";
import PawnityLayout from "@/layouts/pawnity/PawnityLayout";
import { EventSkeleton } from "@/components/pawnity/skeletons/EventSkeleton";
import styles from "@/styles/pawnity/EventDetails.module.css";

const PawnityDetailsClient = ({ event }: { event: Event }) => {
    if (!event) return <EventSkeleton />;

    return (
        <PawnityLayout>
            <div className={styles.eventDetailsContainer}>
                <img src={event.urlposter} alt={event.name} className={styles.eventImage} />
                <div className={styles.eventInfo}>
                    <h1>{event.name}</h1>
                    <p className={styles.eventDate}>
                        {event.startdate} - {event.enddate}
                    </p>
                    <p className={styles.eventLocation}>{event.location}</p>
                    <p className={styles.eventDescription}>{event.description}</p>
                    <div className={styles.organizerInfo}>
                        <h3>Podrás disfrutar de eventos como:</h3>
                        {event.subevents && event.subevents.length > 0 ? (
                            <ul>
                                {event.subevents.map((subevent: Subevent) => (
                                    <li key={subevent.idsubevents}>{subevent.name}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay subeventos disponibles.</p>
                        )}
                    </div>
                </div>
            </div>
        </PawnityLayout>
    );
};

export default PawnityDetailsClient;
