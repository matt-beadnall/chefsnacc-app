import AuthService from "../services/auth.service";
import React from "react";
import axios from "axios";
import { DashGridContainer, DashGridItem, DashItemTitle } from "../components/grids/GridComponents";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { formatDateTime } from "../functions/dateFunctions";
import { eventsRequest, recipesRequest, ingredientsRequest } from "../requests/CommonRequests";

const ProfileImage = styled.img`
  border-radius: 100%;
  width: 25px;
  height: 25px;
  border: 2px solid #70e8c8
`

const Header = styled.div`
  align-items: center;
  display: flex;
`

const EventContainer = styled.div`
  // display:flex;
`

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
    <>
      <Link to={"/edit/" + props.children._id}>
        <ListItemLinkStyled>{props.children.name}</ListItemLinkStyled>
      </Link>
    </>
  )
}


const ListItemEventLink = (props) => {
  console.log(props)
  return (
    <EventContainer>
        <ListItemLinkStyled>
      <Header>
        <ProfileImage />
        <span style={{ color: "black", fontWeight:"bold", marginLeft: "5px" }}>{props.user.username}</span>
        <p style={{ color: "grey", margin:"0px", marginLeft: "auto"}}>{formatDateTime(props.children.recipe.date_added)}</p>
      </Header>
      <Link style={{ textDecoration: "none" }} to={"/edit/" + props.children._id}>
        {props.children.recipe && <p style={{ margin: "0px",color:"black" }}> created a new recipe: {props.children.recipe.name}</p>}
      </Link>
        </ListItemLinkStyled>
    </EventContainer>
  )
}


const Dashboard = () => {
  const currentUser = AuthService.getCurrentUser();
  const [user, setUser] = React.useState(AuthService.getCurrentUser());
  const [recipes, setRecipes] = React.useState([]);
  const [ingredients, setIngredients] = React.useState([]);
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {

    axios.all([recipesRequest(currentUser.id), ingredientsRequest, eventsRequest(currentUser.id)])
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
          {events.sort((a, b) => a.date_added - b.date_added).reverse().slice(0, 5).map((eventRec) => {
            console.log(eventRec);
            return (
              // <p>{event.recipe.name}</p>
              <ListItemEventLink user={currentUser} key={eventRec._id}>{eventRec}</ListItemEventLink>
            )
          })}
        </DashGridItem>
      </DashGridContainer>


    </div>
  );
};

export default Dashboard;
