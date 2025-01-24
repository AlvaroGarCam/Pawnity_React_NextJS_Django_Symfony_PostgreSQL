import { djangoAPI_E } from "../../api";
import { Category } from "@/types/Category";

export const fetchCategories = async (): Promise<Category[]> => {
    try {
        const response = await djangoAPI_E.get("/categories/");
        return response.data as Category[];
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Failed to fetch categories.");
    }
};
