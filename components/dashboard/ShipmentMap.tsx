"use client"

import dynamic from 'next/dynamic';

interface MapProps {
    center: {
        lat: number;
        lng: number;
    };
    zoom: number;
}

const MapComponent = dynamic<MapProps>(
    () => import('./MapComponent').then(mod => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="relative w-full h-full">
                <div className="h-full w-full rounded-md bg-gray-100" />
                <div className="absolute inset-0 bg-gray-100 opacity-10 pointer-events-none rounded-md"></div>
            </div>
        )
    }
);

export function SimpleMap({ center, zoom }: MapProps) {
    return <MapComponent center={center} zoom={zoom} />;
}