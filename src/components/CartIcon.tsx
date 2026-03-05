import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { itemCount } = useCart();

  return (
    <Link
      to="/cart"
      className="fixed top-6 right-6 z-50 flex items-center gap-2 border border-border bg-background/80 backdrop-blur-sm px-4 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-colors hover:border-foreground"
    >
      <ShoppingBag className="w-4 h-4" />
      {itemCount > 0 && <span>{itemCount}</span>}
    </Link>
  );
};

export default CartIcon;
