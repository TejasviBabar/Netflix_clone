import React, { useEffect,useState } from "react";
import "./Player.css";
import backArrow from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {

const {id} = useParams();
const navigate= useNavigate();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzliOTlhNWJkMmQxYTQ2NWU2ZDM2MzljODUwNjZmYSIsIm5iZiI6MTc1NjIxNDA1MS41NjQ5OTk4LCJzdWIiOiI2OGFkYjMyMzY3NDIzYWFlNWM2Y2YxYTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wXQXPYZljOU93tdHx7MXZ9yX-d8xOnSy9e7P0C88XW8'
  }
};

const[ApiData,setApiData]=useState({
  name : "",
  key : "",
  published_at : "",
  typeof: ""
})

useEffect(()=>{
fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
},[])


  
  return (
    <div className="player">
      <img src={backArrow} alt="Back Arrow Image" onClick={()=>{navigate(-2)}}/>
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${ApiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      >
        This text will shoow up when src doesn't load

      </iframe>
      <div className="player-info">
          <p>{ApiData.published_at.slice(0,10)}</p>
          <p>{ApiData.name}</p>
          <p>{ApiData.type}</p>
        </div>
    </div>
  );
};

export default Player;
