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


export async function getOrders(){
  try {
    const res= await fetch(`${URL}/api/orders`,{
      method:"GET"
    })

    return res

  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function updateOrderStatus(id,status){
  const query = new URLSearchParams({ status });
  try {
    const res= await fetch(`${URL}/api/orders/${id}?${query}`,{
      method:'PATCH'
    })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getMenuById(id) {
  try {
    const res = await fetch(`${URL}/api/menu/${id}`,{
      method:"GET"
    })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function updateTableStatus(id,status){
   const query = new URLSearchParams({ status });
  try {
    const res= await fetch(`${URL}/api/tables/${id}?${query}`,{
      method:'PATCH'
    })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getAllChef(){
  try {
    const res= await fetch(`${URL}/api/chefs`,{
      method:'GET'
    })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getOverallSummary(){
  try {
    const res= await fetch(`${URL}/api/analytics`,{
      method:'GET'
    })

    return res

  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getOrderSummary(range){
    const query = new URLSearchParams({ range });
  try {
    const res= await fetch(`${URL}/api/analytics/order-summary?${query}`,{
      method:'GET'
    })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}

export async function getRevenueSummary(range){
    const query = new URLSearchParams({ range });
  try {
    const res= await fetch(`${URL}/api/analytics/revenue-growth?${query}`,{
      method:'GET'
    })

    return res
  } catch (error) {
    console.error(error);
    throw error
  }
}
