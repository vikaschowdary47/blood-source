import React,{useState,useEffect,useContext} from "react";
import Router from 'next/router'
import styles from "../styles/Donors.module.css";
import WhiteArrow from "../icons/WhiteArrow";
import DonorDetails from "../components/DonorDetails";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import { Spinner } from "react-bootstrap";

const Donors = () => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  // const [filteredData,setFilteredData] = useState([])

  const globalState = useContext(GlobalContext);
  const {state} = globalState
  const {findADonorForm} = state;

  React.useEffect(() => {
    if(findADonorForm.donorPrivacy === false){
      window.location.href = '/find-a-donor'
    }
  },[findADonorForm])

  const getDonors = async () => {
    await axios('/api/getDonors')
    .then(res => {
      setData(res.data)
      setLoading(false)
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    getDonors()
  },[])



  const filteredData = data.filter(donor =>  {
    return (
      donor.data.bloodGroup === findADonorForm.bloodGroup &&
      donor.data.district === findADonorForm.district &&
      donor.data.mandal === findADonorForm.mandal &&
      donor.data.state === findADonorForm.state 
    )
  })

  // console.log(filteredData)
  
  
  // if(findADonorForm.donorPrivacy === false) return null;
  // if(loading) return <Spinner animation="border" />
  return (
    <div className={styles.DonorContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.nav}>
          <div
            onClick={() => {
              window.history.back();
            }}
          >
            <WhiteArrow />
          </div>
        </div>
        <div className={styles.findADonorContainer}>
          <div className={styles.donorCount}>
            <span className={styles.donorNumber}>{filteredData.length}</span>
            <span className={styles.donorText}>Donors</span>
          </div>
          <button
            className={styles.findButton}
            onClick={() => Router.push("/find-a-donor")}
          >
            <div className={styles.findButtonText}>MODIFY SEARCH</div>
          </button>
        </div>
        {loading ? <div className={styles.noDataContainer}>

        <Spinner animation="border" />
        </div>
        :
        <div className={styles.donorDetailsBody}>
        {filteredData.length >= 1 ? 
          filteredData.map((donor, i) => (
            <DonorDetails donor={donor.data} key={i} />
          )) : 
          <div className={styles.noDataContainer}>
            <h3>Sorry no Donors Found!</h3>
          </div>
        }
        </div>
        }

      </div>
    </div>
  );
};

export default Donors;
