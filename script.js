const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njc0ZmEyN2QyMDcwNWQzOGMyZmM2YjhlNzE5YTgyOSIsIm5iZiI6MTczNjI5NjYzNC45NzksInN1YiI6IjY3N2RjOGJhMzRhNGU3NWU0OTdhZjcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6sU7icVuWpbcMVGPDwHEInLmc5DkpTr0vv88g8jgEI'
  }
};

const fetchMovies = async function () {
  try { // try 블록 내 코드가 먼저 실행되고 이 안에서 예외가 발생하면 catch 블록 코드가 실행된다.
    const res = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options) //fetch 실행
    const data = await res.json(); // 응답 데이터를 JSON으로 변환
    const movieList = data.results // JSON으로 변환하고 받은 results값을 movieList 곳에 할당한다.
    return movieList;
    
  } catch (err) {
    console.error(err);
  }
}

async function initMovies () {
  let dataBox = await fetchMovies();
  displayMovies(dataBox); // 매개 변수 movieList를 가진 displayMovies라는 함수를 실행한다.
  console.log(dataBox);
}

initMovies();
// 화면을 보여주기위해 displayMovies 라는 함수를 선언한다.
function displayMovies(movieList) {
  console.log(movieList);

  // id = cards 가 들어가 있는 태그를 선택해서 movieCard를 선언하고 할당
  const movieCard = document.querySelector("#cards");

  // html에 값을 넣어주기위해 초기값을 할당한다.
  let html = "";
  
  // 영화 정보가 담겨있는 movieList 배열을 forEach로 차례대로 반복한다.
  // movie의 poster_path, title, overview, vote_average 값을 가진 카드를 results 배열안의 배열 갯수만큼 만든다.
  movieList.forEach((movie) => {
    html += `
    <div class="card">
      <img src= "https://image.tmdb.org/t/p/w500/${movie.poster_path}"/>
      <div>
        <h2 class="card-title">${movie.title}</h2>
          <p>평점 : ${movie.vote_average}</p>
      </div>
    </div>
    `;
  });

  movieCard.innerHTML= html; // movieCard의 내부 html요소에 내가 작성한 html을 할당한다.
}
//-----------------------------------------------------------------------------------------

//TODO - 검색기능 구현

// movieArea에 집어넣는 코드가 누락이 되어있었다.
// 프로세스를 머리에 정리를 해야한다!!!! 중요

// 초기함수를 만들어서 initMovies async 로 감싸고 

// 인풋 박스에 검색 버튼을 쿼리로 가져와서 버튼을 클릭했을때 인풋 박스의 밸류값을 가져오면 검색어가된다.
// 필터로 걸러서 검색어와 일치하지 않는 것은 보이지 않게 처리한다.