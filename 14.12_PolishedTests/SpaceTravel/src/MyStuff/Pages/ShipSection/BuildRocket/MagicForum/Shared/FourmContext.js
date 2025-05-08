


// FourmContext.js
import { createContext, useContext } from 'react';
export const FourmContext = createContext();
export const useFourm = () => useContext(FourmContext);
