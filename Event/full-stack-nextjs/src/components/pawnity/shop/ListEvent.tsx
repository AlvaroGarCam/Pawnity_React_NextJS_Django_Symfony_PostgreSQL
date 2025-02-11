"use client";

import React from "react";
import styles from "@/styles/pawnity/Shop.module.css";
import { Button } from "@/utils/PrimeReactComponents";
import { Event } from "@/types/Event";

interface ListEventsProps {
    events: Event[];
}

const ListEvents: React.FC<ListEventsProps> = ({ events }) => {
    return (
        <section className={styles.ShopSection}>
            <h2>Descubre nuestros Eventos</h2>
            {events.length === 0 ? (
                <h1 className={styles.noEvents}>No hay eventos disponibles por el momento</h1>
            ) : (
                <div className={styles.eventgrid}>
                    {events.map((event: Event) => (
                        <div key={event.idevent} className={styles.eventcard}>
                            <img src={event.urlposter} alt={event.name} className={styles.eventimage} />
                            <div className={styles.eventdetails}>
                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                                <p>
                                    <i className="pi pi-calendar"></i> {new Date(event.startdate).toLocaleDateString("es-ES")}
                                </p>
                                <p>
                                    <i className="pi pi-map-marker"></i> {event.location}
                                </p>
                            </div>
                            <Button
                                label="Ver más"
                                onClick={() => (window.location.href = `/pawnity/shop/event/${event.eventslug}`)}
                                className={`p-button-info ${styles.eventbutton}`}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ListEvents;
