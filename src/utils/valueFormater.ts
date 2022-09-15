// Util for formating a given quantiry and type of value and return a proper string for rendering

export const getDistanceInKm = (distance: number) => {
    return `${Math.round(distance * 1000) / 1000}km`;
}