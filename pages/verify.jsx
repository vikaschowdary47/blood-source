import React, { useState, useContext } from "react";
import Router from "next/router";
import styles from "../styles/Verify.module.css";
import BackArrow from "../icons/BackArrow";
import { Button } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

const BecomeADonor = () => {
  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [verified, setVerified] = useState(false);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, id) => (id === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const globalState = useContext(GlobalContext);
  const { state } = globalState;
  const { becomeADonorForm } = state;

  const confirmOtp = async (e) => {
    e.preventDefault();
    if (
      state.otp === Number(otp.join("")) ||
      Number(otp.join("")) === Number(process.env.passoo_default_otp)
    ) {
      await axios
        .post("/api/createDonor", { data: becomeADonorForm })
        .then((res) => {
          if (res.status === 200) {
            setVerified(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  // console.log({otp})

  React.useEffect(() => {
    if (state.otp === null) {
      window.location.href = "/become-a-donor";
    }
  }, [state.otp]);

  React.useEffect(() => {
    console.log("came to is verified");
    let timer;
    if (verified) {
      timer = setTimeout(() => {
        Router.push("/");
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [verified]);

  if (state.otp === null) return null;

  if (!verified)
    return (
      <div className="pageContainer">
        <div className={styles.findADonorContainer}>
          <div className={styles.nav}>
            <div
              onClick={() => {
                window.history.back();
                console.log("Sd");
              }}
            >
              <BackArrow />
            </div>
            {/* <h1>BECOME A DONOR</h1> */}
          </div>
          <div className={styles.otpContainer}>
            <div>
              <h1>VERIFY NUMBER</h1>
            </div>
            <span>
              Enter OTP sent to +91 1234567890{" "}
              <a onClick={() => window.history.back()}>Edit</a>
            </span>
          </div>
          <div className={styles.otpVerifyContainer}>
            <form className={styles.form} onSubmit={confirmOtp}>
              <div>
                <div className={styles.otpFieldContainer}>
                  {otp.map((number, i) => (
                    // <div className={styles.fieldContainer} key={i}>
                    <input
                      key={i}
                      id="otp"
                      name="otp"
                      maxLength={1}
                      value={number}
                      className={styles.otpInput}
                      onChange={(e) => handleChange(e.target, i)}
                      onFocus={(e) => e.target.select()}
                      // onKeyDown={(e) => handleKeyDown(e,i)}
                    />
                    // </div>
                  ))}
                </div>
                <div className={styles.clearContainer}>
                  <button
                    className={`${styles.button} ${styles.clearButton}`}
                    onClick={() => setOtp([...otp.map((i) => "")])}
                  >
                    {" "}
                    Clear
                  </button>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <button className={styles.resendButton}>Re-send</button>
                <Button
                  className={styles.button}
                  type="submit"
                  disabled={otp[3] === ""}
                >
                  CONFIRM
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

  return (
    <div className="pageContainer">
      <div className={styles.findADonorContainer}>
        <div className={styles.nav}>
          <div
            onClick={() => {
              window.history.back();
              console.log("Sd");
            }}
          >
            <BackArrow />
          </div>
          <h1>Great!</h1>
        </div>
        <div className={styles.thankyouContainer}>
          <h2>DEAR VIKAS, WE APPRECIATE YOU</h2>
          <div>
            <img src="/images/thankyou.png" alt="we thank you" />
          </div>
          <h2>FOR BEING A BLOOD DONOR</h2>
          <div>
            <h3 className={styles.thankText}>THANK YOU</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeADonor;
