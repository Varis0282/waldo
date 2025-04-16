"use client"

import { ArrowUp, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getStats } from "@/utils/jsonData";

interface StatCardProps {
    title: string;
    value: number;
    change: number;
    period: string;
}

function StatCard({ title, value, change, period }: StatCardProps) {
    const updatedValue = value.toLocaleString('en-EN', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    return (
        <Card className="py-4">
            <CardHeader className="px-4">
                <div className="flex justify-between items-center">
                    <p className="text-lg text-gray-700">{title}</p>
                    <Button variant="outline" size="icon" className="h-8 w-8 border-[#5542f6]">
                        <Truck className="h-4 w-4 text-[#5542f6]" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="px-4">
                <div className="text-2xl font-bold mb-2">{updatedValue}</div>
                <div className="flex items-center text-xs">
                    <span className="text-green-500 flex items-center mr-2">
                        <ArrowUp className="h-3 w-3 mr-1 rotate-45" /> {change}%
                    </span>
                    <span className="text-gray-500">{period}</span>
                </div>
            </CardContent>
        </Card>
    );
}

export function StatsSection() {
    const statsData = getStats();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat: any, index: any) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    value={stat.value}
                    change={stat.change}
                    period={stat.period}
                />
            ))}
        </div>
    );
}