import React, { useEffect, useState } from "react";
import { fetchStatistics } from "../api";
import { Box, Typography, Paper } from "@mui/material";

const StatisticsBox = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await fetchStatistics({ month });
      setStatistics(data);
    };
    fetchData();
  }, [month]);

  return (
    <Paper elevation={3} style={{ padding: "16px", marginTop: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Statistics for Month {month}
      </Typography>
      <Box>
        <Typography>
          Total Sale Amount: ${statistics.totalSaleAmount}
        </Typography>
        <Typography>Total Sold Items: {statistics.totalSoldItems}</Typography>
        <Typography>
          Total Not Sold Items: {statistics.totalNotSoldItems}
        </Typography>
      </Box>
    </Paper>
  );
};

export default StatisticsBox;
