


import { createContext, useContext, useReducer } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const initialState = {
    searchResults: [],
  };

  const searchReducer = (state, action) => {
    switch (action.type) {
      case "SET_SEARCH_RESULTS":
        return {
          ...state,
          searchResults: action.payload,
        };
      case "UPDATE_SEARCH_RESULT":
        return {
          ...state,
          searchResults: state.searchResults.map((result) =>
            result.id === action.payload.id ? action.payload : result
          ),
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(searchReducer, initialState);

  return (
    <SearchContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error(
      "useSearchContext must be used within a SearchProvider"
    );
  }
  return context;
};
