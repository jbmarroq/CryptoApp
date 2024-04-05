// components/Carousel.js

import React from "react";
import styles from "./carousel.module.css";

export const Carousel = ({ coins }) => {
  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <ul className={styles.coinList}>
          {coins.map((coin, index) => (
            <li key={index} className={styles.coinItem}>
              <img
                src={coin.item.large}
                alt={coin.item.name}
                className={styles.coinImage}
              />
              <div className={styles.coinInfo}>
                <p>{coin.item.symbol.toUpperCase()}</p>
                <p>AU${coin.item.data.price.toFixed(2)}</p>
                <p
                  className={
                    coin.item.data.price_change_percentage_24h.aud < 0
                      ? styles.negative
                      : styles.positive
                  }
                >
                  {coin.item.data.price_change_percentage_24h.aud.toFixed(2)}%
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
