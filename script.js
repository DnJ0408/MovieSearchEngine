const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njc0ZmEyN2QyMDcwNWQzOGMyZmM2YjhlNzE5YTgyOSIsIm5iZiI6MTczNjI5NjYzNC45NzksInN1YiI6IjY3N2RjOGJhMzRhNGU3NWU0OTdhZjcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6sU7icVuWpbcMVGPDwHEInLmc5DkpTr0vv88g8jgEI'
  }
};

const fetchMovies = async function () {
  try {
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options)
    const data = await res.json(); // 응답 데이터를 JSON으로 변환
    const movieList = data.results

    displayMovies(movieList);
  } catch (err) {
    console.error(err);
  }
}

// displayMovies를 
function displayMovies(movieList) {
  console.log(movieList);

  const movieArea = document.querySelector(".cards");

  let html = "";
  
  movieList.forEach((movie) => {
    html += `
    <div class="card" onclick="showId(${movie.id})">
      <img src= "https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top"/>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
          <p class="card-text>${movie.overview}</p>
          <p>rate : ${movie.vote_average}</p>
      </div>
    </div>
    `;
  });

  movieArea.innerHTML= html; 
}

fetchMovies();

// movieArea에 집어넣는 코드가 누락이 되어있었다.
// 프로세스를 머리에 정리를 해야한다!!!! 중요