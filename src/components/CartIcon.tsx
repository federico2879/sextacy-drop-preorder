import { useEffect, useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";

const CartIcon = () => {
  const { itemCount } = useCart();
  const [pop, setPop] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setPop(true);
      const t = setTimeout(() => setPop(false), 300);
      return () => clearTimeout(t);
    }
  }, [itemCount]);

  return (
    <Link
      to="/cart"
      className={`fixed top-6 right-6 z-50 flex items-center gap-2 border border-border bg-background/80 backdrop-blur-sm px-4 py-3 text-xs tracking-[0.2em] uppercase text-foreground transition-all hover:border-foreground ${
        pop ? "scale-110" : "scale-100"
      }`}
    >
      <ShoppingBag className="w-4 h-4" />
      {itemCount > 0 && (
        <span className={`transition-transform ${pop ? "scale-125" : "scale-100"}`}>
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;