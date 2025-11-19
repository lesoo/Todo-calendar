// /app/login/page.js
"use client";
// import ImageAtom from "@atoms/ImageAtom";
import { ImageAtom } from "@atoms";
// import ImageAtom from "../../components/atoms/ImageAtom";


import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
        alert("로그인 실패");
        return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token); // ✅ 토큰 저장
    alert(data.message);

  };

  return (
    <form onSubmit={handleLogin}>
      <ImageAtom imgSrc='logo'/>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}
