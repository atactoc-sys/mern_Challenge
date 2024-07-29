import React, { useEffect, useState } from "react";
import { fetchBarChart } from "../api";
import { Bar } from "react-chartjs-2";

const BarChart = ({ month }) => {
  const [barData, setBarData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchBarChart({ month });
      setBarData({
        labels: Object.keys(data),
        datasets: [
          {
            label: "Number of Items",
            data: Object.values(data),
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });
    };
    fetchData();
  }, [month]);

  return (
    <div className="containerBar">
      <Bar data={barData} />
    </div>
  );
};

export default BarChart;
