// const API_URL = "http://localhost:8000"; 

// export interface Retreat {
//   retreat_id: number;
//   title: string;
//   image: string;
//   price: number;
//   description: string;
//   duration: string;
//   date: string;
//   location: string;
// }

// export const searchRetreats = async (
//   title: string,
//   sortBy: string,
//   locationFilter: string,
//   durationFilter: string
// ): Promise<Retreat[]> => {
//   let url = `${API_URL}/retreats/search/?title=${encodeURIComponent(title)}&sort_by=${encodeURIComponent(sortBy)}&location_filter=${encodeURIComponent(locationFilter)}`;
  
//   if (durationFilter) {
//     url += `&duration_filter=${encodeURIComponent(durationFilter)}`;
//   }
  
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed to fetch retreats");
//   }
//   return response.json();
// };

// export const getRetreats = async (): Promise<Retreat[]> => {
//   const response = await fetch(`${API_URL}/retreats/`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch retreats");
//   }
//   return response.json();
// };

const API_URL = "http://localhost:8000";

export interface Retreat {
  retreat_id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  duration: string;
  date: string;
  location: string;
}

export const searchRetreats = async (
  title: string,
  sortBy: string,
  locationFilter: string,
  durationFilter: string,
  page: number,
  pageSize: number
): Promise<{ retreats: Retreat[]; total_count: number }> => {
  let url = `${API_URL}/retreats/search/?title=${encodeURIComponent(title)}&sort_by=${encodeURIComponent(sortBy)}&location_filter=${encodeURIComponent(locationFilter)}&page=${page}&page_size=${pageSize}`;

  if (durationFilter) {
    url += `&duration_filter=${encodeURIComponent(durationFilter)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch retreats");
  }
  return response.json();
};

export const getRetreats = async (): Promise<Retreat[]> => {
  const response = await fetch(`${API_URL}/retreats/`);
  if (!response.ok) {
    throw new Error("Failed to fetch retreats");
  }
  return response.json();
};

import axios from 'axios';

interface BookingData {
  user_id: number;
  user_name: string;
  user_email: string;
  user_phone: string;
  retreat_id: number;
  retreat_title: string;
  retreat_location: string;
  retreat_price: number;
  retreat_duration: string;
  payment_details: string;
  booking_date: string;
}

export const createBooking = async (bookingData: BookingData) => {
  try {
    const response = await axios.post(`${API_URL}/bookings/`, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};
