import { api } from "../instance";
import { PointsResponse } from "@/types/delivery/PointsResponse";

export const getPoints = async () => {
    return api.get<PointsResponse>("delivery/points");
};