import fruits from "@/data/fruits";
import products from "@/data/products";
import sizes from "@/data/sizes";
import sweeteners from "@/data/sweeteners";
import places from "@/data/places";
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
  calculateTotal: () => number;
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

  const calculateTotal = () => {
    let total = 0;
    
    const product = products.find((p) => p.id === order.orderType);
    if (product) total += product.price ||0;

    const size = sizes.find((s) => s.id === order.size);
    if (size) total += size.price;

    const sweetener = sweeteners.find((s) => s.id === order.sweet);
    if (sweetener) total += sweetener.price || 0;

    const fruit = fruits.find((f) => f.id === order.fruit);
    if (fruit) total += fruit.price || 0;

    const place = places.find((p) => p.id === order.local);
    if (place) total += place.price;
    
    total += order.extraCharge; //acompanhamentos

    setOrder((prevOrder) => ({ ...prevOrder, total }));

    return total;
  }



  return (
    <OrderContext.Provider value={{ order, setOrder, calculateTotal }}>
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