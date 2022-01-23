import AuthService from "../services/auth.service";
import React from "react";
import axios from "axios";
import { DashGridContainer, DashGridItem, DashItemTitle } from "../components/grids/GridComponents";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ListItemLinkStyled = styled.div`
  padding: 5px;
  // margin: 5px;
  // background-color: #d9d9d9;
  border: 1px solid #d9d9d9;
  margin-bottom: 5px;
`

const ListItemLink = (props) => {
  // console.log(props)
  return (
    <Link to={"/edit/" + props.children._id}>
      <ListItemLinkStyled>{props.children.name}</ListItemLinkStyled>
    </Link>
  )
}


const ListItemEventLink = (props) => {
  console.log(props)
  return (
    <>
    <Link style={{textDecoration:"none"}} to={"/edit/" + props.children._id}>
      <ListItemLinkStyled>
      <p style={{margin:"0px"}}><span style={{color:"red"}}>{props.user.username}</span> created a new recipe: {props.children.name}</p>
        </ListItemLinkStyled>
    </Link>
    </>
  )
}



const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  const [user, setUser] = React.useState(AuthService.getCurrentUser());
  const [recipes, setRecipes] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {

    // axios requests
    const recipesRequest = axios.get(
      `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/recipes/user/${currentUser.id}`
    )

    const ingredientsRequest = axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/ingredients/`
      )

    const eventsRequest = axios
      .get(
        `http://${process.env.REACT_APP_BACKEND_SERVER}/chefsnacc/events/${currentUser.id}`
      )

    axios.all([recipesRequest, ingredientsRequest, eventsRequest])
      .then(axios.spread((...responses) => {
        setRecipes(responses[0].data);
        setIngredients(responses[1].data);
        setEvents(responses[2].data);
      })
      ).catch(errors => {
        console.log(errors);
      })
  }, []);

  return (
    <div>
      <button>Recommend!</button>
      <DashGridContainer>
        <DashGridItem>
          <DashItemTitle>Recent Recipes</DashItemTitle>
          {recipes.sort((a, b) => a.date_added - b.date_added).slice(0, 5).map((recipe) => (
            <ListItemLink key={recipe._id}>{recipe}</ListItemLink>
          ))}
        </DashGridItem>
        <DashGridItem>
          <DashItemTitle>FriendsList</DashItemTitle>
          <p>You have no friends</p>
        </DashGridItem>
        <DashGridItem>
          <DashItemTitle>Activity</DashItemTitle>
          {events.sort((a, b) => a.date_added - b.date_added).slice(0, 5).map((eventRec) => {
            console.log(eventRec);
            return (
              // <p>{event.recipe.name}</p>
              <ListItemEventLink user={currentUser} key={eventRec._id}>{eventRec.recipe}</ListItemEventLink>
            )
          })}
        </DashGridItem>
      </DashGridContainer>


    </div>
  );
};

export default Dashboard;
