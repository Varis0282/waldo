"use client"

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getInTransitShipments } from "@/utils/jsonData";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

interface InTransitShipment {
    id: string;
    shipmentNumber: string;
    pickupLocation: string;
    dropoffLocation: string;
    image: string;
    details: {
        mapData: {
            center: {
                lat: number;
                lng: number;
            };
            zoom: number;
        };
        category: string;
        distance: string;
        estimation: string;
        weight: string;
        fee: string;
    };
}

interface ShipmentCardProps {
    shipment: InTransitShipment;
    isSelected: boolean;
    onSelect: (id: string) => void;
}

// Individual shipment card component
function ShipmentCard({ shipment, isSelected, onSelect }: ShipmentCardProps) {
    return (
        <div
            className={`border rounded-md p-3 flex cursor-pointer ${isSelected ? 'border-indigo-600' : ''}`}
            onClick={() => onSelect(shipment.id)}
        >
            <div className="flex-1">

                <div className="flex flex-row justify-between ">
                    <div className="mb-2">
                        <p className="text-sm text-gray-500">Shipment Number</p>
                        <p className="font-bold">{shipment.shipmentNumber}</p>
                    </div>

                    <div className="flex items-center justify-center">
                        <Image
                            src="/images/truck1.png"
                            alt="Delivery truck"
                            width={100}
                            height={100}
                            className="w-28"
                            onError={() => toast.error("Failed to load truck image")}
                        />
                    </div>
                </div>

                <div className="relative pl-6 mt-4">
                    <div className="absolute left-0 top-3 w-3 h-3 rounded-full bg-black border-gray-400 border-3"></div>
                    <div className="mb-1">
                        <p className="text-xs text-gray-500">Pickup location</p>
                        <p className="text-sm">{shipment.pickupLocation}</p>
                    </div>

                    <div className="border-l border-dashed h-6 ml-[3px] my-1"></div>

                    <div className="absolute left-0 bottom-3 w-3 h-3">
                        <MapPin className="w-4 h-4 text-[#5542f6]" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Drop off location</p>
                        <p className="text-sm">{shipment.dropoffLocation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Information card for the "On the Way" section
function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-xs text-gray-500">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    );
}

// Main component that combines both sections
export function ShipmentTrackingSection() {
    const [shipments, setShipments] = useState<InTransitShipment[]>([]);
    const [selectedShipmentId, setSelectedShipmentId] = useState<string>("");

    useEffect(() => {
        // Get shipments data
        const shipmentData = getInTransitShipments();
        setShipments(shipmentData);

        // Set the default selected shipment
        if (shipmentData.length > 0 && !selectedShipmentId) {
            setSelectedShipmentId(shipmentData[0].id);
        }
    }, [selectedShipmentId]);

    // Find the currently selected shipment
    const selectedShipment = shipments.find(ship => ship.id === selectedShipmentId) || shipments[0];

    return (
        <Card className="grid grid-cols-1 lg:grid-cols-7 gap-0 mb-8">
            <div className="lg:col-span-3">
                <CardHeader className="ps-4">
                    <CardTitle className="text-lg font-medium">In Transit Shipments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 ps-4 px-2 h-80 overflow-y-auto"
                    style={{
                        scrollbarWidth: 'none',  // Firefox
                        msOverflowStyle: 'none',  // IE and Edge
                    }}
                >
                    {shipments.map((shipment) => (
                        <ShipmentCard
                            key={shipment.id}
                            shipment={shipment}
                            isSelected={shipment.id === selectedShipmentId}
                            onSelect={setSelectedShipmentId}
                        />
                    ))}
                </CardContent>
            </div>

            {/* On the Way */}
            <div className="lg:col-span-4">
                <CardHeader className="px-2">
                    <CardTitle className="text-lg font-medium">On the Way</CardTitle>
                </CardHeader>
                <CardContent className="px-2">
                    {selectedShipment && (
                        <>
                            <div className="bg-gray-100 rounded-md p-4 h-64 flex items-center justify-center mb-4">
                                <div className="text-center">
                                    <p className="text-gray-500 mb-2">Map View</p>
                                    <p className="text-xs text-gray-400">
                                        Centered at {selectedShipment.details.mapData.center.lat.toFixed(4)},
                                        {selectedShipment.details.mapData.center.lng.toFixed(4)}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-4 divide-x divide-gray-200">
                                <InfoCard label="Category" value={selectedShipment.details.category} />
                                <InfoCard label="Distance" value={selectedShipment.details.distance} />
                                <InfoCard label="Estimation" value={selectedShipment.details.estimation} />
                                <InfoCard label="Weight" value={selectedShipment.details.weight} />
                                <InfoCard label="Fee" value={selectedShipment.details.fee} />
                            </div>
                        </>
                    )}
                </CardContent>
            </div>
        </Card>
    );
}