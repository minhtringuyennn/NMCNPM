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
  const { setUser } = useUserStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(`${api.baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again later.");
      }

      const data = await response.json();

      setUser(data.user);

      if (data.user.role === "owner") {
        navigate({ to: "/owner" });
      } else if (data.user.role === "employee") {
        navigate({ to: "/employee" });
      } else {
        navigate({ to: "/" });
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="mx-auto max-w-sm rounded-xl bg-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
                <a href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </a>
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
            <Button type="primary" className="w-full" onClick={handleLogin}>
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a
              href="#"
              className="underline"
              onClick={() => {
                navigate({ to: "/signup" });
              }}
            >
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
