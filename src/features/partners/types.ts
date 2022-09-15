export interface Partner {
    latitude: string;
    partner_id: number;
    name: string;
    longitude: string;
}

export type Coordinates = Pick<Partner, 'latitude' | 'longitude'>

export interface ProximityPartner extends Partner {
    proximity: number;
}

