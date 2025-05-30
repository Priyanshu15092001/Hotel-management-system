import React from "react";
import styles from "./Modal.module.css";
import closeBtn from "../../assets/ConfirmationPage/closeBtn.svg";
const InstructionModal = ({
  isOpen,
  onClose,
  instructions,
  setInstructions,
  onSubmitInstructions,
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
            <button onClick={onSubmitInstructions}>Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

const InputModal = ({
  isOpen,
  onClose,
  onSubmitDetails,
  customer,
  setCustomer,
  selected,
}) => {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose}></div>}
      <div className={`${styles.modal} ${isOpen ? styles.active : ""}`}>
        <img
          src={closeBtn}
          className={styles.closeBtn}
          onClick={() => {
            onClose();
            setCustomer({ name: "", phone: "", address: "", count: 1 });
          }}
          alt=""
        />
        <div className={styles.inputContent}>
          <h2>User Details</h2>

          <div className={styles.formGroup}>
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              name="userName"
              value={customer.name}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="userPhone">Phone</label>
            <input
              type="tel"
              maxLength="10"
              pattern="\d{10}"
              name="userPhone"
              value={customer.phone}
              onChange={(e) =>
                setCustomer((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </div>
          {selected === "Take Away" ? (
            <div className={styles.formGroup}>
              <label htmlFor="userAddress">Address</label>
              <input
                type="text"
                name="userAddress"
                value={customer.address}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </div>
          ) : (
            <div className={styles.formGroup}>
              <label htmlFor="userCount">No. of persons</label>
              <input
                type="number"
                min={1}
                name="userCount"
                value={customer.count}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    count: e.target.value,
                  }))
                }
              />
            </div>
          )}
          <div className={styles.buttons}>
            <button
              onClick={() => {
                setCustomer({ name: "", phone: "", address: "", count: 0 });
                onClose();
              }}
              className={styles.cancel}
            >
              Cancel
            </button>
            <button onClick={onSubmitDetails} className={styles.submit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export { InstructionModal, InputModal };
