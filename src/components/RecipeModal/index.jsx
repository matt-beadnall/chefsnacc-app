import "./index.css";

import Backdrop from "../Backdrop";
import { Link } from "react-router-dom";
import close from "../../images/close.svg";
import expand from "../../images/expand.svg";
import { motion } from "framer-motion/dist/framer-motion";

const dropIn = {
  hidden: {
    // y: "-100vh",
    opacity: 0,
    scale: 1.5,
  },
  visible: {
    // y: "0",
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 20,
      stiffness: 500,
    },
  },
  exit: {
    // y: "100vh",
    opacity: 0,
  },
};

const RecipeModal = ({ children, handleClose, recipe, ingredients }) => {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        // drag
        // dragConstraints={{left: -300, right: 300, top: -300, bottom: 300}}
        onClick={(e) => e.stopPropagation()}
        className="modal white-background"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="button-container">
          <Link className="expand-button left" to={"/edit/" + recipe._id} state={{recipe:recipe,ingredients:ingredients}}>
            <img className="expand-icon" src={expand} alt="expand page icon" />
            <p style={{ padding: "10px" }}>Expand to full page</p>
          </Link>
          <div className="expand-button right" onClick={handleClose}>
            <p style={{ padding: "10px" }}>Close & Save</p>
            <img className="close-icon" src={close} alt="expand page icon" />
          </div>
        </div>
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default RecipeModal;
