export interface PackagesTypesResponse {
    success: boolean;
    reason: string;
    packages: Package[];
}

export interface Package {
    id: string;
    name: string;
    length: string;
    width: string;
    weight: string;
    height: string;
}