// Util for geo related pure helper functions

import { RADIUS_OF_EARTH_IN_KM } from "../constants";


export const toRadian = (angle: number) => (Math.PI / 180) * angle;

export const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);

// Havershine Formula
export const getDistanceBetweenTwoCords = ([lat1, lon1]: number[], [lat2, lon2]: number[]) => {
    const dLat = distance(lat2, lat1);
    const dLon = distance(lon2, lon1);

    lat1 = toRadian(lat1);
    lat2 = toRadian(lat2);

    const a =
        Math.pow(Math.sin(dLat / 2), 2) +
        Math.pow(Math.sin(dLon / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.asin(Math.sqrt(a));

    let finalDistance = RADIUS_OF_EARTH_IN_KM * c;

    return finalDistance;
};

