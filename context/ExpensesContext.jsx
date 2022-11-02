import {createContext, useReducer} from "react";
import {dummyExpenses} from "../constants/dummyExpenses";
import 'react-native-get-random-values'
import {nanoid} from "nanoid";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {
  },
  updateExpense: (id, {description, amount, date}) => {
  },
  deleteExpense: (id) => {
  }
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, {id: nanoid(), ...action.payload}];
    case "UPDATE":
      const expenseToUpdate = state[state.findIndex((e) => e.id === action.payload.id)];
      const updatedItem = {...expenseToUpdate, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[state.findIndex((e) => e.id === action.payload.id)] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((e) => e.id !== action.payload)
    default:
      return state
  }
}

export default function ExpensesProvider({children}) {
  const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);

  function addExpense(data) {
    dispatch({type: "ADD", payload: data})
  }

  function updateExpense(id, data) {
    dispatch({type: "UPDATE", payload: {id, data}})
  }

  function deleteExpense(id) {
    dispatch({type: "DELETE", payload: id})
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense
  };

  return <ExpensesContext.Provider
    value={value}>{children}</ExpensesContext.Provider>
}