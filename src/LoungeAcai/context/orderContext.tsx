import React, { createContext, useContext, useState } from "react";
import type { ProductSize, SideOption } from "../data/menu";

export type ProductType = "acai" | "cupuaçu" | "meio-a-meio" | "suco" | "vitamina";
export type SweetenerType = "sem-acucar" | "xarope" | "xilitol" | "demerara" | "mascavo" | "mel";
export type PlaceType = "local" | "viagem";

export interface OrderDraft {
  type?: ProductType;
  sweetener?: SweetenerType;
  size?: ProductSize;
  sideDishes: SideOption[];
  fruits: SideOption[];
  place?: PlaceType;
}

interface OrderContextType {
  draft: OrderDraft;
  setType: (type: ProductType) => void;
  setSweetener: (sweetener: SweetenerType) => void;
  setSize: (size: ProductSize) => void;
  setSideDishes: (sideDishes: SideOption[]) => void;
  setFruits: (fruits: SideOption[]) => void;
  setPlace: (place: PlaceType) => void;
  clearDraft: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [draft, setDraft] = useState<OrderDraft>({
    sideDishes: [],
    fruits: [],
  });

  const setType = (type: ProductType) => setDraft((d) => ({ ...d, type, sweetener: undefined, size: undefined, sideDishes: [], fruits: [], place: undefined }));
  const setSweetener = (sweetener: SweetenerType) => setDraft((d) => ({ ...d, sweetener }));
  const setSize = (size: ProductSize) => setDraft((d) => ({ ...d, size }));
  const setSideDishes = (sideDishes: SideOption[]) => setDraft((d) => ({ ...d, sideDishes }));
  const setFruits = (fruits: SideOption[]) => setDraft((d) => ({ ...d, fruits }));
  const setPlace = (place: PlaceType) => setDraft((d) => ({ ...d, place }));
  const clearDraft = () => setDraft({ sideDishes: [], fruits: [] });

  return (
    <OrderContext.Provider value={{ draft, setType, setSweetener, setSize, setSideDishes, setFruits, setPlace, clearDraft }}>
      {children}
    </OrderContext.Provider>
  );
};

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}