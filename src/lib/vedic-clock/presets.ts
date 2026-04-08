export interface VedicClockPresetCity {
    id: string;
    name: string;
    region: string;
    latitude: number;
    longitude: number;
    timezone: string;
}

export const vedicClockPresetCities: VedicClockPresetCity[] = [
    {
        id: "varanasi",
        name: "Varanasi",
        region: "India",
        latitude: 25.3176,
        longitude: 82.9739,
        timezone: "Asia/Kolkata",
    },
    {
        id: "delhi",
        name: "Delhi",
        region: "India",
        latitude: 28.6139,
        longitude: 77.209,
        timezone: "Asia/Kolkata",
    },
    {
        id: "mumbai",
        name: "Mumbai",
        region: "India",
        latitude: 19.076,
        longitude: 72.8777,
        timezone: "Asia/Kolkata",
    },
    {
        id: "bengaluru",
        name: "Bengaluru",
        region: "India",
        latitude: 12.9716,
        longitude: 77.5946,
        timezone: "Asia/Kolkata",
    },
    {
        id: "new-york",
        name: "New York City",
        region: "United States",
        latitude: 40.7128,
        longitude: -74.006,
        timezone: "America/New_York",
    },
];

export function getPresetCityById(id: string) {
    return vedicClockPresetCities.find((city) => city.id === id);
}
