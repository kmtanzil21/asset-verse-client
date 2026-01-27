import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const AddAssetForm = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productType: 'Returnable',
      productQuantity: 1
    }
  });

  // TanStack Mutation for adding asset
  const { mutateAsync: addAsset, isPending } = useMutation({
    mutationFn: async (newAsset) => {
      const res = await axiosPublic.post('/assets', newAsset);
      return res.data;
    },
    onSuccess: () => {
      // This refreshes any component using 'assets' key automatically
      queryClient.invalidateQueries(['assets']);
      Swal.fire({
        icon: 'success',
        title: 'Asset Added Successfully',
        showConfirmButton: false,
        timer: 1500,
        iconColor: '#570df8' // Matches your primary color
      });
      reset();
    },
    onError: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.response?.data?.message || 'Something went wrong!',
      });
    }
  });

  const onSubmit = async (data) => {
    const assetData = {
      productName: data.productName,
      productImage: data.productImage,
      productType: data.productType,
      productQuantity: parseInt(data.productQuantity),
      availableQuantity: parseInt(data.productQuantity),
      dateAdded: new Date(),
      hrEmail: user?.email,
      companyName: user?.companyName
    };

    await addAsset(assetData);
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-base-100 shadow-2xl rounded-2xl border border-base-200">
      <div className="flex items-center justify-between mb-8 border-b border-primary/20 pb-6">
        <h2 className="text-3xl font-extrabold text-secondary">Add New Asset</h2>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-primary font-bold">{user?.companyName}</p>
          <p className="text-xs text-gray-400">Limit: {user?.packageLimit}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset flex flex-col gap-6">
          
          {/* Product Name */}
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Product Name</span></label>
            <input 
              {...register("productName", { required: "Name is required" })}
              className={`input input-bordered input-primary w-full ${errors.productName ? 'input-error' : ''}`} 
              placeholder="e.g. MacBook Air M2" 
            />
            {errors.productName && <span className="text-error text-xs mt-1">{errors.productName.message}</span>}
          </div>

          {/* Product Image */}
          <div className="form-control">
            <label className="label"><span className="label-text font-bold">Product Image URL</span></label>
            <input 
              {...register("productImage", { required: "Image URL is required" })}
              className={`input input-bordered input-primary w-full ${errors.productImage ? 'input-error' : ''}`} 
              placeholder="https://..." 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Type</span></label>
              <select {...register("productType")} className="select select-primary w-full">
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label"><span className="label-text font-bold">Quantity</span></label>
              <input 
                {...register("productQuantity", { required: true, min: 1 })}
                type="number" 
                className="input input-bordered input-primary w-full" 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isPending}
            className="btn btn-primary mt-6 w-full text-white text-lg shadow-lg shadow-primary/30"
          >
            {isPending ? <span className="loading loading-spinner"></span> : 'Add Asset'}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddAssetForm;