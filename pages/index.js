import React from "react";
import Router from "next/router";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <img src="/images/redBanner.png" className={styles.mainBannerImage} />
      <div className={styles.findADonorContainer}>
        <div className={styles.donorCount}>
          <span className={styles.donorNumber}>120966</span>
          <span className={styles.donorText}>Donor's</span>
        </div>
        <button
          className={styles.findButton}
          onClick={() => Router.push("/find-a-donor")}
        >
          <div className={styles.findButtonText}>FIND A DONOR</div>
        </button>
      </div>
      <div className={styles.becomeADonorContainer}>
        <button
          className={styles.becomeButton}
          onClick={() => Router.push("/become-a-donor")}
        >
          <div className={styles.becomeButtonText}>BECOME A DONOR</div>
        </button>
        <img src="/images/becomeADonor.png" />
      </div>
      {/* <img src="/images/waves.png" width="100" /> */}

      <div className={styles.mainQuote}>
        <blockquote>
          "The blood is red gold in time of saving a life."
        </blockquote>
      </div>
    </div>
  );
};

export default Home;
