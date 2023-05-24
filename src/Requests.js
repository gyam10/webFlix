const key = "2fc58281ea6a94aac141502d217e75f5";

const requests = {
  popularRequest: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
  topRatedRequest: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  trendingRequest: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  horrorRequest: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  upcomingRequest: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export default requests;
