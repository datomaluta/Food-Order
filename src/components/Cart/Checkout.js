import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
import useInput from "../../hooks/use-input";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHanlder: nameBlurHanlder,
    reset: nameInputReset,
  } = useInput(isEmpty);

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: StreetHasError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHanlder: streetBlurHandler,
    reset: streetInputReset,
  } = useInput(isEmpty);

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: postalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    valueBlurHanlder: postalCodeBlurHandler,
    reset: postalCodeInputReset,
  } = useInput(isFiveChars);

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHanlder: cityBlurHandler,
    reset: cityInputReset,
  } = useInput(isEmpty);

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postal: enteredPostalCode,
    });

    nameInputReset();
    streetInputReset();
    postalCodeInputReset();
    cityInputReset();
  };

  const nameControlClasses = `${classes.control} ${
    !nameHasError ? "" : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    !StreetHasError ? "" : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    !postalCodeHasError ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    !cityHasError ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          onBlur={nameBlurHanlder}
          onChange={nameChangeHandler}
          type="text"
          id="name"
          value={enteredName}
        />
        {nameHasError && <p>Please Enter valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input
          onBlur={streetBlurHandler}
          onChange={streetChangeHandler}
          value={enteredStreet}
          type="text"
          id="street"
        />
        {StreetHasError && <p>Please Enter valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input
          value={enteredPostalCode}
          onBlur={postalCodeBlurHandler}
          onChange={postalCodeChangeHandler}
          type="text"
          id="postal"
        />
        {postalCodeHasError && <p>Please Enter valid postal code</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input
          value={enteredCity}
          onBlur={cityBlurHandler}
          onChange={cityChangeHandler}
          type="text"
          id="city"
        />
        {cityHasError && <p>Please Enter valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
