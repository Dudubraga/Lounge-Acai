import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDER_DETAILS_KEY = '@orderDetails';

// salva obj
export const SaveOrderDetails = async (order: {
  total: number;
  orderType: string;
  size: string;
  sweet: string;
  sideDishes: { [key: string]: number };
  fruit: string;
  local: string;
  extraCharge: number;
}) => {
  try {
    await AsyncStorage.setItem(ORDER_DETAILS_KEY, JSON.stringify(order));
    console.log('Salvo');
  } catch (error) {
    console.error('erro ao salvar', error);
  }
};

// recupera obj
export const GetOrderDetails = async () => {
  try {
    const storedOrderDetails = await AsyncStorage.getItem(ORDER_DETAILS_KEY);
    if (storedOrderDetails) {
      return JSON.parse(storedOrderDetails); // json -> obj
    }
    return null; 
  } catch (error) {
    console.error('erro ao recuperar', error);
    return null;
  }
};

// limpa obj
export const ClearOrderDetails = async () => {
  try {
    await AsyncStorage.removeItem(ORDER_DETAILS_KEY);
    console.log('removido');
  } catch (error) {
    console.error('erro ao remover', error);
  }
};