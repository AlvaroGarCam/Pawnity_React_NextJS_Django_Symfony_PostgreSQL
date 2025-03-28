import { Organizer } from "@/types/Organizer";

export interface Pet {
    idpet: number;
    uuid: string;
    name: string;
    birthdate: string;
    breed: string;
    gender: string;
    description: string;
    species: string;
    image: string;
    idorg: number;
    organizer: Organizer;
    status: string;
    createdat: string;
    updatedat: string;
}
