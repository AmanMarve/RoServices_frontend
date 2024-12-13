import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import config from '../config';

const Add = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'link'

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('category', data.category);
    formData.append('subcategory', data.subcategory);
    formData.append('description', data.description);
    formData.append('quantity', data.quantity);
    formData.append('ratingStar', data.ratingStar);
    formData.append('ratingCount', data.ratingCount);
    

    if (uploadMethod === 'file' && image) {
      formData.append('image', image);
    } else if (uploadMethod === 'link' && imageUrl) {
      formData.append('imageUrl', imageUrl);
    }

    try {
      const response = await fetch(`${config.apiUrl}api/product/admin/addproduct`, {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        toast.success('Product added successfully!');
        reset(); // Clear the form fields
        setImage(null); // Reset image state
        setImageUrl(''); // Reset image URL state
      } else {
        toast.error('Failed to add product.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImageUrl('');
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
    setImage(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Product Title</label>
          <input
            type="text"
            {...register('title', { required: 'Product title is required' })}
            className={`mt-1 block w-full p-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            {...register('category', { required: 'Category is required' })}
            className={`mt-1 block w-full p-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
            <option value="books">Books</option>
            <option value="toys">Toys</option>
            <option value="RO">RO</option>
          </select>
          {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            {...register('price', { required: 'Price is required', min: { value: 0, message: 'Price must be greater than zero' } })}
            className={`mt-1 block w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            {...register('quantity', { required: 'Quantity is required', min: { value: 1, message: 'Quantity must be at least 1' } })}
            className={`mt-1 block w-full p-2 border ${errors.quantity ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className={`mt-1 block w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rating Star</label>
          <input
            type="number"
            {...register('ratingStar', { required: 'Rating star is required', min: { value: 0, message: 'Star rating must be at least 0' }, max: { value: 5, message: 'Star rating cannot exceed 5' } })}
            className={`mt-1 block w-full p-2 border ${errors.ratingStar ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.ratingStar && <span className="text-red-500 text-sm">{errors.ratingStar.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rating Count</label>
          <input
            type="number"
            {...register('ratingCount', { required: 'Rating count is required', min: { value: 0, message: 'Count must be at least 0' } })}
            className={`mt-1 block w-full p-2 border ${errors.ratingCount ? 'border-red-500' : 'border-gray-300'} rounded-md`}
          />
          {errors.ratingCount && <span className="text-red-500 text-sm">{errors.ratingCount.message}</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Method</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="file"
                checked={uploadMethod === 'file'}
                onChange={(e) => setUploadMethod(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Upload File</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="link"
                checked={uploadMethod === 'link'}
                onChange={(e) => setUploadMethod(e.target.value)}
                className="form-radio"
              />
              <span className="ml-2">Upload via Link</span>
            </label>
          </div>
        </div>

        {uploadMethod === 'file' ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`mt-1 block w-full p-2 border ${!image ? 'border-gray-300' : 'border-gray-300'} rounded-md`}
            />
            {image && <img src={URL.createObjectURL(image)} alt="Product Preview" className="mt-2 h-32 object-cover" />}
            {!image && <span className="text-red-500 text-sm">Image is required</span>}
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={handleImageUrlChange}
              className={`mt-1 block w-full p-2 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-md`}
            />
          </div>
        )}

        <button
          type="submit"
          className="h-10 w-28 bg-blue-600 text-white font-semibold rounded-sm hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
