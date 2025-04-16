import data from "./data.json";

export const getInTransitShipments = () => {
    return data.inTransitShipments;
};

export const getStats = () => {
    return data.stats;
};

export const getUser = () => {
    return data.user;
};

export const getOrders = () => {
    return data.trackingOrders;
};

export const getSelectedOrder = () => {
    return data.defaultSelectedShipment;
};