import { create } from "zustand";

import type { LocationStore, MarkerData, DriverStore } from "@/types/type";

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userAddress: null,
  userLongitude: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,

  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userAddress: address,
      userLongitude: longitude,
    }));
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,

  setSelectedDriver: (driverId: number) => {
    set(() => ({
      selectedDriver: driverId,
    }));
  },

  setDrivers: (drivers: MarkerData[]) => {
    set(() => ({
      drivers,
    }));
  },

  clearSelectedDriver: () => {
    set(() => ({
      selectedDriver: null,
    }));
  },
}));
