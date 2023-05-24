import React from "react";
import Main from "../components/Main";
import Category from "../components/Category";
import requests from "../Requests";

const Home = () => {
  return (
    <div>
      <Main />
      <Category
        catId="1"
        title="Top Rated"
        fetchUrl={requests.topRatedRequest}
      />

      <Category catId="2" title="Popular" fetchUrl={requests.popularRequest} />
      <Category
        catId="3"
        title="Trending"
        fetchUrl={requests.trendingRequest}
      />
      <Category catId="4" title="Horror" fetchUrl={requests.horrorRequest} />
      <Category
        catId="5"
        title="Upcoming"
        fetchUrl={requests.upcomingRequest}
      />
    </div>
  );
};

export default Home;
