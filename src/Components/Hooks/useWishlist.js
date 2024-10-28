// src/hooks/useWishlist.js
import { useState } from "react";
import { toast } from "react-toastify";
import { Baseurl } from "../../Config";
import "react-toastify/dist/ReactToastify.css";

export const useWishlist = () => {
      const [loading, setLoading] = useState(false);

      const handleAddToWishlist = async (productId) => {
            setLoading(true);
            const token = localStorage.getItem("accessToken");

            if (!token) {
                  toast.warn("You must be logged in to add items to your wishlist.");
                  setLoading(false);
                  return;
            }

            try {
                  const response = await fetch(`${Baseurl}/api/v1/wishlist/add`, {
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
                  console.log("Product added to wishlist:", data);
                  toast.success("Product added to wishlist!", {
                        position: "top-right",
                        autoClose: 1000,
                  });
            } catch (error) {
                  console.error("Error adding product to wishlist:", error);
                  toast.warn("Failed to add product to wishlist.");
            } finally {
                  setLoading(false);
            }
      };

      return { handleAddToWishlist, loading };
};
