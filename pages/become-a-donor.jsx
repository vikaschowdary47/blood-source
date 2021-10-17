import React, { useState, useContext } from "react";
import Router from "next/router";
import { Spinner } from "react-bootstrap";
import styles from "../styles/FindADonor.module.css";
import BackArrow from "../icons/BackArrow";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { GlobalContext } from "../context/GlobalState";
import { getStates, getDistricts, getTowns } from "../helpers/getLocations";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  mobile: Yup.string()
    .min(10)
    .max(10)
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  bloodGroup: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  district: Yup.string().required("Required"),
  mandal: Yup.string().required("Required"),
  donorPrivacy: Yup.bool().required("Required"),
});

const BecomeADonor = () => {
  const globalState = useContext(GlobalContext);
  const { state, setOtp, setBecomeADonorForm } = globalState;
  const { becomeADonorForm } = state;

  const [loading, setLoading] = useState(false);

  const states = [...new Set(getStates())];

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
          <h1>BECOME A DONOR</h1>
        </div>
        <div>
          <Formik
            initialValues={becomeADonorForm}
            validationSchema={SignupSchema}
            onSubmit={async (values) => {
              setLoading(true);
              setBecomeADonorForm(values);
              const otp = Math.floor(1000 + Math.random() * 9000);
              setOtp(otp);
              const url = `https://cors.bridged.cc/${process.env.passoo_url}?key=${process.env.passoo_key}&secret=${process.env.passoo_secret_key}&from=FinWise&to=91${values.mobile}&text=OTP+for+registration+is+:+${otp}`;
              const sendOtpRequest = await fetch(url, {
                method: "GET",
                headers: { "Access-Control-Allow-Origin": "*" },
              });
              const response = await sendOtpRequest.json();
              if (response && response.status === "0") {
                setLoading(false);
                Router.push("/verify");
              }
            }}
          >
            {({ errors, touched, values }) => {
              return (
                <Form className={styles.form}>
                  <div className={styles.fieldContainer}>
                    <Field
                      id="name"
                      name="name"
                      placeholder="Name"
                      className="form-input"
                      // value={values.name}
                      required
                    />
                    {errors.name && touched.name ? (
                      <div className="errorText">{errors.name}</div>
                    ) : null}
                  </div>
                  <div className={styles.fieldContainer}>
                    <Field
                      id="mobile"
                      name="mobile"
                      placeholder="Mobile"
                      className="form-input"
                      required
                    />
                    {errors.mobile && touched.mobile ? (
                      <div className="errorText">{errors.mobile}</div>
                    ) : null}
                  </div>
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
                      {states.map((state, i) => (
                        <option
                          key={i}
                          value={state}
                          className={styles.optionValue}
                        >
                          {state}
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
                        [...new Set(getDistricts(values.state))].map(
                          (district, i) => (
                            <option
                              key={i}
                              value={district}
                              className={styles.optionValue}
                            >
                              {district}
                            </option>
                          )
                        )}
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
                        [
                          ...new Set(getTowns(values.state, values.district)),
                        ].map((town, i) => (
                          <option
                            key={i}
                            value={town}
                            className={styles.optionValue}
                          >
                            {town}
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
                      By registering we make your contact visible for others.
                    </div>
                  </div>

                  <button className={styles.button} type="submit">
                    {loading ? (
                      <Spinner animation="border" />
                    ) : (
                      "BECOME A DONOR"
                    )}
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

export default BecomeADonor;
