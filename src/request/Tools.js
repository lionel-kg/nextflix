const apiUrl = "https://api.themoviedb.org/3"
const api_key = "68f3e254905b7d9ded0d2c549eeb73c5"

const requests = {
    fetchTrending: `${apiUrl}/movie/popular?api_key=${api_key}&language=fr-FR&page=1`,
    fectchNetflixOriginals: `${apiUrl}/popular?api_key=${api_key}&language=fr-FR&page=1`,
    fetchTopRated: `${apiUrl}/movie/top_rated?api_key=${api_key}&language=fr-FR&page=1`,
    fetchActionMovies: `${apiUrl}/discover/movie?api_key=${api_key}&with_genres=28&language=fr-FR&page=1`,
    fetchComedyMovies: `${apiUrl}/discover/movie?api_key=${api_key}&with_genres=35&language=fr-FR&page=1`,
    fetchHorrorMovies: `${apiUrl}/discover/movie?api_key=${api_key}&with_genres=27&language=fr-FR&page=1`,
    fetchRomanceMovies: `${apiUrl}/discover/movie?api_key=${api_key}&with_genres=10749&language=fr-FR&page=1`,
    fetchDocumentMovies: `${apiUrl}/popular?api_key=${api_key}&with_genres=99&language=fr-FR&page=1`,
}

export default requests;