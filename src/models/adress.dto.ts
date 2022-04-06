import { CityDTO } from "./city.dto";

export interface AdressDTO{
    id: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    postalCode: string;
    city: CityDTO;

}