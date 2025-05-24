const URL = import.meta.env.VITE_BACKEND_URL;
export async function getMenuItem(category) {

  const query = new URLSearchParams({category});

  try {
    const res = await fetch(`${URL}/api/menu?${query}`, {
      method: "GET",
    });

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function addOrder(details){
  try {
    console.log(details);
    
    const res = await fetch(`${URL}/api/orders`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(details)
    })

    return res
  } catch (error) {
    console.error(error);
    throw error
    
  }
}