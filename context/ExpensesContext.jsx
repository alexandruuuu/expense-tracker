import {createContext, useReducer} from "react";
import 'react-native-get-random-values'

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {
  },
  updateExpense: (id, {description, amount, date}) => {
  },
  deleteExpense: (id) => {
  },
  setExpenses: (arr) => {
  }
})

function expensesReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload.reverse();
    case "ADD":
      return [action.payload, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(data) {
    dispatch({type: "ADD", payload: data})
  }

  function updateExpense(id, data) {
    dispatch({type: "UPDATE", payload: {id, data}})
  }

  function deleteExpense(id) {
    dispatch({type: "DELETE", payload: id})
  }

  function setExpenses(array) {
    dispatch({type: "SET", payload: array})
  }

  const value = {
    expenses: expensesState,
    addExpense,
    updateExpense,
    deleteExpense,
    setExpenses
  };

  return <ExpensesContext.Provider
    value={value}>{children}</ExpensesContext.Provider>
}