"use client"
import { Navbar } from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUser } from '@/utils/jsonData';
import { StatsSection } from "@/components/dashboard/StatsSection";
import { WelcomeSection } from "@/components/dashboard/WelcomeSection";
import { ShipmentTrackingSection } from "@/components/dashboard/ShipmentTrackingSection";
import { TrackingOrdersTable } from "@/components/dashboard/TrackingOrdersTable";

export default function Home() {

  const [user, setUser] = useState({
    name: "",
    avatar: ""
  });

  useEffect(() => {
    const userData = getUser();
    setUser(userData);
  }, []);

  return (
    <div className="flex flex-col h-screen w-full">
      <Navbar user={user} />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto w-full">
        <WelcomeSection user={user} />
        <StatsSection />
        <ShipmentTrackingSection />
        <TrackingOrdersTable />
      </div>
    </div>
  );
}
