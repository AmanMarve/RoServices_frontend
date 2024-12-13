import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../context/ContextProvider';
import toast, { Toaster } from "react-hot-toast";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Rating from '@mui/material/Rating';
import config from '../Api/api';
import Loader from '../components/Loader'; // Import Loader component

const Shop = () => {
  const { cart, addToCart } = useCart();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (item) => {
    const isItemInCart = cart.some((cartItem) => cartItem._id === item._id);

    if (!isItemInCart) {
      addToCart(item);
      toast.success('Item added to cart!');
    } else {
      toast.error('Item is already in the cart!');
    }
  };

  const openDialog = (item) => {
    setSelectedProduct(item);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  async function getData() {
    try {
      const response = await fetch(`${config.apiUrl}api/product/getProductList`);
      const result = await response.json();

      if (!response.ok) {
        console.log(result.error);
        setError(result.error);
      } else {
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error fetching data');
    } finally {
      setLoading(false); // Set loading to false when data is fetched
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const truncate = (text, maxWords) => {
    return text.split(' ').slice(0, maxWords).join(' ') + (text.split(' ').length > maxWords ? '...' : '');
  };

  if (loading) return <Loader />; // Show loader while data is loading

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold my-4">Products to Buy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((item) => (
            <div key={item._id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between h-full">
              <Link to={`/product/${item._id}`}>
                <div className="h-60 flex items-center justify-center bg-gray-100">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain p-4" />
                </div>
              </Link>

              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{truncate(item.title, 5)}</h3>
                  <p className="text-gray-600 text-sm mb-4">{truncate(item.description, 10)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xl text-gray-800">&#8377;{item.price}</span>
                </div>
                <div className="flex items-center justify-around space-x-2 mt-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-blue-500 hover:bg-blue-600 text-[14px] text-white font-semibold p-[10px] rounded transition-transform duration-300 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => openDialog(item)}
                    className="bg-green-500 hover:bg-green-600 text-[14px] text-white font-semibold p-[10px] rounded transition-transform duration-300 transform hover:scale-105"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dialog for product details */}
      {selectedProduct && (
        <Dialog open={dialogOpen} onClose={closeDialog} maxWidth="md" fullWidth>
          {/* Close button positioned outside the dialog */}
          <IconButton
            aria-label="close"
            onClick={closeDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Dialog content starts here */}
          <DialogTitle>{selectedProduct.title}</DialogTitle>
          <DialogContent>
            <img src={selectedProduct.image} alt={selectedProduct.title} className="w-full h-64 object-contain mb-4" />

            <DialogContentText>
              {selectedProduct.description}
            </DialogContentText>

            {/* Display ratings and review count */}
            <div className="flex items-center mb-4">
              <Rating name="read-only" value={selectedProduct.rating.star} readOnly precision={0.5} />
              <span className="ml-2 text-gray-500">({selectedProduct.rating.count} reviews)</span>
            </div>

            <span className="text-xl font-bold">&#8377;{selectedProduct.price}</span>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => handleAddToCart(selectedProduct)} color="primary" variant="contained">
              Add to Cart
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default Shop;
