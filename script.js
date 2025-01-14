const popularUrl = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';
const totalUrl = 'https://api.themoviedb.org/3/search/movie?query=%EC%95%88%EB%85%95&include_adult=false&language=ko&page=1';
const movieCard = document.querySelector("#cards");
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search");

//* --- 영화 데이터 불러오기 --- *//
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njc0ZmEyN2QyMDcwNWQzOGMyZmM2YjhlNzE5YTgyOSIsIm5iZiI6MTczNjI5NjYzNC45NzksInN1YiI6IjY3N2RjOGJhMzRhNGU3NWU0OTdhZjcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6sU7icVuWpbcMVGPDwHEInLmc5DkpTr0vv88g8jgEI'
  }
};

let movieList = [];


const fetchMovies = async function (url) {
  try { // try 블록 내 코드가 먼저 실행되고 이 안에서 예외가 발생하면 catch 블록 코드가 실행된다.
    const res = await fetch(url, options) //fetch 실행
    const data = await res.json(); // 응답 데이터를 JSON으로 변환
    return movieList = data.results // JSON으로 변환하고 받은 results값을 movieList 곳에 할당한다.
    
  } catch (err) {
    console.error(err);
  }
}

// * --- 받아온 데이터를 html에 카드로 구현하는 함수--- *//
function displayMovies(movieList) {
  let html = "";
  movieList.forEach(function (movie) {
    html += `
    <div class="card" data-movie="${movie.id}">
      <img src= "https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
      <h2 class="card-title">${movie.title}</h2>
      <p>평점 : ${movie.vote_average}</p>
    </div>
    `;
  });
  movieCard.innerHTML= html; // movieCard의 내부 html요소에 내가 작성한 html을 할당한다.
}

//* --- 검색 기능 구현 --- *//
searchBtn.addEventListener("click", function () {
  const keyword = searchInput.value; // 사용자가 입력한 검색어
  const searchUrl = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko&page=1`
 
  fetchMovies(searchUrl).then(function (movieList) {
    // 검색된 영화들 중에서 제목에 검색어가 포함된 영화들만 필터링
    const filteredMovies = movieList.filter(function (movie) {
      return movie.title.includes(keyword);  // 제목에 검색어가 포함되어 있는지 확인
    });
    
    // 필터링된 결과를 화면에 표시
    displayMovies(filteredMovies);

    if (keyword === 0) {
      displayMovies(movieList);
    }
});
});

//* --- 모달 기능 구현 --- *//
document.querySelector("#cards").addEventListener("click", function (e) {
  //! 예외처리
  if (e.target.closest("div") && e.target.closest("div").classList.contains("card")) {
    const movieId = e.target.closest(".card").getAttribute("data-movie")
  modal.style.display = "block";
  openModal(movieList, movieId);
  }
})

//* --- 모달 열기 --- *//
function openModal(movieList, movieId) {
  const modal = document.querySelector("#modal");
  let matchedMovie = movieList.filter(function (movie) {
    if (movie.id == movieId) {
      return movie;
    }
  })
  const modalCard = document.querySelector(".modal-content");

 let html = `
          <img id="modal-img" src="https://image.tmdb.org/t/p/w500/${matchedMovie[0].poster_path}" alt="Movie Poster">
          <h2 id="modal-title">${matchedMovie[0].title}</h2>
          <p>${matchedMovie[0].overview}</p>
          <p id="modal-rating">평점 : ${matchedMovie[0].vote_average}</p>
 `;
  modalCard.innerHTML = html;
  modal.style.display = "block";
}

//* --- 모달 닫기 --- *//
document.querySelector(".close").addEventListener("click", function () {
  document.querySelector("#modal").style.display = "none";
});

//* --- HTML 화면에 보여줄 displayMovies 함수 실행 --- *//
fetchMovies(popularUrl).then(function (movieList) {
  displayMovies(movieList);
});