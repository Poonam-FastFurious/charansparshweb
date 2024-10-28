// src/hooks/useCart.js
import { useState } from "react";
import { toast } from "react-toastify";
import { Baseurl } from "../../Config";
import "react-toastify/dist/ReactToastify.css";

export const useCart = () => {
      const [loading, setLoading] = useState(false);

      const addToCart = async (productId) => {
            try {
                  setLoading(true);
                  const token = localStorage.getItem("accessToken");
                  const response = await fetch(Baseurl + "/api/v1/cart/add", {
                        method: "POST",
                        headers: {
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ productId }),
                  });

                  if (!response.ok) {
                        throw new Error("Network response was not ok");
                  }

                  const data = await response.json();
                  console.log("Product added to cart", data);
                  toast.success("Product added to cart!", {
                        position: "top-right",
                        autoClose: 1000,
                  });
            } catch (error) {
                  console.error("Error adding product to cart:", error);
                  toast.warn("Login first to add product.");
            } finally {
                  setLoading(false);
            }
      };

      return { addToCart, loading };
};
