const {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie
} = require('../controllers/movieController');

function handleRoutes(req, res) {

  if (req.method === 'GET' && req.url === '/movies') {
    return getMovies(req, res);
  }

  if (req.method === 'GET' && req.url.startsWith('/movies/')) {
    const id = parseInt(req.url.split('/')[2]);
    return getMovieById(req, res, id);
  }

  if (req.method === 'POST' && req.url === '/movies') {
    return createMovie(req, res);
  }

  if (req.method === 'DELETE' && req.url.startsWith('/movies/')) {
    const id = parseInt(req.url.split('/')[2]);
    return deleteMovie(req, res, id);
  }

  if (req.method === 'PUT' && req.url.startsWith('/movies/')) {
    const id = parseInt(req.url.split('/')[2]);
    return updateMovie(req, res, id);
  }

  res.writeHead(404);
  res.end(JSON.stringify({ message: "Invalid route" }));
}

module.exports = handleRoutes;
