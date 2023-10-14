import { API_URL } from "../stores/apiUrl";

export async function fetchAuthors() {
  try {
    const response = await fetch(API_URL + "/authors", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData.reverse();
    } else {
      throw new Error("Erreur lors de la requête des auteurs");
    }
  } catch (error) {
    console.error("Erreur de requête des auteurs : ", error);
    return [];
  }
}

export async function fetchBooks() {
  try {
    const response = await fetch(API_URL + "/books", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const jsonData = await response.json();
      return jsonData.reverse();
    } else {
      throw new Error("Erreur lors de la requête des ouvrages");
    }
  } catch (error) {
    console.error("Erreur de requête des ouvrages: ", error);
    return [];
  }
}
