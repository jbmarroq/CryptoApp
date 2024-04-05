// components/Carousel.js

import React from "react";
import styles from "./carousel.module.css";

export const Carousel = ({ coins }) => {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <ul className={styles.coinList}>
          {coins.map((coin) => (
            <li key={coin.id} className={styles.coinItem}>
              <img
                src={coin.image}
                alt={coin.name}
                className={styles.coinImage}
              />
              <div className={styles.coinInfo}>
                <p>{coin.symbol.toUpperCase()}</p>
                <p>AU${coin.current_price}</p>
                <p
                  className={
                    coin.price_change_percentage_24h < 0
                      ? styles.negative
                      : styles.positive
                  }
                >
                  {coin.price_change_percentage_24h}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
