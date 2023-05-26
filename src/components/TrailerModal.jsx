import { useEffect, useState } from "react";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { db } from "../firebase";
import ReactPlayer from "react-player";
import { arrayUnion, updateDoc, doc } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const TrailerModal = ({ visible, onClose, movie }) => {
  const [trailer, setTrailer] = useState("");
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();
  const movieId = doc(db, "User", `${user?.email}`);

  useEffect(() => {
    const video = fetch(
      `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=2fc58281ea6a94aac141502d217e75f5&language=en-US&append_to_response=videos`
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
    setTrailer(video);
  }, []);

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

  if (!visible) {
    return null;
  } else {
    return (
      <>
        <div className="fixed  inset-10 z-[200] bg-black/80 backdrop-blur-sm h-[550px]">
          <div className=" "></div>
          <button onClick={onClose} className="flex justify-end ">
            <AiOutlineCloseCircle size={20} />
          </button>
          <div className="relative pt-[50%]">
            <ReactPlayer
              url={`${trailer}`}
              width="100%"
              height="100%"
              className="absolute top-0 left-0"
              playing
            />
            <div className="absolute bottom-52 flex w-full items-center justify-between px-5">
              <div className="my-4 flex">
                <button className="border  bg-gray-300 text-black border-gray-300 py-2 px-4 flex items-center rounded">
                  <FaPlay /> Play
                </button>
                <button
                  className="border text-white border-gray-300 py-2 px-4 ml-4 flex items-center "
                  onClick={watchLater}
                >
                  <AiOutlinePlusCircle size={20} className="mx-2" />
                  Watch Later
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default TrailerModal;
