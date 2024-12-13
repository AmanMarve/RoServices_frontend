import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Oval } from 'react-loader-spinner'; // Example loader from a library
import config from '../config';

const List = () => {
  const [products, setProducts] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Show loader
      try {
        const response = await fetch(`${config.apiUrl}api/product/getProductList`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        toast.error(error.message || 'Error fetching products');
      } finally {
        setLoading(false); // Hide loader
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      category: product.category,
      image: product.image
    });
    setIsEditOpen(true);
  };

  const handleDelete = (id) => {
    setIsDeleteConfirmOpen(true);
    setProductToDelete(id);
  };

  const confirmDelete = async () => {
    setLoading(true); // Show loader during deletion
    try {
      const response = await fetch(`${config.apiUrl}api/product/admin/deleteproduct/${productToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }
      toast.success('Product deleted successfully!');
      setProducts(products.filter(product => product._id !== productToDelete));
    } catch (error) {
      toast.error(error.message || 'Error deleting product');
    } finally {
      setLoading(false); // Hide loader
      setIsDeleteConfirmOpen(false);
      setProductToDelete(null);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      const response = await fetch(`${config.apiUrl}api/product/admin/editproduct/${selectedProduct._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: formData.image
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      setProducts(products.map(product => (product._id === selectedProduct._id ? updatedProduct : product)));
      setIsEditOpen(false);
      toast.success('Product updated successfully!');
    } catch (error) {
      toast.error(error.message || 'Error updating product');
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      {loading && (
        <div className="flex justify-center items-center">
          <Oval height={40} width={40} color="#4A90E2" visible={true} />
        </div>
      )}

      {!loading && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4 text-left">Img</th>
                <th className="border border-gray-300 p-4 text-left">Title</th>
                <th className="border border-gray-300 p-4 text-left">Price</th>
                <th className="border border-gray-300 p-4 text-left">Category</th>
                <th className="border border-gray-300 p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-20 h-20 object-cover"
                    />
                  </td>
                  <td className="border border-gray-300 p-4">{product.title}</td>
                  <td className="border border-gray-300 p-4">&#8377;{product.price}</td>
                  <td className="border border-gray-300 p-4">{product.category}</td>
                  <td className="border border-gray-300 p-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white py-1 px-2 rounded mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-500 text-white py-1 px-2 rounded"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Dialog */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            {/* Edit form implementation */}
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <p>Are you sure you want to delete this product?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="bg-gray-500 text-white py-1 px-3 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
