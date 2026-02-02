import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/pdfs";

const pdfApi = {
  getAllPdfs: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener PDFs:", error);
      throw error;
    }
  },

  getPdfById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener PDF con ID ${id}:`, error);
      throw error;
    }
  },

  getPdfsByCategory: async (category) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/category/${category}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener PDFs de categoría ${category}:`, error);
      throw error;
    }
  },

  searchPdfsByTitle: async (title) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/search`, {
        params: { title },
      });
      return response.data;
    } catch (error) {
      console.error(`Error al buscar PDFs con título "${title}":`, error);
      throw error;
    }
  },

  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      throw error;
    }
  },

  getPdfUrl: (fileName) => {
    return `${API_BASE_URL}/download/${fileName}`;
  },
};

export default pdfApi;
