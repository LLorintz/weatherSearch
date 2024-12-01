export const fetchUsers = async () => {
    const response = await fetch("/data.json");
    const data = await response.json();
    console.log(data.users); // JSON adat
    return data.users
  };

