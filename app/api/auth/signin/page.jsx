"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      // Redirect to the home page or another page after successful login
      window.location.href = "/";
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border mb-2"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 border mb-2"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white">
          Sign In
        </button>
      </form>
    </div>
  );
}
