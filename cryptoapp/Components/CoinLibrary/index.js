import { useState, useEffect } from "react";
import { CoinRow } from "../CoinRow";
import { CoinsTable } from "../CoinTable/CoinTable";
import { GECKO_API_KEY } from "@/Config/CoinGeckoAPI";
import styles from "./film-library.module.css";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";

export function CoinLibrary({}) {
  // const router = useRouter();
  // const { query } = router;

  //   const [favoriteFilms, setFavoriteFilms] = useState([]);
  //   const [showFavorites, setShowFavorites] = useState(false);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [releaseYear, setReleaseYear] = useState(query.releaseYear || 2020); // Reading releaseYear from query object or when user changes state

  // Retrieve favorite films from localStorage on mount
  //   useEffect(() => {
  //     const storedFavoriteFilms = localStorage.getItem("favoriteFilms");
  //     if (storedFavoriteFilms) {
  //       setFavoriteFilms(JSON.parse(storedFavoriteFilms));
  //     }
  //   }, []);
  const aud = "aud";
  const fetcher = (...args) =>
    fetch(...args, {
      method: "GET",
      headers: {
        "x-cg-demo-api-key": GECKO_API_KEY,
      },
    }).then((res) => res.json());

  const URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${aud}&per_page=10&page=1&price_change_percentage=24h`;

  const { data: trendingCoinsData, error, mutate } = useSWR(URL, fetcher);

  console.log("TrendingCoinsData : ", trendingCoinsData);
  if (error) return <div>Failed to load coins</div>;
  if (!trendingCoinsData) return <div>Loading...</div>;

  //   const addToFaves = (film) => {
  //     const updatedFavoriteFilms = [...favoriteFilms, film];
  //     setFavoriteFilms(updatedFavoriteFilms);
  //     localStorage.setItem("favoriteFilms", JSON.stringify(updatedFavoriteFilms));
  //   };

  //   const removeFromFaves = (film) => {
  //     const updatedFavoriteFilms = favoriteFilms.filter((f) => f.id !== film.id);
  //     setFavoriteFilms(updatedFavoriteFilms);
  //     localStorage.setItem("favoriteFilms", JSON.stringify(updatedFavoriteFilms));
  //   };
  //   const loadMoreMovies = async (e) => {
  //     e.preventDefault();
  //     const nextPage = fetchedPage + 1;
  //     const nextUrl = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${nextPage}&primary_release_year=${releaseYear}&sort_by=popularity.desc`;
  //     try {
  //       const moreFilmsData = await fetcher(nextUrl);
  //       // console.log("morefilms:", moreFilmsData);
  //       mutate(
  //         (currentData) => ({
  //           ...currentData,
  //           results: [...(currentData?.results || []), ...moreFilmsData.results],
  //           page: nextPage,
  //         }),
  //         false
  //       );

  //       console.log("newlist:", films); // Append new films to existing list
  //     } catch (error) {
  //       console.log("Failed to fetch data:", error);
  //     }
  //   };

  //   const handleYearChange = (event) => {
  //     const value = event.target.value;
  //     if (/^\d{0,4}$/.test(value) && parseInt(value) > 1882);
  //     {
  //       const year = parseInt(value);
  //       setReleaseYear(year);
  //       // Update the URL query parameter
  //       if (year.lenght === 4) {
  //         router.push({
  //           pathname: router.pathname,
  //           query: { ...router.query, releaseYear: year },
  //         });
  //       }
  //     }
  //     // setCurrentPage(1); // Reset the page number when the year changes
  //   };

  const coinsToDisplay = trendingCoinsData;

  return (
    <>
      <div className={styles.FilmLibrary}>
        <div className={styles.filmList}>
          {/* <h1 className={styles.sectionTitle}>
            FILMS
            <div>
              <label htmlFor="releaseYear">Release Year:</label>
              <input
                id="releaseYear"
                type="number"
                value={releaseYear}
                onChange={handleYearChange}
              />
            </div>
          </h1>
          <div className={styles.filmListFilters}>
            <button
              className={`${styles.filmListFilter} ${
                !showFavorites ? styles.isActive : ""
              }`}
              onClick={() => setShowFavorites(false)}
            >
              ALL
              <span className={styles.sectionCount}>{films.length}</span>
            </button>
            <button
              className={`${styles.filmListFilter} ${
                showFavorites ? styles.isActive : ""
              }`}
              onClick={() => setShowFavorites(true)}
            >
              FAVES
              <span className={styles.sectionCount}>
                {favoriteFilms.length}
              </span>
            </button>
            <button className={styles.loadMoreButton} onClick={loadMoreMovies}>
              Load More
            </button>
          </div> */}
          {coinsToDisplay.length > 0 ? (
            coinsToDisplay.map((coin) => (
              <CoinRow
                key={coin.id}
                coin={coin}
                //   onAddToQueue={addToFaves}
                //   onRemoveFromQueue={removeFromFaves}
                //   isFavorite={favoriteFilms.some((f) => f.id === film.id)}
                //   releaseYear={releaseYear}
              />
            ))
          ) : (
            <div>
              <br></br>
            </div>
          )}
        </div>
      </div>

      <div className={styles.filmDetails}>
        <h1 className={styles.sectionTitle}>Table:</h1>
        <CoinsTable />
      </div>
    </>
  );
}

// export const getServerSideProps = async ({ params }) => {
//   const { currentPage, releaseYear } = params;
//   const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${currentPage}&primary_release_year=${releaseYear}&sort_by=popularity.desc`;
//   const data = await fetcher(url);
//   console.log("InitialDATA : ", data);

//   return {
//     props: {
//       initialData: data.results,
//     },
//   };
// };
