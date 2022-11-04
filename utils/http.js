import axios from "axios";
import {BACKEND_URL} from "@env"

export const storeExpense = (expenseData) => {
  return axios.post(`${BACKEND_URL}/expenses.json`, expenseData);
}

export const fetchExpenses = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);
  // console.log(response.data)
  return Object.keys(response.data).map((key) => ({
    id: key,
    amount: response.data[key].amount,
    date: new Date(response.data[key].date),
    description: response.data[key].description,
  }))
}

export const updateExpenseRequest = (id, data) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, data)
}

export const deleteExpenseRequest = (id) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`)
}