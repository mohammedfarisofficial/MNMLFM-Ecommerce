import Order from "../models/Order.js";

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      isPaid,
      name,
      phone,
      state,
      zipcode,
      address,
      district,
      productId,
      productName,
      productSize,
      productColor,
      productImageUrl,
      qty,
    } = req.body.order;

    const newOrder = new Order({
      userId,
      isPaid,
      name,
      phone,
      state,
      zipcode,
      address,
      district,
      productId,
      productName,
      productSize,
      productColor,
      productImageUrl,
      qty,
    });
    const createdOrder = await newOrder.save();
    res.json({ createdOrder });
  } catch (error) {
    console.log(error);
  }
};

const getUserOrder = async (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  const userOrders = await Order.find({ userId });
  res.json({ userOrders });
};

const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId);
  const response = await Order.findOneAndDelete({ orderId });
  res.json({ response });
};

export { createOrder, getUserOrder, deleteOrder };
