"use client"

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

export default function MapComponent({ center, zoom }: MapProps) {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        if (!mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current, {
                zoomControl: false,
                attributionControl: false,
                dragging: false,
                scrollWheelZoom: false,
            }).setView([center.lat, center.lng], zoom);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
            }).addTo(mapInstanceRef.current);
        } else {
            mapInstanceRef.current.setView([center.lat, center.lng], zoom);
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [center, zoom]);

    return (
        <div className="relative w-full h-full">
            <div ref={mapRef} className="h-full w-full rounded-md" />
            <div className="absolute inset-0 bg-gray-100 opacity-10 pointer-events-none rounded-md"></div>
        </div>
    );
} 