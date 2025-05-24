import React from "react";
import styles from "./Modal.module.css";
import closeBtn from "../../assets/ConfirmationPage/closeBtn.svg";
const InstructionModal = ({
  isOpen,
  onClose,
  instructions,
  setInstructions,
}) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div className={`${styles.modal} ${isOpen ? styles.active : ""}`}>
        <img
          src={closeBtn}
          className={styles.closeBtn}
          onClick={onClose}
          alt=""
        />

        <div className={styles.content}>
          <h1>Add Cooking instructions</h1>
          <div className={styles.input}>
            <textarea
              name=""
              id=""
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            ></textarea>
          </div>
          <p>
            The restaurant will try its best to follow your request. However,
            refunds or cancellations in this regard won’t be possible
          </p>

          <div className={styles.buttons}>
            <button
              onClick={(e) => {
                setInstructions("");
                onClose();
              }}
            >
              Cancel
            </button>
            <button onClick={onClose}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

const InputModal = ({
  isOpen,
  onClose,
  userPhone,
  setUserPhone,
  userAddress,
  setUserAddress,
  selected,
}) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div className={`${styles.modal} ${isOpen ? styles.active : ""}`}>
        <img
          src={closeBtn}
          className={styles.closeBtn}
          onClick={onClose}
          alt=""
        />
        <div className={styles.inputContent}>
          <h2>User Details</h2>
          <div className={styles.formGroup}>
            <label htmlFor="userPhone">Phone</label>
            <input
              type="text"
              name="userPhone"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </div>
          {selected === "Take Away" ? (
            <div className={styles.formGroup}>
              <label htmlFor="userAddress">Address</label>
              <input
                type="text"
                name="userAddress"
                value={userAddress}
                onChange={(e) => setUserAddress(e.target.value)}
              />
            </div>
          ) : (
            <></>
          )}
          <div className={styles.buttons}>
            <button
              onClick={() => {
                setUserPhone("");
                setUserAddress("");
                onClose();
              }}
              className={styles.cancel}
            >
              Cancel
            </button>
            <button onClick={onClose} className={styles.submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { InstructionModal, InputModal };
