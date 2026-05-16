import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import {Link} from 'react-router-dom'

const TitleCards = ({ title, category }) => {
  const [ApiData, setApiData] = useState([]); //initial value will be empty array

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYzliOTlhNWJkMmQxYTQ2NWU2ZDM2MzljODUwNjZmYSIsIm5iZiI6MTc1NjIxNDA1MS41NjQ5OTk4LCJzdWIiOiI2OGFkYjMyMzY3NDIzYWFlNWM2Y2YxYTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wXQXPYZljOU93tdHx7MXZ9yX-d8xOnSy9e7P0C88XW8",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>
        {
          title
            ? title
            : "Popular on Netflix" /*if title is not available jsx will use this title*/
        }
      </h2>
      <div className="card-list" ref={cardsRef}>
        {ApiData.map((card, idx) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={idx}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
