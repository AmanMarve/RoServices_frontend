import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { final } from '../assets/swiper/final';
import { useCart } from '../context/ContextProvider';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import config from "../Api/api";

const CartPage = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCart(); // Assuming clearCart exists
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm();
  const navigate = useNavigate(); // Initialize navigate function

  const getTotalItems = () => cart.length;

  const getTotalPrice = () => {
    let totalPrice = cart.reduce((total, item) => {
      const price = parseFloat(item.price);
      return isNaN(price) ? total : total + price * item.quantity;
    }, 0);
    return totalPrice.toFixed(2);
  };

  const handlePlaceOrder = () => {
    const data = getValues();
    if (!data.name || !data.email || !data.address || !data.contact) {
      toast.error("Please fill in all fields.");
    } else {
      setShowConfirmDialog(true);
    }
  };

  const confirmOrder = async () => {
    setShowConfirmDialog(false);
    const data = getValues();

    // Prepare order data
    const orderData = {
      products: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      totalItems: getTotalItems(),
      totalPrice: getTotalPrice(),
      name: data.name,
      contact: data.contact,
      email: data.email,
      address: data.address,
    };

    console.log("Order Data being sent:", orderData);

    if (!Array.isArray(orderData.products)) {
      console.error("Products field is not an array.");
      toast.error("Products field is not an array.");
      return;
    }

    fetch(`${config.apiUrl}api/order/placedorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error || "Failed to place the order");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order placed successfully:", data);
        toast.success("Order placed successfully!");

        // Clear the cart and navigate to shop page
        clearCart(); // Clear the cart (assuming this function exists)
        navigate("/shop"); // Navigate to the shop page
      })
      .catch((error) => {
        console.error("Error placing order:", error.message);
        toast.error(error.message || "Something went wrong. Please try again.");
      });
  };


  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <h2 className="text-3xl font-bold my-4 flex justify-center">Shopping Cart</h2>

      {cart.length > 0 ? (
        <div className="container mx-auto p-4 flex flex-col gap-6 lg:flex-row">
          <div className="flex-1 bg-white border-2 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-600 mb-4">Your Products</h1>
            <div className="space-y-6">
              {cart.map((item, index) => (
                <div key={index} className="flex flex-col lg:flex-row items-center gap-4 border-b pb-4">
                  <img src={item.image} alt={item.name} className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-md" />
                  <div className="flex-1">
                    <h3 className="text-xl font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-lg font-semibold text-gray-800">₹{item.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button onClick={() => decreaseQuantity(item._id)} className="px-2 bg-gray-200 rounded">-</button>
                      <span className="mx-2">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item._id)} className="px-2 bg-gray-200 rounded">+</button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-white bg-red-600 mt-2 p-2 rounded-md">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 lg:w-1/3 bg-white border-2 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-gray-600 mb-4 text-center">Fill Your Details</h1>
            <form className="space-y-4" onSubmit={handleSubmit(handlePlaceOrder)}>
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
                  placeholder="Your Name"
                />
                {errors.name && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <label className="block text-gray-700">Contact</label>
                <input
                  {...register("contact", { required: true, valueAsNumber: true })}
                  type="number"
                  className={`w-full p-2 border rounded ${errors.contact ? 'border-red-500' : ''}`}
                  placeholder="Your Contact"
                />
                {errors.contact && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="Your Email"
                />
                {errors.email && <span className="text-red-500">This field is required</span>}
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <textarea
                  {...register("address", { required: true })}
                  className={`w-full p-2 border rounded ${errors.address ? 'border-red-500' : ''}`}
                  placeholder="Your Address"
                  rows="3"
                ></textarea>
                {errors.address && <span className="text-red-500">This field is required</span>}
              </div>
              <div className="space-y-4">
                <h5 className="text-lg">Total Items: {getTotalItems()}</h5>
                <h5 className="text-lg">Total Price: ₹{getTotalPrice()}</h5>
              </div>
              <button type="button" onClick={handlePlaceOrder} className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded w-full font-semibold">
                Place Order
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-10 text-center">
          <img className="h-40 mb-4" src={final.cartImg} alt="CartImage" />
          <h3 className="text-2xl text-gray-700">
            Your cart is <span className="text-red-600">empty,</span> <br /> please add some items...
          </h3>
        </div>
      )}

      {showConfirmDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Confirm Order</h3>
            <p>Are you sure you want to place this order?</p>
            <div className="flex justify-between mt-6">
              <button onClick={() => setShowConfirmDialog(false)} className="bg-gray-200 px-4 py-2 rounded">
                No
              </button>
              <button onClick={confirmOrder} className="bg-blue-500 text-white px-4 py-2 rounded">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
