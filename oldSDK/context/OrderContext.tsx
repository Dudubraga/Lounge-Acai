import React, { createContext, useState, useContext } from "react";

type Order = {
  total: number;
  orderType: string; // "Açaí", "Cupuaçu", "Açaí-Cupuaçu", "SucoAçaí", "VitaminaAçaí"
  size: string; // "200ml", "300ml", "400ml", "500ml", "750ml"
  sweet: string; // "Xarope", "Demerara", "Mascavo", "Mel", "Xilitro", "none"
  sideDishes: { [key: string]: number }; // List of side dishes
  fruit: string; // "Morango", "Kiwi", "Manga", "none"
  local: string; // "Local", "Viagem"
  extraCharge: number; // Extra p/ acompanhamentos
};

type OrderContextType = {
  order: Order;
  setOrder: React.Dispatch<React.SetStateAction<Order>>;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState<Order>({
    total: 0,
    orderType: "",
    size: "",
    sweet: "",
    sideDishes: {},
    fruit: "",
    local: "",
    extraCharge: 0,
  });

  return (
    <OrderContext.Provider value={{ order, setOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};