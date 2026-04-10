"use client";

import { MapPin, Navigation } from "lucide-react";
import { vedicClockPresetCities } from "@/lib/vedic-clock";
import { Button } from "@/components/ui/button";

interface CitySelectorProps {
    cityId?: string;
    cityName?: string;
    onCityChange: (cityId: string) => void;
    onUseMyLocation: () => void;
    disabled?: boolean;
}

export const PANCHANG_CITY_STORAGE_KEY = "sadhaka:panchang:city-id";

export function CitySelector({ cityId, cityName, onCityChange, onUseMyLocation, disabled = false }: CitySelectorProps) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-orange-400" />
                <span>Showing timings for</span>
                <span className="font-medium text-foreground">{cityName ?? "your selected city"}</span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <select
                    aria-label="Select city"
                    className="h-10 rounded-md border border-border bg-background px-3 text-sm"
                    value={cityId ?? ""}
                    onChange={(event) => onCityChange(event.target.value)}
                    disabled={disabled}
                >
                    {vedicClockPresetCities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>

                <Button type="button" variant="outline" className="gap-2" onClick={onUseMyLocation} disabled={disabled}>
                    <Navigation className="h-4 w-4" />
                    Use my location
                </Button>
            </div>
        </div>
    );
}