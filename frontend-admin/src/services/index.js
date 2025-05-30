const URL = import.meta.env.VITE_BACKEND_URL;
export async function getMenuItem(category) {
  const query = new URLSearchParams({ category });

  try {
    const res = await fetch(`${URL}/api/menu?${query}`, {
      method: "GET",
    });

    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function getTable() {
  try {
    const res = await fetch(`${URL}/api/tables`, {
      method: "GET",
    });

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addTable(newTable) {
  try {
    const res = await fetch(`${URL}/api/tables`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTable),
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteTable(id) {
  try {
    const res = await fetch(`${URL}/api/tables/${id}`, {
      method: "DELETE",
    });
    return res;
  } catch (error) {
    console.error(error);
    throw error
  }
}
