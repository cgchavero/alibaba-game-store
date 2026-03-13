// src/context/FirestoreContext.jsx
import { useEffect } from "react";
import { useReducer } from "react";
import tidb from "../utils/tidb";
import { AuthContext } from "./AuthContext";

const FirestoreContext = createContext(null);

const FirestoreContextProvider = ({ children }) => {
  const initialState = {
    wishlist: null,
    cartItems: null,
    orders: null,
    isLoading: true,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "UPDATE_DATA":
        return {
          ...state,
          wishlist: action.payload.wishlist,
          cartItems: action.payload.cartItems,
          orders: action.payload.orders,
          isLoading: false,
        };
      case "UPDATE_IS_LOADING":
        return {
          ...state,
          isLoading: action.payload,
        };
      default:
        throw new Error("Unknown action");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = useContext(AuthContext);

  const fetchData = async () => {
    dispatch({ type: "UPDATE_IS_LOADING", payload: true });
    const [wishlist] = await tidb.query("SELECT * FROM wishlist WHERE user_id = ?", [user?.uid]);
    const [orders] = await tidb.query("SELECT * FROM orders WHERE user_id = ?", [user?.uid]);
    dispatch({
      type: "UPDATE_DATA",
      payload: {
        wishlist: wishlist,
        cartItems: orders.filter(order => !order.isCompleted),
        orders: orders.filter(order => order.isCompleted),
      },
    });
  };

  useEffect(() => {
    if (user) {
      fetchData();
      // Poll for updates every 30 seconds
      const interval = setInterval(fetchData, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <FirestoreContext.Provider value={{ state }}>
      {children}
    </FirestoreContext.Provider>
  );
};

export { FirestoreContextProvider, FirestoreContext };
