import { djangoAPI_P, symfonyAPI_P } from "@/services/api";
import { Client, Organizer, Admin } from "@/types/User";
import { RegisterData } from "@/types/Auth";

export const registerClientService = async (data: RegisterData): Promise<Client> => {
    try {
        const response = await djangoAPI_P.post("/client/auth/register", data);
        return response.data as Client;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Failed to register. Please try again.");
    }
};

export const registerOrganizerService = async (data: RegisterData): Promise<Organizer> => {
    try {
        const response = await symfonyAPI_P.post("/organizer/register", data);
        return response.data as Organizer;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Failed to register. Please try again.");
    }
};

export const registerAdminService = async (data: RegisterData): Promise<Admin> => {
    try {
        const response = await symfonyAPI_P.post("/admin/register", data);
        return response.data as Admin;
    } catch (error) {
        console.error("Error during registration:", error);
        throw new Error("Failed to register. Please try again.");
    }
};
