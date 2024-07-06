import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/config";
import useUserStore from "@/stores/user";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import React, { useState } from "react";

export default function Account() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("other");
  const { setUser } = useUserStore();

  const areAllFieldsFilled = () => {
    return email && password && dob && phoneNumber && gender;
  };

  const handleSignUp = async () => {
    const userData = {
      fullName,
      email,
      password,
      dob,
      phoneNumber,
      gender
    };

    try {
      const response = await fetch(`${api.baseUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const data = await response.json();
      console.log("Sign up successful:", data);
      setUser(data.user);
      navigate({ to: "/account" });
    } catch (error) {
      console.error("Error during sign up:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="mx-auto max-w-sm rounded-xl bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input
                id="fullName"
                required
                className="rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@nha.com"
                required
                className="rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2 mb-4">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                className="rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mb-4">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                required
                className="rounded"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>

            <div className="grid gap-2 mb-4">
              <Label htmlFor="phone-number">Phone Number</Label>
              <Input
                id="phone-number"
                type="tel"
                required
                className="rounded"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center mb-4">
              <Label htmlFor="gender">Gender</Label>
              <select
                id="gender"
                required
                className="rounded"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <Button type="primary" className="w-full" disabled={!areAllFieldsFilled()} onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <a
              href="#"
              className="underline"
              onClick={() => {
                navigate({ to: "/account" });
              }}
            >
              Sign in
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
