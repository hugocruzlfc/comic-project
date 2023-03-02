import React from "react";
import Header from "./Header";
import Footer from "@/components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="max-w-xl m-auto">{children}</main>
      <Footer />
    </>
  );
}
