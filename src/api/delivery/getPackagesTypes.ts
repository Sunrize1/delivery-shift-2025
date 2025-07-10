import { PackagesTypesResponse } from "@/types/delivery/PackagesTypesResponse";
import { api } from "../instance";

export const getPackagesTypes = async () => {
    return api.get<PackagesTypesResponse>("delivery/package/types");
};
