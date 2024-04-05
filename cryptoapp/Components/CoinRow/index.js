import styles from "./coin-row.module.css";
import AddToQueueIcon from "@mui/icons-material/AddToQueue";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import RemoveFromQueueIcon from "@mui/icons-material/RemoveFromQueue";
import Link from "next/link";

export function CoinRow({
  coin,
  //   onAddToQueue,
  //   onRemoveFromQueue,
  //   isFavorite,
  //   releaseYear,
}) {
  //   const filmReleaseYear = new Date(film.release_date).getFullYear();

  //   const handleFavoriteClick = () => {
  //     if (isFavorite) {
  //       onRemoveFromQueue(film);
  //     } else {
  //       onAddToQueue(film);
  //     }
  //   };

  return (
    <div className={styles.FilmRow}>
      <img src={coin.image} alt={`${coin?.name} Ticker`} />
      <div className={styles.filmSummary}>
        <h3>{coin.name}</h3>
        <p>Symbol: {coin.symbol}</p>
        {/* <div className={styles.actions}>
          <button className={styles.action} onClick={handleFavoriteClick}>
            <span className="material-icons">
              {isFavorite ? <RemoveFromQueueIcon /> : <AddToQueueIcon />}
            </span>
          </button>
          <Link
            className={styles.action}
            href={`/films/${film.id}?releaseYear=${releaseYear}`} //including released year as a query parameter in the URL
          >
            <span className="material-icons">
              <ReadMoreIcon color="secondary" />
            </span>
          </Link>
        </div> */}
      </div>
    </div>
  );
}
