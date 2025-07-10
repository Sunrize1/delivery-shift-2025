export interface PointsResponse {
    success: boolean;
    reason: string;
    points: Point[];
}

export interface Point {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
}