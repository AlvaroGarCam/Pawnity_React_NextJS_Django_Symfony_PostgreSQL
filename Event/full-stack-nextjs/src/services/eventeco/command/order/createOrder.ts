import { djangoAPI_E, symfonyAPI_E } from "@/services/api";
import Cookies from "js-cookie";

export const createOrder = async (orderData: any) => {
    try {
        const accesstoken = Cookies.get("accesstoken");
        if (!accesstoken) throw new Error("No access token available");

        const headers = { Authorization: `Bearer ${accesstoken}` };

        const response = await djangoAPI_E.post("/order/create/", orderData, { headers });

        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error("Failed to create order.");
    }
};
