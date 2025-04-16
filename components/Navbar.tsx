"use client"

import { Bell, ChevronDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import Link from "next/link"

interface NavbarProps {
    user: {
        name: string
        avatar?: string
    }
}

export function Navbar({ user }: NavbarProps) {
    return (
        <header className="bg-white p-4 flex justify-between items-start border-b w-full">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 md:w-64 border-none shadow-none"
                />
            </div>
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative" onClick={() => {
                    toast("Notifications", {
                        description: "Notification feature is coming soon. Stay with Waldo!",
                        duration: 3000,
                        action: {
                            label: "Okay",
                            onClick: () => console.log("Okay"),
                        },
                    })
                }}>
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                                {user.avatar ? (
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                ) : (
                                    <AvatarFallback className="bg-indigo-600 text-white">
                                        {user.name.charAt(0)}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <span className="text-sm font-medium">{user.name}</span>
                            <ChevronDown className="h-4 w-4 text-gray-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            toast("Profile", {
                                description: "Profile feature is coming soon. Stay with Waldo!",
                                duration: 3000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            toast("Settings", {
                                description: "Settings feature is coming soon. Stay with Waldo!",
                                duration: 3000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard">Logout</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}