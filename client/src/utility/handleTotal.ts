interface CartItemProps {
  id?: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  desc: string;
  vendor: string;
}

export const handleTotal = (items: CartItemProps[]) => {
  let total = 20;
  items?.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};
