"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
    Package,
    Users,
    FileText,
    Star,
    ShoppingCart,
    Settings,
    LayoutGrid,
    ChevronDown,
    ChevronRight
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"

interface SidebarItemProps {
    icon: React.ReactNode
    label: string
    href?: string
    isActive?: boolean
}

// Regular sidebar item without children
const SidebarItem = ({ icon, label, href, isActive }: SidebarItemProps) => {
    const pathname = usePathname()
    const router = useRouter()

    // Check if current path matches item
    const isCurrentPath = href ? pathname === href : false
    const isActiveItem = isActive || isCurrentPath

    const handleClick = (e: any) => {
        e.preventDefault()

        // Only allow dashboard to be navigated to, show message for other links
        if (href === "/dashboard") {
            router.push(href)
        } else {
            toast("Coming Soon", {
                description: "This feature is coming soon. Stay with Waldo!",
                duration: 4000,
                action: {
                    label: "Okay",
                    onClick: () => console.log("Okay"),
                },
            })
        }
    }

    return (
        <Button
            variant="ghost"
            className={cn(
                "w-full justify-start px-4 py-2 h-10",
                isActiveItem && "bg-indigo-50 text-indigo-600 font-medium border-l-4 border-indigo-600 pl-3"
            )}
            onClick={handleClick}
        >
            <div className="mr-2">
                {icon}
            </div>
            <span>{label}</span>
        </Button>
    )
}

// Sidebar item with collapsible children
const SidebarItemWithChildren = ({
    icon,
    label,
    children,
    isActive
}: {
    icon: React.ReactNode
    label: string
    children: React.ReactNode
    isActive?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full"
        >
            <CollapsibleTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start px-4 py-2 h-10",
                        isActive && "bg-indigo-50 text-indigo-600 font-medium"
                    )}
                >
                    <div className="flex items-center w-full">
                        <div className="mr-2">
                            {icon}
                        </div>
                        <span>{label}</span>
                        <div className="ml-auto">
                            <ChevronRight className={`h-4 w-4 ${isOpen ? "rotate-90" : ""} transition-transform duration-300`} />
                        </div>
                    </div>
                </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="pl-8 py-1 flex flex-col gap-2">
                    {children}
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

export function Sidebar() {
    const pathname = usePathname()
    const router = useRouter()

    const handleNavigation = (e: any, href: any) => {
        e.preventDefault()

        // Only allow dashboard to be navigated to, show message for other links
        if (href === "/dashboard") {
            router.push(href)
        } else {
            toast("Coming Soon", {
                description: "This feature is coming soon. Stay with Waldo!",
                duration: 4000,
                action: {
                    label: "Okay",
                    onClick: () => console.log("Okay"),
                },
            })
        }
    }

    return (
        <div className="w-56 bg-white h-screen border-r hidden md:block">
            {/* Logo */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold">SP</span>
                    </div>
                    <span className="font-bold text-gray-800">Shipping Plus</span>
                </div>
            </div>

            {/* Navigation */}
            <div className="py-4 space-y-1">
                <SidebarItem
                    icon={<LayoutGrid className="h-4 w-4" />}
                    label="Dashboard"
                    href="/dashboard"
                    isActive={pathname === "/dashboard"}
                />

                <SidebarItemWithChildren
                    icon={<Package className="h-4 w-4" />}
                    label="Product"
                    isActive={pathname.startsWith("/product")}
                >
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/product"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        All Products
                    </Button>
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/product/categories"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        Categories
                    </Button>
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/product/inventory"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        Inventory
                    </Button>
                </SidebarItemWithChildren>

                <SidebarItemWithChildren
                    icon={<FileText className="h-4 w-4" />}
                    label="Orders"
                    isActive={pathname.startsWith("/orders")}
                >
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/orders"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        All Orders
                    </Button>
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/orders/processing"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        Processing
                    </Button>
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/orders/shipped"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        Shipped
                    </Button>
                </SidebarItemWithChildren>

                <SidebarItemWithChildren
                    icon={<Users className="h-4 w-4" />}
                    label="Customers"
                    isActive={pathname.startsWith("/customers")}
                >
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/customers"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        All Customers
                    </Button>
                    <Button
                        variant="link"
                        className={cn(
                            "h-auto p-0 px-2 py-1 text-sm justify-start font-normal",
                            pathname === "/customers/segments"
                                ? "text-indigo-600 font-medium"
                                : "text-gray-600 hover:text-indigo-600"
                        )}
                        onClick={(e) => {
                            e.preventDefault()
                            toast("Coming Soon", {
                                description: "This feature is coming soon. Stay with Waldo!",
                                duration: 4000,
                                action: {
                                    label: "Okay",
                                    onClick: () => console.log("Okay"),
                                },
                            })
                        }}
                    >
                        Segments
                    </Button>
                </SidebarItemWithChildren>

                <SidebarItem
                    icon={<Star className="h-4 w-4" />}
                    label="Manage Reviews"
                    href="/reviews"
                />
                <SidebarItem
                    icon={<ShoppingCart className="h-4 w-4" />}
                    label="Checkout"
                    href="/checkout"
                />
                <SidebarItem
                    icon={<Settings className="h-4 w-4" />}
                    label="Settings"
                    href="/settings"
                />
            </div>
        </div>
    )
}