import React from "react";
import Router from "next/router";
import styles from "../styles/Home.module.css";

const Home = ({donors}:any) => {
  return (
    <div className={styles.homeContainer}>
      <img src="/images/redBanner.png" className={styles.mainBannerImage} />
      <div className={styles.findADonorContainer}>
        <div className={styles.donorCount}>
          <span className={styles.donorNumber}>{donors.length}</span>
          <span className={styles.donorText}>Donor&apos;s</span>
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
        <img src="/images/becomeADonor.png" alt="becomeADonor"/>
      </div>
      {/* <img src="/images/waves.png" width="100" /> */}

      <div className={styles.mainQuote}>
        <blockquote>
          &quot;The blood is red gold in time of saving a life.&quot;
        </blockquote>
      </div>
    </div>
  );
};


export default Home;


export const getServerSideProps = async () => {
 const getDonors = await fetch(`${process.env.API_PATH}/api/getDonors`)
 const donors = await getDonors.json();

 return {
  props:{donors}
 }
}
