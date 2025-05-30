import React, { useEffect, useState } from "react";
import styles from "./SeatingArrangement.module.css";
import TableCard from "../TableCard/TableCard";
import { addTable, deleteTable, getTable } from "../../services/index";
import { toast } from "react-toastify";
import addBtn from "../../assets/SeatingArrangement/addBtn.svg";
import AddTableCard from "../AddTableCard/AddTableCard";
export default function SeatingArrangement() {
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({ occupancy: 2, name: "" });
  const [openModal, setOpenModal] = useState(false);
  const [searchedTable, setSearchedTable] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getTable()
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          setTables(data.tables);
          setSearchedTable(data.tables);
        } else {
          toast.error(response.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchedTable(tables);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = tables.filter((item, index) => {
        const name = item?.name?.toLowerCase() || "";
        const status = item?.status?.toLowerCase() || "";
        const indexStr = String(index+1); 

        return (
          name.includes(query) ||
          status.includes(query) ||
          indexStr.includes(query)
        );
      });
      setSearchedTable(filtered);
    }
  }, [searchQuery, tables]);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    addTable(newTable)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          setTables((prev) => [...prev, data.newTable]);
          setNewTable({ occupancy: 2, name: "" });
          setOpenModal(!openModal);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    deleteTable(id)
      .then(async (response) => {
        const data = await response.json();
        if (response.ok) {
          toast.success(data.message);
          setTables((prev) => prev.filter((table) => table._id !== id));
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className={styles.tableContainer}>
      <div className={styles.searchBar}>
        <div className={styles.circle}></div>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className={styles.content}>
        <h1>Tables</h1>
        <div className={styles.tables}>
          {searchedTable.map((table, index) => (
            <TableCard
              table={table}
              key={index}
              index={tables.indexOf(table)}
              handleDelete={handleDelete}
            />
          ))}
          <div className={styles.addContainer} onClick={handleOpen}>
            <img src={addBtn} alt="" />
            {openModal ? (
              <AddTableCard
                lastIndex={tables.length + 1}
                newTable={newTable}
                setNewTable={setNewTable}
                handleCreate={handleCreate}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
