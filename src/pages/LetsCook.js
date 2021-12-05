import { makeStyles, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const useStyles = makeStyles((theme) => ({
    sort_button: {
        height: "40px",
        top: "50%",
      },
      list_content: {
        backgroundColor: "light grey",
      },
      create: {
        alignContent: "left",
      },
      title: {
        [theme.breakpoints.down("sm")]: {
          fontSize: "25px",
        },
        color: "white",
      },
      container: {
          display: "flex",
          flexDirection: "column",
        width: "80vw",
        margin: "auto",
      },
      control_group: {
        marginTop: "5px",
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
      },    
    pictures: {},
    image: {
      width: "100%",
    },
    step: {

    },
  }));

export default function LetsCook() {
    const classes = useStyles();
    const [recipe, setRecipe] = useState({});
    const { id } = useParams();
    
    useEffect(() => {
      axios
        .get(`http://${process.env.REACT_APP_HOST}:4000/chefsnacc/recipes/${id}`)
        .then((response) => {
          setRecipe(response.data);
        })
        .catch((error) => {
          console.log(error);
        });    
    }, [id]);

    const dynamicString = (string) => {
        // return string.match("([1-9][1-9]?)[ ]mins");
        return string.match("([1-9][1-9]?)");
    }

    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
          return <div className="timer">Done!</div>;
        }
      
        return (
          <div className="timer">
            <div className="text">Remaining</div>
            <div className="value">{remainingTime}</div>
            <div className="text">seconds</div>
          </div>
        );
      };

    // eslint-disable-next-line
    function Countdown({time}) {
        console.log("time:" + time[0]);
        const [playing, setPlaying] = useState(false);
        return <div className="timer-wrapper">
        <Button onClick={() => setPlaying(true)}>START</Button>
          <CountdownCircleTimer
            isPlaying={playing}
            duration={parseInt(time[0] * 60)}
            colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
            // onComplete={() => [true, 1000]}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
    }

    return (
      <>
        <div className={classes.container}>
            <h1>Let's Cook</h1>
            <h2 className={classes.header}>{recipe.name}</h2>
            {   recipe.method != null ? 
                recipe.method.map((method,i) => {
                    console.log(dynamicString(method.description))
                 return (
                     <div className="recipe">
                     <p>{i + ". " + method.description}</p>
                        {dynamicString(method.description) !== null ? 
                            null : null
                        }
                     </div>
                 )
                
            }) : null
            }
        </div>
        </>
       
    )
}
