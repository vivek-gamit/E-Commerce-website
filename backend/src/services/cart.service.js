import axios from 'axios';

const API_URL = 'http://localhost:3000/api/cart';

// Helper to get the token (adjust based on where you store it)
const getHeaders = () => ({
  headers: { Authorization: `Bearer ${cookieStore.getItem('token')}` }
});

export const cartService = {
  // GET /api/cart
  fetchCart: async () => {
    const response = await axios.get(API_URL, getHeaders());
    return response.data;
  },

  // POST /api/cart/add
  addToCart: async (productId, price, quantity = 1) => {
    const response = await axios.post(`${API_URL}/add`, { productId, price, quantity }, getHeaders());
    return response.data;
  },

  // PUT /api/cart/update-qty
  updateQty: async (productId, quantity) => {
    const response = await axios.put(`${API_URL}/update-qty`, { productId, quantity }, getHeaders());
    return response.data;
  },

  // DELETE /api/cart/remove/:id
  removeItem: async (productId) => {
    const response = await axios.delete(`${API_URL}/remove/${productId}`, getHeaders());
    return response.data;
  }
};