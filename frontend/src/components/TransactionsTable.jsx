import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  Paper,
  Box,
} from "@mui/material";

const TransactionsTable = ({
  month,
  setMonth,
  search,
  setSearch,
  page,
  setPage,
  perPage,
}) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await fetchTransactions({
          month,
          search,
          page,
          perPage,
        });
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchData();
  }, [month, search, page, perPage]);

  return (
    <Paper style={{ padding: "16px", marginTop: "16px" }}>
      <Box mb={2}>
        <FormControl fullWidth margin="normal">
          <InputLabel>Search</InputLabel>
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Month</InputLabel>
          <Select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            label="Month"
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((monthName, index) => (
              <MenuItem key={index} value={index + 1}>
                {monthName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Date of Sale</TableCell>
            <TableCell>Sold</TableCell>
            <TableCell>Category</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction._id}>
                <TableCell>{transaction.title}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.price}</TableCell>
                <TableCell>
                  {new Date(transaction.dateOfSale).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.sold ? "Yes" : "No"}</TableCell>
                <TableCell>{transaction.category}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>No transactions found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Box mt={2}>
        <Button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Previous
        </Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
      </Box>
    </Paper>
  );
};

export default TransactionsTable;
