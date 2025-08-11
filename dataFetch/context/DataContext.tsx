import React, { createContext, ReactNode, useState } from "react";
import { Products } from "../types/types";

interface DataContextType {
  products: Products[];
  setProducts: React.Dispatch<React.SetStateAction<Products[]>>;
  
}

export const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Products[]>([]);


  return (
    <DataContext.Provider value={{products, setProducts}}>
      {children}
    </DataContext.Provider>
  );
};
