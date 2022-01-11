import AuthService from "../services/auth.service";
import React from "react";
import axios from "axios";

const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  const [recipes, setRecipes] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/user/${currentUser.id}`
      )
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/`
      )
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <button>Recommend!</button>
      <h2>Recent Recipes</h2>
      {console.log(recipes)}
      {recipes.sort((a, b) => a.date_added - b.date_added).slice(0, 5).map((recipe) => (
        <p>{recipe.name}</p>
      ))}
      <h2>FriendsList</h2>
      <h2>Activity</h2>
      
    </div>
  );
};

export default Dashboard;
