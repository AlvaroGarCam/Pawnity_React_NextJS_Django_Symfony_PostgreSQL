import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import Cookies from "js-cookie";
import { Ticket } from "@/types/Ticket";

export const updateTicket = async ({ idTicketInfo, ticketData }: { idTicketInfo: number; ticketData: Partial<Ticket> }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.put(`/organizer/ticketinfo/${idTicketInfo}`, ticketData, { headers });
        return response.data;
    } catch (error) {
        console.error("Error updating ticket:", error);
        throw new Error("Failed to update ticket.");
    }
};

export const toggleTicket = async ({ idTicketInfo, ticketData }: { idTicketInfo: number; ticketData: Partial<Ticket> }) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await symfonyAPI_P.post(`/organizer/ticketinfo/${idTicketInfo}`, {}, { headers });
        return response.data;
    } catch (error) {
        console.error("Error toggling ticket:", error);
        throw new Error("Failed to toggle ticket.");
    }
};
