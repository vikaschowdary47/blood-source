import React, { useState,useContext } from "react";
import Router from "next/router";
import { Row, Col, Spinner } from "react-bootstrap";
import styles from "../styles/FindADonor.module.css";
import BackArrow from "../icons/BackArrow";
import { Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

import * as Yup from "yup";
// import Check from "../icons/Check";
import data from "../data.json";
import { GlobalContext } from "../context/GlobalState";

const SignupSchema = Yup.object().shape({
  bloodGroup: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
  mandal: Yup.string().required("Required"),
  donorPrivacy: Yup.bool().required("Required"),
});

const FindADonor = () => {
  // console.log({ data });
  const [loading,setLoading] = useState(false)

  const globalState = useContext(GlobalContext);
  const {state,setFindADonorForm} = globalState
  const {findADonorForm} = state;

  const getDistricts = (state) => {
    const index = data.states.findIndex((item) => item.name === state);
    return data.states[index].districts;
  };

  const getTowns = (state, district) => {
    const index = data.states.findIndex((item) => item.name === state);
    const stateIndex = data.states[index].districts;
    const districtIndex = stateIndex.findIndex(
      (item) => item.name === district
    );
    return stateIndex[districtIndex].towns;
  };

  return (
    <div className="pageContainer">
      <div className={styles.findADonorContainer}>
        <div className={styles.nav}>
          <div
            onClick={() => {
              window.history.back();
            }}
          >
            <BackArrow />
          </div>
          <h1>FIND A DONOR</h1>
        </div>
        <div>
          <Formik
            initialValues={findADonorForm}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              setLoading(true)
              setFindADonorForm(values)
              Router.push("/donors");
            }}
          >
            {({ errors, touched, values }) => {
              // console.log({ values });
              return (
                <Form className={styles.form}>
                  <div className={styles.fieldContainer}>
                    <Field
                      as="select"
                      id="bloodGroup"
                      name="bloodGroup"
                      required
                      className={`form-select ${
                        values.bloodGroup === "" && styles.defaultFormValue
                      }`}
                    >
                      <option value="" className={styles.optionValue}>
                        Required Blood Group
                      </option>
                      <option value="a-positive" className={styles.optionValue}>
                        A +
                      </option>
                      <option value="a-negative" className={styles.optionValue}>
                        A -
                      </option>
                      <option value="b-positive" className={styles.optionValue}>
                        B +
                      </option>
                      <option value="b-negative" className={styles.optionValue}>
                        B -
                      </option>
                      <option value="ab-positive" className={styles.optionValue}>
                        AB +
                      </option>
                      <option value="ab-negative" className={styles.optionValue}>
                        AB -
                      </option>
                      <option value="o-positive" className={styles.optionValue}>
                        O +
                      </option>
                      <option value="o-negative" className={styles.optionValue}>
                        O -
                      </option>
                    </Field>
                    {errors.bloodGroup && touched.bloodGroup ? (
                      <div className="errorText">{errors.bloodGroup}</div>
                    ) : null}
                  </div>
                  <div className={styles.fieldContainer}>
                    <Field
                      as="select"
                      id="state"
                      name="state"
                      required
                      className={`form-select ${
                        values.state === "" && styles.defaultFormValue
                      }`}
                    >
                      <option value="0" className={styles.optionValue}>
                        Select State
                      </option>
                      {data.states.map((state, i) => (
                        <option
                        key={i}
                          value={state.name}
                          className={styles.optionValue}
                        >
                          {state.name}
                        </option>
                      ))}
                    </Field>
                    {errors.state && touched.state ? (
                      <div className="errorText">{errors.state}</div>
                    ) : null}
                  </div>
                  <div className={styles.fieldContainer}>
                    <Field
                      as="select"
                      id="district"
                      name="district"
                      required
                      className={`form-select ${
                        values.state === "" && styles.defaultFormValue
                      }`}
                    >
                      <option value="0" className={styles.optionValue}>
                        Select District
                      </option>
                      {values.state &&
                        getDistricts(values.state).map((district,i) => (
                          <option
                        key={i}

                            value={district.name}
                            className={styles.optionValue}
                          >
                            {district.name}
                          </option>
                        ))}
                    </Field>
                    {errors.district && touched.district ? (
                      <div className="errorText">{errors.district}</div>
                    ) : null}
                  </div>
                  <div className={styles.fieldContainer}>
                    <Field
                      as="select"
                      id="mandal"
                      name="mandal"
                      required
                      className={`form-select ${
                        values.mandal === "" && styles.defaultFormValue
                      }`}
                    >
                      <option value="0" className={styles.optionValue}>
                        Select Mandal/Town
                      </option>
                      {values.district &&
                        getTowns(values.state, values.district).map((town,i) => (
                          <option
                        key={i}

                            value={town.name}
                            className={styles.optionValue}
                          >
                            {town.name}
                          </option>
                        ))}
                    </Field>
                    {errors.mandal && touched.mandal ? (
                      <div className="errorText">{errors.mandal}</div>
                    ) : null}
                  </div>
                  <div className={styles.fieldContainer}>
                    <div className={styles.checkBoxContainer}>
                      <Field
                        type="checkbox"
                        id="donorPrivacy"
                        name="donorPrivacy"
                        className={styles.checkmark}
                        required
                      />
                      By confirming you agree that you&apos;re not going to
                      mis-use donor&apos;s details.
                    </div>
                  </div>

                  <button className={styles.button} type="submit">
                    {loading ? <Spinner animation="border" /> : 'FIND A DONOR '}

                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default FindADonor;
