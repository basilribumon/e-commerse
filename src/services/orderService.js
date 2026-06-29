import axios from "axios";

const API =
  "http://localhost:3000/orders";

// Create Order
const placeOrder = async (
  orderData
) => {
  const response =
    await axios.post(
      API,
      orderData
    );

  return response.data;
};

// Get Orders of Logged-in User
const getOrders = async (
  userId
) => {
  const response =
    await axios.get(
      `${API}?userId=${userId}`
    );

  return response.data;
};

// Get All Orders (Admin)
const getAllOrders =
  async () => {
    const response =
      await axios.get(API);

    return response.data;
  };

// Update Order Status
const updateOrder =
  async (order) => {
    const response =
      await axios.put(
        `${API}/${order.id}`,
        order
      );

    return response.data;
  };

const orderService = {
  placeOrder,
  getOrders,
  getAllOrders,
  updateOrder,
};

export default orderService;