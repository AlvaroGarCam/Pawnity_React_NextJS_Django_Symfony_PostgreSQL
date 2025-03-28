import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTickets } from "@/services/pawnity/queries/getTickets";
import { createTicket } from "@/services/pawnity/command/tickets/createTicket";
import { updateTicket, toggleTicket, nominateTicket } from "@/services/pawnity/command/tickets/updateTicket";
import { Ticket } from "@/types/Ticket";

export const useTickets = (eventSlug: string) => {
    return useQuery<Ticket[]>({
        queryKey: ["tickets", eventSlug],
        queryFn: () => getTickets(eventSlug),
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation<string, Error, { eventSlug: string; ticketData: Partial<Ticket> }>({
        mutationFn: async ({ eventSlug, ticketData }: { eventSlug: string; ticketData: Partial<Ticket> }) => {
            await createTicket({ eventSlug, ticketData });
            return eventSlug;
        },
        onSuccess: (eventSlug) => {
            queryClient.invalidateQueries({ queryKey: ["tickets", eventSlug] });
        },
    });
};

export const useUpdateTicket = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { idTicketInfo: number; ticketData: Partial<Ticket> }>({
        mutationFn: async ({ idTicketInfo, ticketData }: { idTicketInfo: number; ticketData: Partial<Ticket> }) => {
            await updateTicket({ idTicketInfo, ticketData });
            return idTicketInfo;
        },
        onSuccess: (idTicketInfo, { ticketData }) => {
            queryClient.invalidateQueries({ queryKey: ["tickets", ticketData.eventSlug] });
        },
    });
};

export const useToggleTicket = () => {
    const queryClient = useQueryClient();

    return useMutation<number, Error, { idTicketInfo: number; ticketData: Partial<Ticket> }>({
        mutationFn: async ({ idTicketInfo, ticketData }: { idTicketInfo: number; ticketData: Partial<Ticket> }) => {
            await toggleTicket({ idTicketInfo, ticketData });
            return idTicketInfo;
        },
        onSuccess: (idTicketInfo: number, { ticketData }: { ticketData: Partial<Ticket> }) => {
            queryClient.invalidateQueries({ queryKey: ["tickets", ticketData.eventSlug] });
        },
    });
};

export const useNominateTickets = () => {
    const queryClient = useQueryClient();

    return useMutation<any, Error, { ticketunitid: number; nameassistant: string; dniassistant: string }>({
        mutationFn: async ({ ticketunitid, nameassistant, dniassistant }: { ticketunitid: number; nameassistant: string; dniassistant: string }) => {
            const response = await nominateTicket({ ticketunitid, nameassistant, dniassistant });
            return response;
        },
        onSuccess: (ticketunitid) => {
            queryClient.invalidateQueries({ queryKey: ["tickets", ticketunitid] });
        },
    });
};
