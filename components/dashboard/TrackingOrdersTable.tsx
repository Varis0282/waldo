"use client"

import { useEffect, useState } from "react";
import { getOrders } from "@/utils/jsonData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface OrderRoute {
    from: string;
    to: string;
}

interface TrackingOrder {
    productId: string;
    type: string;
    arrivalTime: string;
    weight: string;
    route: OrderRoute;
    fee: string;
    status: string;
}

// Status badge component
function StatusBadge({ status }: { status: string }) {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'delivered':
                return "bg-green-100 text-green-600 hover:bg-green-100 text-[12px]";
            case 'in transit':
                return "bg-blue-100 text-blue-600 hover:bg-blue-100 text-[12px]";
            case 'processing':
                return "bg-yellow-100 text-yellow-600 hover:bg-yellow-100 text-[12px]";
            default:
                return "bg-gray-100 text-gray-600 hover:bg-gray-100 text-[12px]";
        }
    };

    return (
        <Badge variant="outline" className={`${getStatusColor(status)}`}>
            {status}
        </Badge>
    );
}

export function TrackingOrdersTable() {
    const [orders, setOrders] = useState<TrackingOrder[]>([]);

    useEffect(() => {
        const orderData = getOrders();
        setOrders(orderData);
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg font-medium">Tracking Order</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-xs text-gray-400 font-medium">PRODUCT ID</TableHead>
                                <TableHead className="text-xs text-gray-400 font-medium">TYPE</TableHead>
                                <TableHead className="text-xs text-gray-400 font-medium">ARRIVAL TIME</TableHead>
                                <TableHead className="text-xs text-gray-400 font-medium">WEIGHT</TableHead>
                                <TableHead className="text-xs text-gray-400 font-medium">ROUTE</TableHead>
                                <TableHead className="text-xs text-gray-400 font-medium">FEE</TableHead>
                                <TableHead className="text-xs text-gray-400 font-medium">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order, index) => (
                                <TableRow key={index} className="h-16">
                                    <TableCell className="font-medium text-gray-400">{order.productId}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-stone-300 text-white">
                                            {order.type}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.arrivalTime}</TableCell>
                                    <TableCell>{order.weight}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span>{order.route.from}</span>
                                            <ArrowRight className="h-4 w-4 text-gray-400" />
                                            <span>{order.route.to}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{order.fee}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={order.status} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}