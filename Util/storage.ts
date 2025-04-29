import AsyncStorage from '@react-native-async-storage/async-storage';

const ORDER_DETAILS_KEY = '@orderDetails';

// Salva o objeto completo do pedido no AsyncStorage
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
    console.log('Pedido salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar o pedido:', error);
  }
};

// Recupera o objeto completo do pedido do AsyncStorage
export const GetOrderDetails = async () => {
  try {
    const storedOrderDetails = await AsyncStorage.getItem(ORDER_DETAILS_KEY);
    if (storedOrderDetails) {
      return JSON.parse(storedOrderDetails); // Converte de JSON para objeto
    }
    return null; // Retorna null se não houver dados
  } catch (error) {
    console.error('Erro ao recuperar os detalhes do pedido:', error);
    return null;
  }
};

// Limpa o objeto completo do pedido do AsyncStorage
export const ClearOrderDetails = async () => {
  try {
    await AsyncStorage.removeItem(ORDER_DETAILS_KEY);
    console.log('Detalhes do pedido removidos com sucesso!');
  } catch (error) {
    console.error('Erro ao limpar os detalhes do pedido:', error);
  }
};