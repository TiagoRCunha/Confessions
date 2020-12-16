export const handleIndex = async (offset = 0) => {
  try {
    const data = await fetch(
      `http://localhost:3000/api/confess?offset=${offset}`
    );

    if (data.ok) {
      return data.json();
    }
  } catch (error) {
    console.log(error);
  }
};
