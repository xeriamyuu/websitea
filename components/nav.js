import Link from "next/link";
import { FiShoppingBag } from "react-icons/fi";
import { NavStyles, NavItems } from "../styles/NavStyles.js";
import Cart from "./cart.js";
import { useStateContext } from "../lib/context.js";
const { AnimatePresence, motion } = require("framer-motion");
import User from "./User.js";
import { useUser } from "@auth0/nextjs-auth0";

export default function Nav() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { user, error, isLoading } = useUser();

  return (
    <NavStyles>
      <Link href={"/"}>Styled.</Link>
      <NavItems>
        <User />
        <div onClick={() => setShowCart(true)}>
          {totalQuantities > 0 && (
            <motion.span
              animate={{ scale: 1 }}
              initial={{ scale: 0 }}
              transition={{ delay: 0.5 }}
            >
              {totalQuantities}
            </motion.span>
          )}
          <FiShoppingBag />
          <h3>Cart</h3>
        </div>
      </NavItems>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  );
}
