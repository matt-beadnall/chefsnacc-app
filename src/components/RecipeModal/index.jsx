import Backdrop from "../Backdrop";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const RecipeModal = ({ children, handleClose, recipe }) => {
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
      {children}
        <h1>{recipe.name}</h1>
        <Link to={"/letscook/" + recipe._id}>
          <button>
            LET'S COOK!
          </button>
        </Link>
        <Link to={"/edit/" + recipe._id}>
          <button>
            FULL PAGE
          </button>
        </Link>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  );
};

export default RecipeModal;
