import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner'; // Importing a spinner component
import config from '../config';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders when the component mounts
  useEffect(() => {
    fetch(`${config.apiUrl}api/product/admin/allorders`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data.orders);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Loading and Error handling
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Oval height={50} width={50} color="#4A90E2" visible={true} />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl text-center font-bold my-4">Placed Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-3 border border-gray-300 shadow-lg">

              {/* Customer Info */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <p className="text-gray-500 mr-2">Customer Name:</p>
                  <p className="font-semibold text-xl">{order.name}</p>
                </div>
                <div className="flex items-center mb-1">
                  <p className="text-gray-500 mr-2">Contact:</p>
                  <p className="font-semibold text-lg">{order.contact}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-gray-500 mr-2">Address:</p>
                  <p className="font-semibold text-lg">{order.address}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-semibold text-lg">Total Items: {order.totalItems}</p>
                <p className="font-semibold text-lg">Total Price: ₹{order.totalPrice}</p>
              </div>

              {/* Product Details */}
              <div className="mb-4">
                <p className="font-semibold text-lg">Products:</p>
                <ul>
                  {order.products?.map((item, index) => (
                    <li key={index} className="flex border p-2 items-center justify-between mt-2">
                      <div className="flex items-center">
                        <img
                          src={item.productId?.image}
                          alt={item.productId?.title}
                          className="w-12 h-12 object-cover mr-2"
                        />
                        <span>{item.productId?.title} (x{item.quantity})</span>
                      </div>
                      <span>₹{item.productId?.price}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
