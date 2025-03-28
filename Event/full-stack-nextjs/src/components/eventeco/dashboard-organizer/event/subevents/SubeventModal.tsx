"use client";

import React, { useEffect, useState } from "react";
import { InputText, InputTextarea, Calendar, Dialog, Button, Toast, ColorPicker } from "@/utils/PrimeReactComponents";
import { useCreateSubevent, useUpdateSubevent, useToggleSubevent } from "@/hooks/eventeco/useSubevents";
import { subeventCalendar } from "@/types/SubeventCalendar";
import styles from "@/styles/eventeco/Organizer/DashboardSubevent.module.css";

// #region SubeventModal
const SubeventModal = ({
    visible,
    onHide,
    subevent,
    idevent,
    refetch,
    selectedRange,
}: {
    visible: boolean;
    onHide: () => void;
    subevent?: subeventCalendar | null;
    idevent: number;
    refetch: () => void;
    selectedRange?: { start: string; end: string };
}) => {
    const createSubevent = useCreateSubevent();
    const updateSubevent = useUpdateSubevent();
    const toggleSubevent = useToggleSubevent();
    const toast = React.useRef<Toast>(null);

    const [subeventData, setSubeventData] = useState({
        idsubevents: subevent?.data.idsubevents || 0,
        name: subevent?.text || "",
        description: subevent?.data.description || "",
        start: subevent?.start || selectedRange?.start || "",
        end: subevent?.end || selectedRange?.end || "",
        urlposter: subevent?.barColor || "#000000",
    });

    useEffect(() => {
        setSubeventData({
            idsubevents: subevent?.data.idsubevents || 0,
            name: subevent?.text || "",
            description: subevent?.data.description || "",
            start: subevent?.start || selectedRange?.start || "",
            end: subevent?.end || selectedRange?.end || "",
            urlposter: subevent?.barColor?.substring(1) || "000000",
        });
    }, [subevent, selectedRange]);

    const handleChange = (field: keyof typeof subeventData, value: any) => {
        setSubeventData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        const idsubevents = subevent?.data.idsubevents || 0;
        if (!subeventData.name || !subeventData.start || !subeventData.end || !subeventData.description || !subeventData.urlposter) {
            toast.current?.show({
                severity: "warn",
                summary: "Atención",
                detail: "Todos los campos son obligatorios",
                life: 3000,
            });
            return;
        }

        if (subevent) {
            updateSubevent.mutate(
                {
                    idsubevents,
                    subeventData: {
                        name: subeventData.name,
                        startDate: subeventData.start,
                        endDate: subeventData.end,
                        description: subeventData.description,
                        status: "Confirmed",
                        urlPoster: `#${subeventData.urlposter}`,
                    },
                },
                {
                    onSuccess: () => {
                        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Actividad actualizada correctamente", life: 3000 });
                        refetch();
                        onHide();
                    },
                    onError: () => {
                        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo actualizar la Actividad", life: 3000 });
                    },
                }
            );
        } else {
            createSubevent.mutate(
                {
                    idevent,
                    subeventData: {
                        name: subeventData.name,
                        startDate: subeventData.start,
                        endDate: subeventData.end,
                        description: subeventData.description,
                        status: "Confirmed",
                        urlPoster: `#${subeventData.urlposter}`,
                    },
                },
                {
                    onSuccess: () => {
                        toast.current?.show({ severity: "success", summary: "Éxito", detail: "Actividad creada correctamente", life: 3000 });
                        refetch();
                        onHide();
                    },
                    onError: () => {
                        toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo crear la actividad", life: 3000 });
                    },
                }
            );
        }
    };

    const handleToggle = () => {
        if (!subevent) return;

        toggleSubevent.mutate(
            { idsubevents: subevent.id },
            {
                onSuccess: () => {
                    toast.current?.show({ severity: "success", summary: "Éxito", detail: "Actividad desactivada correctamente", life: 3000 });
                    refetch();
                    onHide();
                },
                onError: () => {
                    toast.current?.show({ severity: "error", summary: "Error", detail: "No se pudo desactivar la actividad", life: 3000 });
                },
            }
        );
    };

    // #region return
    return (
        <Dialog visible={visible} onHide={onHide} header={subevent ? "Editar Actividad" : "Crear Actividad"} modal className={styles.modal}>
            <Toast ref={toast} />
            <div className={styles.form}>
                <label>Nombre</label>
                <InputText value={subeventData.name} onChange={(e) => handleChange("name", e.target.value)} />

                <label>Descripción</label>
                <InputTextarea value={subeventData.description} rows={3} onChange={(e) => handleChange("description", e.target.value)} />

                <label>Fecha y Hora de Inicio</label>
                <Calendar
                    value={new Date(subeventData.start)}
                    onChange={(e) => handleChange("start", e.value?.toISOString() || "")}
                    showTime
                    hourFormat="24"
                />

                <label>Fecha y Hora de Fin</label>
                <Calendar
                    value={new Date(subeventData.end)}
                    onChange={(e) => handleChange("end", e.value?.toISOString() || "")}
                    showTime
                    hourFormat="24"
                />

                <label>Color</label>
                <div className="p-d-flex p-jc-between">
                    <ColorPicker
                        value={subeventData?.urlposter}
                        onChange={(e) => handleChange("urlposter", e.value)}
                        style={{ marginRight: "20px" }}
                    />
                    <span>{`#${subeventData.urlposter}`}</span>
                </div>

                <div className={`p-d-flex p-jc-between ${styles.actions}`}>
                    {subevent && <Button label="Desactivar" className="p-button-danger" onClick={handleToggle} />}
                    <Button label="Guardar" className="p-button-primary" onClick={handleSubmit} />
                    <Button label="Cancelar" className="p-button-secondary" onClick={onHide} />
                </div>
            </div>
        </Dialog>
    );
};

export default SubeventModal;
