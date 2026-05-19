import {
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  TrashIcon,
  MapPinIcon,
  UserCircleIcon,
  EnvelopeIcon,
  IdentificationIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUserAsync } from "../../user/userSlice";

export default function Userprofile() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const addresses = userInfo?.addresses;
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");

  const handleEditForm = (e, index) => {
    setShowAddAddressForm(false);
    setSelectedAddressIndex(index);
    const userAddress = addresses[index];
    setValue("name", userAddress.name);
    setValue("email", userAddress.email);
    setValue("phone", userAddress.phone);
    setValue("street", userAddress.street);
    setValue("city", userAddress.city);
    setValue("state", userAddress.state);
    setValue("pincode", userAddress.pincode);
  };

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, addresses: [userInfo.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedAddressIndex(-1);
  };
  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, addresses: [...userInfo.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleAdd = (e) => {
    reset();
    setShowAddAddressForm(!showAddAddressForm);
    setSelectedAddressIndex(-1);
  };

  const handleCancel = () => {
    setShowAddAddressForm(!showAddAddressForm);
    reset();
  };

  return (
    <div className="bg-slate-50/50 min-h-screen pb-20">
      {userInfo && (
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-12">
          {/* User Info Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass bg-white/70 rounded-[3rem] p-8 md:p-12 premium-shadow border border-white mb-12 flex flex-col md:flex-row items-center gap-8"
          >
            <div className="h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-5xl font-black shadow-2xl">
              {userInfo.name ? userInfo.name[0].toUpperCase() : "G"}
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              {isEditingProfile ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="block w-full max-w-md mx-auto md:mx-0 rounded-2xl border-slate-200 bg-white py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="block w-full max-w-md mx-auto md:mx-0 rounded-2xl border-slate-200 bg-white py-3 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                    placeholder="Email"
                  />
                  <div className="flex justify-center md:justify-start gap-2">
                    <button
                      onClick={() => {
                        dispatch(updateUserAsync({ ...userInfo, name: profileName, email: profileEmail }));
                        setIsEditingProfile(false);
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                    {userInfo.name ? userInfo.name : "Guest User"}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-slate-500 font-medium bg-white/50 px-3 py-1 rounded-full text-sm">
                      <EnvelopeIcon className="w-4 h-4" />
                      {userInfo.email}
                    </div>
                    {userInfo.role === "admin" && (
                      <div className="flex items-center gap-1.5 text-indigo-600 font-black bg-indigo-50 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-indigo-100">
                        <IdentificationIcon className="w-4 h-4" />
                        {userInfo.role}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            {!isEditingProfile && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setIsEditingProfile(true);
                  setProfileName(userInfo.name || "");
                  setProfileEmail(userInfo.email || "");
                }}
                className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold shadow-xl hover:bg-indigo-600 transition-all"
              >
                Edit Profile
              </motion.button>
            )}
          </motion.div>

          {/* Address Management Section */}
          <div className="space-y-8">
            <header className="flex justify-between items-end px-4">
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Shipping Addresses</h2>
                <p className="text-slate-500 font-medium text-sm">Manage your delivery locations</p>
              </div>
              {!showAddAddressForm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAdd(e)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Add New
                </motion.button>
              )}
            </header>

            {/* Add Address Form */}
            <AnimatePresence>
              {showAddAddressForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-white rounded-[2.5rem] premium-shadow border border-slate-100 p-8 mb-8">
                    <form
                      onSubmit={handleSubmit((data) => {
                        dispatch(updateUserAsync({ ...userInfo, addresses: [...addresses, data] }));
                        handleCancel();
                      })}
                    >
                      <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Full Name</label>
                          <input
                            type="text"
                            {...register("name", { required: "Name is Required" })}
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email address</label>
                          <input
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Phone Number</label>
                          <input
                            type="tel"
                            {...register("phone", { required: "Phone is required" })}
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                          />
                        </div>
                        <div className="col-span-full">
                          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Street address</label>
                          <input
                            type="text"
                            {...register("street", { required: "Street is required" })}
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">City</label>
                          <input
                            type="text"
                            {...register("city", { required: "City is required" })}
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">State</label>
                          <input
                            type="text"
                            {...register("state", { required: "State is required" })}
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">ZIP / Postal</label>
                          <input
                            type="text"
                            {...register("pincode", { required: "Pincode is required" })}
                            className="block w-full rounded-2xl border-slate-200 bg-slate-50/50 py-3.5 px-4 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-indigo-600 transition-all sm:text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-8 flex justify-end gap-4">
                        <button onClick={handleCancel} type="button" className="text-sm font-bold text-slate-400 hover:text-slate-900 transition-colors">Cancel</button>
                        <button type="submit" className="bg-indigo-600 text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-indigo-100">Save Address</button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Address List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence>
                {addresses && addresses.map((addr, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-[2.5rem] p-8 premium-shadow border border-slate-100 hover:border-indigo-200 transition-all relative"
                  >
                    {selectedAddressIndex === index ? (
                      <form
                        onSubmit={handleSubmit((data) => handleEdit(data, index))}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 gap-4">
                          <input {...register("name")} className="w-full rounded-xl border-slate-100 bg-slate-50 py-2 px-4 text-sm" placeholder="Name" />
                          <input {...register("street")} className="w-full rounded-xl border-slate-100 bg-slate-50 py-2 px-4 text-sm" placeholder="Street" />
                          <div className="grid grid-cols-2 gap-4">
                            <input {...register("city")} className="rounded-xl border-slate-100 bg-slate-50 py-2 px-4 text-sm" placeholder="City" />
                            <input {...register("pincode")} className="rounded-xl border-slate-100 bg-slate-50 py-2 px-4 text-sm" placeholder="Pincode" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                          <button onClick={() => setSelectedAddressIndex(-1)} type="button" className="text-xs font-bold text-slate-400">Cancel</button>
                          <button type="submit" className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold">Update</button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
                            <MapPinIcon className="w-6 h-6" />
                          </div>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleEditForm(e, index)}
                              className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white transition-all"
                            >
                              <PencilSquareIcon className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => handleRemove(e, index)}
                              className="p-2 rounded-xl bg-slate-50 text-slate-400 hover:bg-rose-600 hover:text-white transition-all"
                            >
                              <TrashIcon className="w-5 h-5" />
                            </motion.button>
                          </div>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 mb-1">{addr.name}</h3>
                        <p className="text-xs font-bold text-slate-400 mb-4">{addr.phone}</p>
                        <p className="text-sm font-medium text-slate-500 leading-relaxed">
                          {addr.street}, {addr.city}<br />
                          {addr.state} - {addr.pincode}
                        </p>
                      </>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {(!addresses || addresses.length === 0) && !showAddAddressForm && (
              <div className="text-center py-20 bg-white rounded-[3rem] premium-shadow border border-slate-100">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPinIcon className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">No addresses saved</h3>
                <p className="text-slate-500 font-medium">Add an address to speed up your checkout process.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
