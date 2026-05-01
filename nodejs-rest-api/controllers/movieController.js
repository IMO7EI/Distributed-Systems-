const { readData, writeData } = require('../utils/fileHelper');

// GET all
function getMovies(req, res) {
  const movies = readData();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(movies));
}

// GET by ID
function getMovieById(req, res, id) {
  const movies = readData();
  const movie = movies.find(m => m.id === id);

  if (movie) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(movie));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not found" }));
  }
}

// POST
function createMovie(req, res) {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const newMovie = JSON.parse(body);
    const movies = readData();

    movies.push(newMovie);
    writeData(movies);

    res.writeHead(201);
    res.end(JSON.stringify(newMovie));
  });
}

// DELETE
function deleteMovie(req, res, id) {
  let movies = readData();
  const index = movies.findIndex(m => m.id === id);

  if (index !== -1) {
    movies.splice(index, 1);
    writeData(movies);

    res.writeHead(200);
    res.end(JSON.stringify({ message: "Deleted" }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Not found" }));
  }
}

// PUT
function updateMovie(req, res, id) {
  let body = '';

  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    const updatedData = JSON.parse(body);
    let movies = readData();

    const index = movies.findIndex(m => m.id === id);

    if (index !== -1) {
      movies[index] = { id, ...updatedData };
      writeData(movies);

      res.writeHead(200);
      res.end(JSON.stringify(movies[index]));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Not found" }));
    }
  });
}

module.exports = {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie
};
