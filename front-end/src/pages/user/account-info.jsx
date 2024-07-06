import useUserStore from "@/stores/user";
import { useNavigate } from "@tanstack/react-router";
import { Button, DatePicker, Input, Radio, Typography } from "antd";
import dayjs from "dayjs";
import { Frown, GalleryHorizontalEndIcon, LucideShoppingBag, Percent, ShieldCheck, Star, User2 } from "lucide-react";
import React, { useState } from "react";

const AccountInformation = () => {
  const { user, setUser, clearUser } = useUserStore();
  const [editMode, setEditMode] = useState(false);
  const [editSecurity, setEditSecurity] = useState(false);
  const [formData, setFormData] = useState({ ...user, dob: dayjs(user.dob) });
  const [formSecurity, setFormSecurity] = useState({ currentPassword: "", newPassword: "" });
  const [tab, setTab] = useState("account-info");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setFormSecurity({ ...formSecurity, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleSave = async () => {
    try {
      // const response = await fetch(``, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({ ...formData, dob: formData.dob.toISOString() })
      // });
      // if (!response.ok) {
      //   throw new Error("Failed to save user information");
      // }
      // const data = await response.json();
      setUser(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving user information:", error);
    }
  };

  const handleSecuritySave = () => {
    console.log("Security Info Saved:", formSecurity);
    setEditSecurity(false);
  };

  const handleEdit = () => setEditMode(true);

  const isOwnerAndEmployee = user.role === "owner" || user.role === "employee";

  return (
    <div className="flex flex-col h-screen p-8 bg-[#F3841D]">
      <div className="h-full w-full bg-white rounded-2xl p-8 shadow-lg">
        <div className="flex h-full">
          <div className="w-1/4 p-4 border-r">
            <h2 className="text-xl font-semibold mb-4 underline">Your account</h2>
            <nav className="space-y-4">
              <div
                className={`flex items-center space-x-2 ${tab === "account-info" ? "text-orange-500" : ""} cursor-pointer`}
                onClick={() => setTab("account-info")}
              >
                <User2 size={24} />
                <span>Account information</span>
              </div>
              {!isOwnerAndEmployee ? (
                <>
                  <div
                    className={`flex items-center space-x-2 ${tab === "orders-history" ? "text-orange-500" : ""} cursor-pointer`}
                    onClick={() => setTab("orders-history")}
                  >
                    <LucideShoppingBag size={24} />
                    <span>Orders history</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${tab === "saved-coupon" ? "text-orange-500" : ""} cursor-pointer`}
                    onClick={() => setTab("saved-coupon")}
                  >
                    <Percent size={24} />
                    <span>Saved coupon</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 ${tab === "rated-item" ? "text-orange-500" : ""} cursor-pointer`}
                    onClick={() => setTab("rated-item")}
                  >
                    <Star size={24} />
                    <span>Rated item</span>
                  </div>
                </>
              ) : (
                <div
                  className={`flex items-center space-x-2 cursor-pointer`}
                  onClick={() =>
                    navigate({
                      to: user.role === "owner" ? "/owner" : "/employee"
                    })
                  }
                >
                  <GalleryHorizontalEndIcon size={24} />
                  <span>Go to {user.role} portal</span>
                </div>
              )}
              <div
                className={`flex items-center space-x-2 ${tab === "security" ? "text-orange-500" : ""} cursor-pointer`}
                onClick={() => setTab("security")}
              >
                <ShieldCheck size={24} />
                <span>Security</span>
              </div>
            </nav>
          </div>
          <div className="w-3/5 p-4 mx-auto">
            {tab === "account-info" && (
              <>
                <h2 className="text-2xl font-semibold mb-4 w-full text-center underline">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <label>Full Name</label>
                    <Input name="fullName" value={formData.fullName} onChange={handleChange} disabled={!editMode} />
                  </div>
                  <div className="flex w-full gap-8">
                    <div className="flex flex-col w-full">
                      <label>Date of Birth</label>
                      <DatePicker value={formData.dob} onChange={handleDateChange} disabled={!editMode} />
                    </div>
                    <div className="flex flex-col w-full">
                      <label>Phone number</label>
                      <Input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        disabled={!editMode}
                      />
                    </div>
                  </div>
                  <div>
                    <label>Email</label>
                    <Input name="email" value={formData.email} onChange={handleChange} disabled={true} />
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <div className="flex flex-col">
                      <label>Gender</label>
                      <Radio.Group name="gender" value={formData.gender} onChange={handleChange} disabled={!editMode}>
                        <Radio value="male">Male</Radio>
                        <Radio value="female">Female</Radio>
                        <Radio value="other">Other</Radio>
                      </Radio.Group>
                    </div>
                    {editMode ? (
                      <Button type="primary" onClick={handleSave}>
                        Save
                      </Button>
                    ) : (
                      <Button onClick={handleEdit}>Edit</Button>
                    )}
                  </div>
                </div>
              </>
            )}
            {tab === "orders-history" && user.role !== "employee" && (
              <div className="h-full">
                <h2 className="text-2xl font-semibold mb-4 w-full text-center underline">Orders History</h2>
                <div className="h-full w-full flex flex-col justify-center items-center opacity-50">
                  <Frown size={48} className="mb-8" />
                  <Typography.Title level={4}>Oops, looks like you haven't ordered anything yet.</Typography.Title>
                  <Typography.Text>
                    If this is an error, please contact us via our number or email for more information.
                  </Typography.Text>
                </div>
              </div>
            )}
            {tab === "saved-coupon" && user.role !== "employee" && (
              <div className="h-full">
                <h2 className="text-2xl font-semibold mb-4 w-full text-center underline">Saved Coupon</h2>
                <div className="h-full w-full flex flex-col justify-center items-center opacity-50">
                  <Frown size={48} className="mb-8" />
                  <Typography.Title level={4}>Oops, looks like you haven't saved any coupons yet.</Typography.Title>
                  <Typography.Text>
                    If this is an error, please contact us via our number or email for more information.
                  </Typography.Text>
                </div>
              </div>
            )}
            {tab === "rated-item" && user.role !== "employee" && (
              <div className="h-full">
                <h2 className="text-2xl font-semibold mb-4 w-full text-center underline">Rated Items</h2>
                <div className="h-full w-full flex flex-col justify-center items-center opacity-50">
                  <Frown size={48} className="mb-8" />
                  <Typography.Title level={4}>Oops, looks like you haven't rated anything yet.</Typography.Title>
                  <Typography.Text>
                    If this is an error, please contact us via our number or email for more information.
                  </Typography.Text>
                </div>
              </div>
            )}
            {tab === "security" && (
              <div className="h-full">
                <h2 className="text-2xl font-semibold mb-4 w-full text-center underline">Security</h2>
                <div className="space-y-4">
                  <div>
                    <label>Current Password</label>
                    <Input
                      type="password"
                      name="currentPassword"
                      value={formSecurity.currentPassword}
                      onChange={handleSecurityChange}
                      disabled={!editSecurity}
                    />
                  </div>
                  <div>
                    <label>New Password</label>
                    <Input
                      type="password"
                      name="newPassword"
                      value={formSecurity.newPassword}
                      onChange={handleSecurityChange}
                      disabled={!editSecurity}
                    />
                  </div>
                  <div className="flex justify-between">
                    {editSecurity ? (
                      <Button type="primary" onClick={handleSecuritySave}>
                        Save
                      </Button>
                    ) : (
                      <Button onClick={() => setEditSecurity(true)}>Edit</Button>
                    )}
                  </div>
                  <div
                    className="w-full border-b my-4"
                    style={{ borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: "1px" }}
                  ></div>
                  <Button
                    className="w-full"
                    onClick={() => {
                      clearUser();
                      window.location.reload();
                    }}
                  >
                    Log out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountInformation;
