"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface WelcomeSectionProps {
    user: {
        name: string;
        avatar: string;
    };
}

export function WelcomeSection({ user }: WelcomeSectionProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {user.name}</h1>
                <p className="text-sm text-gray-500">Here&apos;s what&apos;s happening with your store today</p>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show stats:</span>
                <Select defaultValue="perDay">
                    <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Per Day" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="perDay">Per Day</SelectItem>
                        <SelectItem value="perWeek">Per Week</SelectItem>
                        <SelectItem value="perMonth">Per Month</SelectItem>
                        <SelectItem value="perYear">Per Year</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
