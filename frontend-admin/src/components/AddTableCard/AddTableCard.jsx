import React from "react";
import styles from "./AddTableCard.module.css";
export default function AddTableCard({
  lastIndex,
  newTable,
  setNewTable,
  handleCreate,
}) {
  return (
    <div className={styles.card}>
      <div className={styles.tableName}>
        <h2>Table name (optional)</h2>
        <input
          type="text"
          placeholder={lastIndex.toString().padStart(2, "0")}
          value={newTable.name}
          onChange={(e) =>
            setNewTable((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        {/* <p>{}</p> */}
      </div>
      <div className={styles.occupancy}>
        <label htmlFor="occupancy">Chair</label>
        <select
          name="occupancy"
          id=""
          value={newTable.occupancy}
          onChange={(e) =>
            setNewTable((prev) => ({ ...prev, occupancy: e.target.value }))
          }
        >
          <option value="2">02</option>
          <option value="4">04</option>
          <option value="6">06</option>
        </select>
      </div>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
}
