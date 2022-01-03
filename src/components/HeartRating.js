import React from 'react'
import emptyHeart from "../images/chefsnacc-heart-empty.svg";
// import { ReactComponent as Heart } from "../images/chefsnacc-heart.svg";
import heart from "../images/chefsnacc-heart.svg";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  heart_array: {
    display: 'flex'
  },
  heart_container: {
    margin: '0 0 1em 0',
    height: '24px',
    width: '24px',
    cursor: 'pointer',
    padding: '4px',
    display:"flex", 
    flexDirection:"column"
  },
  heart: {
    '&:hover': {
      paddingTop: '3px',
    }
  }
})

export default function HeartRating(props) {
  const classes = useStyles();
    return (
        <div className={classes.heart_array}>
          {
            [1, 2, 3, 4, 5].map((heartIndex) => {
            return (
              <div className={classes.heart_container} key={heartIndex} onClick={(event) => props.onChangeRecipe(event, "hidden")}>
                <img className={classes.heart} src={heartIndex <= props.rating ? heart : emptyHeart} alt="heart" />
              </div>
            );
          })}
        </div>
      );
}
