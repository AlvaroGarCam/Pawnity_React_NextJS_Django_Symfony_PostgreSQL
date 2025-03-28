"use client";

import React, { useState } from "react";
import { useEventDetails } from "@/hooks/eventeco/useEvents";
import EventForm from "./EventForm";
import styles from "@/styles/eventeco/Organizer/DashboardEvent.module.css";
import TicketList from "./tickets/TicketList";
import ComplementList from "./complements/ComplementList";
import SubeventModule from "./subevents/SubeventModule";

const EventView = ({
    eventslug,
    newEventName,
    setNewEventName,
    onEventUpdated,
}: {
    eventslug: string;
    newEventName: string;
    setNewEventName: (name: string) => void;
    onEventUpdated: () => void;
}) => {
    const { data: event, isLoading, isError } = eventslug ? useEventDetails(eventslug) : { data: null, isLoading: false, isError: false };
    const [activeTab, setActiveTab] = useState<"settings" | "subevents" | "tickets" | "complements">("settings");

    return (
        <div className={styles.container}>
            <h2>{`Gestión del Evento ${newEventName}` || (event ? `Gestión del Evento ${event.name}` : "Crear Nuevo Evento")}</h2>
            <nav className={styles.tabs}>
                <button className={activeTab === "settings" ? styles.active : ""} onClick={() => setActiveTab("settings")}>
                    Configuración
                </button>
                <button className={activeTab === "subevents" ? styles.active : ""} onClick={() => setActiveTab("subevents")}>
                    Actividades
                </button>
                <button className={activeTab === "tickets" ? styles.active : ""} onClick={() => setActiveTab("tickets")}>
                    Tickets
                </button>
                <button className={activeTab === "complements" ? styles.active : ""} onClick={() => setActiveTab("complements")}>
                    Complementos
                </button>
            </nav>
            <div className={styles.content}>
                {activeTab === "settings" && (
                    <EventForm key={eventslug || "null"} event={event} setNewEventName={setNewEventName} onEventUpdated={onEventUpdated} />
                )}
                {activeTab === "subevents" && event && <SubeventModule key={eventslug || "null"} event={event} />}
                {activeTab === "tickets" && event?.eventslug && <TicketList key={eventslug || "null"} eventSlug={event.eventslug} />}
                {activeTab === "complements" && event?.eventslug && <ComplementList key={eventslug || "null"} eventSlug={event.eventslug} />}
            </div>
        </div>
    );
};

export default EventView;
