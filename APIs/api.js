//* --- API 요청 옵션 --- *//
export const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njc0ZmEyN2QyMDcwNWQzOGMyZmM2YjhlNzE5YTgyOSIsIm5iZiI6MTczNjI5NjYzNC45NzksInN1YiI6IjY3N2RjOGJhMzRhNGU3NWU0OTdhZjcwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.d6sU7icVuWpbcMVGPDwHEInLmc5DkpTr0vv88g8jgEI'
    }
  };

export let movieList = [];

//* --- 영화 데이터 불러오기 --- *//  
 export const fetchMovies = async function (url) {
    try { // try 블록 내 코드가 먼저 실행되고 이 안에서 예외가 발생하면 catch 블록 코드가 실행된다.
      const res = await fetch(url, options) //fetch 실행
      const data = await res.json(); // 응답 데이터를 JSON으로 변환
      console.log(data);
      return movieList = data.results // JSON으로 변환하고 받은 results값을 movieList 곳에 할당한다.
      
    } catch (err) {
      console.error(err);
    }
  }