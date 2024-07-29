import React, { useEffect, useState } from "react";
import { fetchPieChart } from "../api";
import { Pie } from "react-chartjs-2";

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchPieChart({ month });
      setPieData({
        labels: Object.keys(data),
        datasets: [
          {
            label: "Number of Items",
            data: Object.values(data),
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ],
          },
        ],
      });
    };
    fetchData();
  }, [month]);

  return (
    <div className="container">
      <Pie data={pieData} />
    </div>
  );
};

export default PieChart;
