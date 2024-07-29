import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5500/api" });

export const fetchTransactions = async (params) => {
  try {
    const response = await API.get("/transactions", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const fetchStatistics = async (params) => {
  try {
    const response = await API.get("/statistics", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
};

export const fetchBarChart = async (params) => {
  try {
    const response = await API.get("/barchart", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching bar chart data:", error);
    throw error;
  }
};

export const fetchPieChart = async (params) => {
  try {
    const response = await API.get("/piechart", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching pie chart data:", error);
    throw error;
  }
};

export const fetchCombinedData = async (params) => {
  try {
    const response = await API.get("/combined", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching combined data:", error);
    throw error;
  }
};
