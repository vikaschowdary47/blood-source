import React, { useRef } from "react";
import Router from "next/router";
import { Row, Col } from "react-bootstrap";
import styles from "../styles/FindADonor.module.css";
import BackArrow from "../icons/BackArrow";
import { Button } from "react-bootstrap";
import { Formik, Field, Form } from "formik";

import * as Yup from "yup";
import Check from "../icons/Check";

const SignupSchema = Yup.object().shape({
  bloodGroup: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
  mandal: Yup.string().required("Required"),
  donorPrivacy: Yup.bool().required("Required"),
});

const FindADonor = () => {
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
          <h1>FIND A DONOR</h1>
        </div>
        <div>
          <Formik
            initialValues={{
              bloodGroup: "",
              state: "",
              district: "",
              mandal: "",
              donorPrivacy: false,
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              // console.log(values);
              Router.push("/donors");
            }}
          >
            {({ errors, touched, values, handleChange }) => {
              return (
                <Form>
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
                      <option value="1" className={styles.optionValue}>
                        B +
                      </option>
                      <option value="1" className={styles.optionValue}>
                        A -
                      </option>
                      <option value="1" className={styles.optionValue}>
                        B -
                      </option>
                      <option value="2" className={styles.optionValue}>
                        AB +
                      </option>
                      <option value="2" className={styles.optionValue}>
                        AB -
                      </option>
                      <option value="3" className={styles.optionValue}>
                        O +
                      </option>
                      <option value="3" className={styles.optionValue}>
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
                      <option value="1" className={styles.optionValue}>
                        Ap
                      </option>
                      <option value="2" className={styles.optionValue}>
                        Tp
                      </option>
                      <option value="3" className={styles.optionValue}>
                        HP
                      </option>
                      <option value="4" className={styles.optionValue}>
                        KN
                      </option>
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
                      <option value="1" className={styles.optionValue}>
                        Ap
                      </option>
                      <option value="2" className={styles.optionValue}>
                        Tp
                      </option>
                      <option value="3" className={styles.optionValue}>
                        HP
                      </option>
                      <option value="4" className={styles.optionValue}>
                        KN
                      </option>
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
                      <option value="1" className={styles.optionValue}>
                        Ap
                      </option>
                      <option value="2" className={styles.optionValue}>
                        Tp
                      </option>
                      <option value="3" className={styles.optionValue}>
                        HP
                      </option>
                      <option value="4" className={styles.optionValue}>
                        KN
                      </option>
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
                      By confirming you agree that you're not going to mis-use
                      donor's details.
                    </div>
                  </div>

                  <button className={styles.button} type="submit">
                    FIND A DONOR
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
