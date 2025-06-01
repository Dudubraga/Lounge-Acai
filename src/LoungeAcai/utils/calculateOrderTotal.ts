import { OrderDraft } from "../context/orderContext";
import { products, extraFruits } from "../data/menu";

export function calculateOrderTotal(draft: OrderDraft): number {
  if (!draft.type) return 0;

  // Encontra o produto base
  let product = products.find(
    (p) =>
      p.type === draft.type &&
      (!draft.sweetener || p.sweetener === draft.sweetener)
  );
  if (!product) return 0;

  // Preço base pelo tamanho
  let base = 0;
  if (draft.size) {
    base = product.prices.find((p) => p.size === draft.size)?.price || 0;
  } else {
    base = product.prices[0]?.price || 0;
  }

  // Acompanhamentos extras
  let freeSides = 0;
  if (draft.size) {
    if (draft.size === 200) freeSides = 2;
    else if (draft.size === 300) freeSides = 3;
    else if (draft.size === 400) freeSides = 4;
    else freeSides = 5;
  }
  const extraSides = Math.max(0, (draft.sideDishes?.length || 0) - freeSides);
  const sidesPrice = extraSides * 2;

  // Frutas extras
  const fruitsPrice =
    (draft.fruits || []).reduce((sum, fruit) => {
      const fruitData = extraFruits.find((f) => f.id === fruit.id);
      return sum + (fruitData?.extraPrice || 0);
    }, 0);

  // Adicional viagem
  const placePrice = draft.place === "viagem" ? 1.5 : 0;

  return base + sidesPrice + fruitsPrice + placePrice;
}