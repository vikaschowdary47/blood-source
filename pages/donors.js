import React from "react";
import styles from "../styles/Donors.module.css";
import WhiteArrow from "../icons/WhiteArrow";
import DonorDetails from "../components/DonorDetails";

const Donors = () => {
  const donors = [
    { name: "vikas", location: "Hyderabad", type: "donor", mobile: 1234567890 },
    {
      name: "Ramesh",
      location: "Tadipatri",
      type: "donor",
      mobile: 1234557890,
    },
    { name: "Harsha", location: "Chirala", type: "donor", mobile: 1234567890 },
  ];
  return (
    <div className={styles.DonorContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.nav}>
          <div
            onClick={() => {
              window.history.back();
              console.log("Sd");
            }}
          >
            <WhiteArrow />
          </div>
        </div>
        <div className={styles.findADonorContainer}>
          <div className={styles.donorCount}>
            <span className={styles.donorNumber}>120966</span>
            <span className={styles.donorText}>Donors</span>
          </div>
          <button
            className={styles.findButton}
            onClick={() => Router.push("/find-a-donor")}
          >
            <div className={styles.findButtonText}>MODIFY SEARCH</div>
          </button>
        </div>
        <div className={styles.donorDetailsBody}>
          {donors.map((donor, i) => (
            <DonorDetails donor={donor} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Donors;
