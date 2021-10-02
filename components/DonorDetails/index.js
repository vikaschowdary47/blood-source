import React from "react";
import AccountRound from "../../icons/AccountRound";
import WhatsApp from "../../icons/WhatsApp";
import styles from "./DonorDetails.module.css";

const DonorDetails = ({ donor }) => {
  return (
    <div className={styles.mainBody}>
      <AccountRound />
      <div className={styles.detailsBody}>
        <div>
          {donor.name}
          <div className={styles.location}>{donor.location}</div>
          <div className={styles.contactContainer}>
            <a href={`tel:${donor.mobile}`} className={styles.makeACall}>
              MAKE A CALL
            </a>
            <a
              href={`https://wa.me/${donor.mobile}`}
              className={styles.whatsApp}
            >
              <WhatsApp />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDetails;
