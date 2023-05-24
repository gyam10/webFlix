import React, { useEffect, useState } from "react";
import requests from "../Requests";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [saved, setSaved] = useState(false);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  const { user } = UserAuth();
  const movieId = doc(db, "User", `${user?.email}`);

  useEffect(() => {
    axios.get(requests.popularRequest).then((response) => {
      setMovies(response.data.results);
    });
  }, []);
  //   console.log(movie);
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const watchLater = async () => {
    if (user?.email) {
      setSaved(true);
      await updateDoc(movieId, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return (
    <div className="w-full h-[450px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[450px] bg-gradient-to-r from-[black]" />
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">{movie?.title}</h1>
          <div className="my-4 flex">
            <button className="border  bg-gray-300 text-black border-gray-300 py-2 px-4 flex items-center ">
              <FaPlay size={18} className="mx-2" />
              <p>Play</p>
            </button>
            <button
              className="border text-white border-gray-300 py-2 px-4 ml-4 flex items-center "
              onClick={watchLater}
            >
              <AiOutlinePlusCircle size={20} className="mx-2" />
              Watch later
            </button>
          </div>
          <p className="text-gray-400 text-sm">
            Released: {movie?.release_date}
          </p>
          <p className="w-full md:max-w-[-70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-300">
            {truncateString(movie?.overview, 175)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
