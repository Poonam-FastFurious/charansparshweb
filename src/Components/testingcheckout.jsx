// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Baseurl } from "../../Config";

// function NewCheckOut() {
//   const [formData, setFormData] = useState({
//     address: "",
//     apartment: "",
//     city: "",
//     state: "",
//     postalCode: "",
//     email: "",
//     phoneNumber: "",
//     totalAmount: 0,
//   });
//   const [errors, setErrors] = useState({});
//   const [products, setProducts] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem("cartProducts"));
//     if (storedProducts && storedProducts.length > 0) {
//       setProducts(storedProducts);
//     }
//   }, []);

//   useEffect(() => {
//     const totalAmount = products.reduce(
//       (total, product) => total + product.quantity * product.product.price,
//       0
//     );
//     setFormData((prevData) => ({ ...prevData, totalAmount }));
//   }, [products]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.address) newErrors.address = "Address is required";
//     if (!formData.city) newErrors.city = "City is required";
//     if (!formData.state) newErrors.state = "State is required";
//     if (!formData.postalCode) newErrors.postalCode = "Postal code is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.phoneNumber)
//       newErrors.phoneNumber = "Phone number is required";
//     // Additional validation for email format and postal code
//     if (formData.email && !/\S+@\S+\.\S+/.test(formData.email))
//       newErrors.email = "Invalid email format";
//     if (formData.postalCode && formData.postalCode.length !== 6)
//       newErrors.postalCode = "Postal code must be 6 digits";
//     return newErrors;
//   };

//   const paymentHandler = async (e) => {
//     e.preventDefault();

//     const newErrors = validateForm();
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const userId = localStorage.getItem("userid");
//       if (!userId) {
//         throw new Error("User ID not found in local storage");
//       }

//       const orderId = await createOrder();

//       const response = await fetch(Baseurl + "/api/v1/payments/create", {
//         method: "POST",
//         body: JSON.stringify({
//           orderId,
//           amount: formData.totalAmount,
//           currency: "INR",
//           paymentMethod: "Credit Card",
//           userId,
//         }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || "Failed to create payment");
//       }

//       const order = await response.json();
//       console.log(order);

//       var options = {
//         key: "rzp_test_apOsHc9PArNQm9", // Use env variable
//         amount: formData.totalAmount * 100,
//         currency: "INR",
//         name: "CHARAN SPARSH",
//         description: "Test Transaction",
//         image: "logo",
//         order_id: order.payment.razorpayOrderId,
//         handler: async function (response) {
//           const body = {
//             orderId: order.payment.razorpayOrderId,
//             razorpayPaymentId: response.razorpay_payment_id,
//             razorpayOrderId: response.razorpay_order_id,
//             razorpaySignature: response.razorpay_signature,
//           };

//           // Verify payment on backend
//           const validateRes = await fetch(Baseurl + "/api/v1/payments/verify", {
//             method: "POST",
//             body: JSON.stringify(body),
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });
//           const jsonRes = await validateRes.json();
//           console.log(jsonRes);
//           if (validateRes.ok) {
//             localStorage.removeItem("cartProducts");
//             localStorage.setItem("orderId", jsonRes.payment.order);
//             navigate("/");
//           } else {
//             navigate("/payment-failed");
//           }
//         },
//         prefill: {
//           name: "charansparsh",
//           email: formData.email,
//           contact: formData.phoneNumber,
//         },
//         notes: {
//           address: formData.address,
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };
//       var rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Error:", error.message);
//     }
//   };

//   const createOrder = async () => {
//     const customerId = localStorage.getItem("userid");
//     if (!customerId) {
//       alert("Customer ID not found in local storage.");
//       return null;
//     }

//     try {
//       const orderData = {
//         customerId,
//         products: products.map((product) => ({
//           product: product.product._id,
//           quantity: product.quantity,
//           price: product.product.price,
//         })),
//         totalAmount: formData.totalAmount,
//         shippingInfo: {
//           address: formData.address,
//           city: formData.city,
//           state: formData.state,
//           postalCode: formData.postalCode,
//           country: "Country", // You might need to update or add a country field
//           phoneNumber: formData.phoneNumber,
//         },
//         paymentInfo: {
//           method: "Credit Card",
//           status: "Pending",
//         },
//       };

//       const response = await fetch(Baseurl + "/api/v1/order/add", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(
//           `Failed to create order: ${response.status} ${errorText}`
//         );
//       }

//       const data = await response.json();
//       return data.data._id; // Return the order ID for the payment process
//     } catch (error) {
//       console.error("Error creating order:", error.message);
//     }
//   };

//   return (
//     <>
//       <section className="relative md:py-24 py-16">
//         <div className="container relative">
//           <div className="grid lg:grid-cols-12 md:grid-cols-2 grid-cols-1 gap-6">
//             <div className="lg:col-span-8">
//               <div className="p-6 rounded-md shadow dark:shadow-gray-800">
//                 <h3 className="text-xl leading-normal font-semibold">
//                   Billing address
//                 </h3>

//                 <form onSubmit={paymentHandler}>
//                   <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         First Name : <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="First Name:"
//                         id="firstname"
//                         name="name"
//                         required=""
//                       />
//                     </div>

//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         Last Name : <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="Last Name:"
//                         id="lastname"
//                         name="name"
//                         required=""
//                       />
//                     </div>

//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         Mobile Number
//                       </label>
//                       <div className="relative mt-2">
//                         <input
//                           type="number"
//                           name="phoneNumber"
//                           className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0"
//                           placeholder="Mobile number"
//                           required
//                           value={formData.phoneNumber}
//                           onChange={handleInputChange}
//                         />
//                         {errors.phoneNumber && (
//                           <p className="error" style={{ color: "red" }}>
//                             {errors.phoneNumber}
//                           </p>
//                         )}
//                       </div>
//                     </div>

//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         Your Email : <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="Your email address"
//                         required
//                         value={formData.email}
//                         onChange={handleInputChange}
//                       />
//                       {errors.email && (
//                         <p className="error" style={{ color: "red" }}>
//                           {errors.email}
//                         </p>
//                       )}
//                     </div>

//                     <div className="lg:col-span-12">
//                       <label className="form-label font-semibold">
//                         Address Line 1 : <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="address"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="Street address"
//                         required
//                         value={formData.address}
//                         onChange={handleInputChange}
//                       />
//                       {errors.address && (
//                         <p className="error" style={{ color: "red" }}>
//                           {errors.address}
//                         </p>
//                       )}
//                     </div>

//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         Apartment, Suite, etc.:
//                       </label>
//                       <input
//                         type="text"
//                         name="apartment"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="Apartment, suite, unit, etc."
//                         value={formData.apartment}
//                         onChange={handleInputChange}
//                       />
//                     </div>

//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         City : <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="City"
//                         required
//                         value={formData.city}
//                         onChange={handleInputChange}
//                       />
//                       {errors.city && (
//                         <p className="error" style={{ color: "red" }}>
//                           {errors.city}
//                         </p>
//                       )}
//                     </div>

//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         State : <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="state"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="State"
//                         required
//                         value={formData.state}
//                         onChange={handleInputChange}
//                       />
//                       {errors.state && (
//                         <p className="error" style={{ color: "red" }}>
//                           {errors.state}
//                         </p>
//                       )}
//                     </div>

//                     <div className="lg:col-span-6">
//                       <label className="form-label font-semibold">
//                         Postal Code : <span className="text-red-600">*</span>
//                       </label>
//                       <input
//                         type="text"
//                         name="postalCode"
//                         className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
//                         placeholder="Postal Code"
//                         required
//                         value={formData.postalCode}
//                         onChange={handleInputChange}
//                       />
//                       {errors.postalCode && (
//                         <p className="error" style={{ color: "red" }}>
//                           {errors.postalCode}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex justify-between items-center mt-6">
//                     <button
//                       type="submit"
//                       className="inline-flex items-center py-2 px-6 rounded-md text-white bg-primary hover:bg-primary-dark"
//                     >
//                       Place Order
//                     </button>
//                     <Link
//                       to="/"
//                       className="inline-flex items-center py-2 px-6 rounded-md text-white bg-secondary hover:bg-secondary-dark"
//                     >
//                       Cancel
//                     </Link>
//                   </div>
//                 </form>
//               </div>
//             </div>

//             <div className="lg:col-span-4">
//               <div className="p-6 rounded-md shadow dark:shadow-gray-800">
//                 <h3 className="text-xl leading-normal font-semibold">
//                   Order Summary
//                 </h3>
//                 <div className="mt-6">
//                   <ul className="space-y-4">
//                     {products.map((item, index) => (
//                       <li
//                         key={index}
//                         className="flex justify-between items-center"
//                       >
//                         <div className="flex items-center">
//                           <img
//                             src={item.product.thumbnail}
//                             alt={item.product.name}
//                             className="w-16 h-16 object-cover"
//                           />
//                           <div className="ml-4">
//                             <h4 className="font-semibold">
//                               {item.product.name}
//                             </h4>
//                             <p className="text-sm text-gray-600">
//                               Quantity: {item.quantity}
//                             </p>
//                           </div>
//                         </div>
//                         <span className="text-gray-800">
//                           ₹{item.quantity * item.product.price}
//                         </span>
//                       </li>
//                     ))}
//                   </ul>

//                   <div className="mt-6 border-t border-gray-200 pt-4">
//                     <div className="flex justify-between font-semibold">
//                       <span>Total</span>
//                       <span>₹{formData.totalAmount}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }

// export default NewCheckOut;
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Baseurl } from "../../Config";
import { toast } from "react-toastify";
import axios from "axios";
const AccordionItem = ({ title, children, initiallyOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <div className="border border-solid border-gray-300 mb-6 p-4 rounded-md">
      <button
        className="w-full text-left flex items-center justify-between text-lg font-semibold text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        <svg
          className={`w-3 h-3 transform transition-transform ${
            isOpen ? "rotate-0" : "rotate-180"
          }`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5 5 1 1 5"
          />
        </svg>
      </button>
      {isOpen && <div className="mt-4">{children}</div>}
    </div>
  );
};

function NewCheckOut() {
  const [formData, setFormData] = useState({
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    phoneNumber: "",
    totalAmount: 0,
  });
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("userid");
  const accessToken = localStorage.getItem("accessToken");
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const [pincode, setPincode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("cartProducts"));
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    const totalAmount = localStorage.getItem("cartTotal");

    setFormData((prevData) => ({ ...prevData, totalAmount }));
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // For postal code, allow only numbers and restrict to 6 digits
    if (name === "postalCode") {
      const postalCodePattern = /^[0-9]{0,6}$/; // Only allows up to 6 digits
      if (!postalCodePattern.test(value)) {
        return; // Do not update if it doesn't match the pattern
      }
    }
    if (name === "phoneNumber") {
      const phoneNumberPattern = /^[0-9]*$/; // Only allows up to 6 digits
      if (value.length > 10) {
        return; // Do not update if it exceeds 10 digits
      }
      if (!phoneNumberPattern.test(value)) {
        return; // Do not update if the input isn't a number
      }
    }

    // Set the updated form data
    setFormData({ ...formData, [name]: value });
  };
  const handleAddressSelection = (e) => {
    const selectedAddressId = e.target.value;

    if (selectedAddressId === "new") {
      setIsAddingNewAddress(true); // User opted for a new address
      setSelectedAddress(null); // Reset selected address
    } else {
      setIsAddingNewAddress(false); // User selected an existing address
      const address = addresses.find((add) => add._id === selectedAddressId);
      setSelectedAddress(address); // Set the selected address
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Only validate new address fields if user is adding a new address
    if (isAddingNewAddress) {
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.state) newErrors.state = "State is required";
      if (!formData.postalCode)
        newErrors.postalCode = "Postal code is required";
      if (!formData.email) newErrors.email = "Email is required";

      // Additional validation for phone number and email format
      if (formData.phoneNumber.length !== 10) {
        newErrors.phoneNumber = "Phone number must be exactly 10 digits";
      }
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (formData.postalCode && formData.postalCode.length !== 6) {
        newErrors.postalCode = "Postal code must be 6 digits";
      }
    }

    return newErrors;
  };

  const paymentHandler = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const userId = localStorage.getItem("userid");
      if (!userId) {
        throw new Error("User ID not found in local storage");
      }

      const orderId = await createOrder();

      const response = await fetch(Baseurl + "/api/v1/payments/create", {
        method: "POST",
        body: JSON.stringify({
          orderId,
          amount: formData.totalAmount,
          currency: "INR",
          paymentMethod: "Credit Card",
          userId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create payment");
      }

      const order = await response.json();
      console.log(order);

      var options = {
        key: "rzp_test_HTwkRgRF0LKywx", // Use env variable
        amount: formData.totalAmount * 100,
        currency: "INR",
        name: "CHARAN SPARSH",
        description: "Test Transaction",
        image:
          "https://charansparsh.brandbell.in/assets/logocharansparsh-JWUXuxY_.png",
        order_id: order.payment.razorpayOrderId,
        handler: async function (response) {
          const body = {
            orderId: order.payment.razorpayOrderId,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          // Verify payment on backend
          const validateRes = await fetch(Baseurl + "/api/v1/payments/verify", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const jsonRes = await validateRes.json();
          console.log(jsonRes);
          if (validateRes.ok) {
            localStorage.removeItem("cartProducts");
            localStorage.setItem("orderId", jsonRes.payment.order);
            navigate("/Order-History");
          } else {
            navigate("/payment-failed");
          }
        },
        prefill: {
          name: "charansparsh",
          email: formData.email,
          contact: formData.phoneNumber,
        },
        notes: {
          address: formData.address,
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const createOrder = async () => {
    const customerId = localStorage.getItem("userid");
    if (!customerId) {
      alert("Customer ID not found in local storage.");
      return null;
    }

    try {
      const orderData = {
        customerId,
        products: products.map((item) => ({
          productId: item.product._id, // Accessing product ID from `item.product`
          quantity: item.quantity, // Accessing quantity directly from `item`
          price: item.price, // Accessing price directly from `item`
        })),
        totalAmount: formData.totalAmount,
        shippingInfo: selectedAddress
          ? {
              address: selectedAddress.address,
              city: selectedAddress.city,
              state: selectedAddress.state,
              postalCode: selectedAddress.postalCode,
              country: selectedAddress.country,
              phoneNumber: selectedAddress.phoneNumber,
            }
          : {
              address: formData.address,
              city: formData.city,
              state: formData.state,
              postalCode: formData.postalCode,
              country: formData.country,
              phoneNumber: formData.phoneNumber,
            },
        paymentInfo: {
          method: "Credit Card",
          status: "Pending",
        },
      };

      const response = await fetch(Baseurl + "/api/v1/order/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create order: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      if (
        !data ||
        !data.data ||
        !Array.isArray(data.data) ||
        data.data.length === 0
      ) {
        throw new Error("No orders created or incorrect response format");
      }

      // Return the ID of the first order
      return data.data.map((order) => order._id); // Return the order ID for the payment process
    } catch (error) {
      console.error("Error creating order:", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await fetch(
          `${Baseurl}/api/v1/adress?userId=${userId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch address details");
        }

        const data = await response.json();
        if (data.data && Array.isArray(data.data)) {
          setAddresses(data.data);
        } else {
          throw new Error("No address data available");
        }
      } catch (error) {
        console.error("Error fetching address details:", error);
      }
    };

    fetchAddressDetails();
  }, [userId, accessToken]);

  const handlePincodeChange = async (e) => {
    let inputPincode = e.target.value;

    // Ensure that the pincode has exactly 6 digits, trimming if necessary
    if (inputPincode.length > 6) {
      inputPincode = inputPincode.slice(0, 6);
    }
    setPincode(inputPincode);
    setFormData({ ...formData, postalCode: inputPincode });
    if (inputPincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${inputPincode}`
        );
        const data = response.data[0];

        if (data.Status === "Success") {
          setState(data.PostOffice[0].State);
          setCountry(data.PostOffice[0].Country);
          setDistrict(data.PostOffice[0].District);
          const postOfficeInfo = data.PostOffice[0];
          setFormData((prevData) => ({
            ...prevData,
            state: postOfficeInfo.State,
            country: postOfficeInfo.Country,
            city: postOfficeInfo.District,
          }));
        } else {
          alert("Invalid Pincode");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };
  const truncateText = (text, maxLength) => {
    if (!text) return ""; // Return an empty string if text is undefined or null
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <>
      <section className="relative md:py-8  w-full sm:container  md:container">
        <div className="grid lg:grid-cols-12 ">
          <div className="lg:col-span-8">
            <div className="p-6 rounded-md shadow  ">
              <AccordionItem
                title="Select Delivery Address"
                initiallyOpen={true}
              >
                {addresses.map((add, index) => (
                  <div key={index} className="border rounded p-4 mb-4">
                    <input
                      type="radio"
                      name="address"
                      id={add._id}
                      className="mr-2"
                      onChange={handleAddressSelection}
                    />
                    <label htmlFor={add._id}>
                      <p className="font-semibold">
                        {add.fullName} - {add.phoneNumber}
                      </p>
                      <p className="text-gray-700">{add.streetAddress}</p>
                    </label>
                    <button
                      className="mt-2 text-white bg-[#FF9343] rounded px-4 py-2"
                      onClick={() => setSelectedAddress(add)}
                      disabled={!selectedAddress} // Disable if no address is selected
                    >
                      Deliver Here
                    </button>
                  </div>
                ))}
              </AccordionItem>
            </div>
            <div className="p-6 rounded-md shadow ">
              <AccordionItem initiallyOpen={true}>
                <div className="flex items-center mb-4">
                  <input
                    type="radio"
                    name="address"
                    id="new"
                    value="new"
                    onChange={handleAddressSelection}
                    className="mr-2"
                  />
                  <button className="text-lg font-semibold mr-4">
                    Add a new address
                  </button>
                </div>
                {isAddingNewAddress && (
                  <form>
                    <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          First Name : <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100  focus:ring-0 mt-2"
                          placeholder="First Name:"
                          id="firstname"
                          name="name"
                          required=""
                        />
                      </div>

                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          Last Name : <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100  focus:ring-0 mt-2"
                          placeholder="Last Name:"
                          id="lastname"
                          name="name"
                          required=""
                        />
                      </div>

                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          Mobile Number
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            name="phoneNumber"
                            className=" w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100  focus:ring-0"
                            placeholder="mobile number"
                            required
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            minLength={10}
                            maxLength={10} // Limits the input to 10 digits
                            pattern="[0-9]{10}"
                          />
                          {errors.phoneNumber && (
                            <p className="error" style={{ color: "red" }}>
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          Your Email : <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100  focus:ring-0 mt-2"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.email && (
                          <p className="error" style={{ color: "red" }}>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="lg:col-span-12">
                        <label className="form-label font-semibold">
                          Address : <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="address"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100  focus:ring-0 mt-2"
                          placeholder="Address:"
                          id="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                        {errors.address && (
                          <p className="error" style={{ color: "red" }}>
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          Zip Code : <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="number"
                          name="postalCode"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100  focus:ring-0 mt-2"
                          placeholder="Zip:"
                          id="pincode"
                          value={pincode}
                          onChange={handlePincodeChange}
                          required
                          maxLength={6}
                        />
                        {errors.postalCode && (
                          <p className="error" style={{ color: "red" }}>
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                      <div className="lg:col-span-6">
                        <label className="font-semibold">Country:</label>
                        <input
                          type="text"
                          name="city"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
                          placeholder="Country"
                          value={country}
                          required
                          readOnly
                        />
                        {errors.city && (
                          <p className="error" style={{ color: "red" }}>
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div className="lg:col-span-6">
                        <label className="font-semibold">City:</label>
                        <input
                          type="text"
                          name="city"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
                          placeholder="City"
                          required
                          value={formData.city}
                        />
                        {errors.city && (
                          <p className="error" style={{ color: "red" }}>
                            {errors.city}
                          </p>
                        )}
                      </div>
                      <div className="lg:col-span-6">
                        <label className="form-label font-semibold">
                          State : <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="state"
                          className="w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-100 focus:ring-0 mt-2"
                          placeholder="State"
                          required
                          value={formData.state}
                        />
                        {errors.state && (
                          <p className="error" style={{ color: "red" }}>
                            {errors.state}
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                )}
              </AccordionItem>
            </div>

            <div className=" p-6">
              <h3 className="text-xl leading-normal font-semibold mt-6">
                Payment
              </h3>
              <div className="grid lg:grid-cols-12 grid-cols-1 mt-6 gap-5">
                <div className="lg:col-span-12">
                  <div className="block">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio border-gray-100  text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                          name="radio-colors"
                          value="1"
                        />
                        <span className="text-slate-400">Credit card</span>
                      </label>
                    </div>
                  </div>

                  <div className="block mt-2">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio border-gray-100  text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                          name="radio-colors"
                          value="1"
                        />
                        <span className="text-slate-400">COD</span>
                      </label>
                    </div>
                  </div>

                  <div className="block mt-2">
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          className="form-radio border-gray-100  text-orange-500 focus:border-orange-300 focus:ring focus:ring-offset-0 focus:ring-orange-200 focus:ring-opacity-50 me-2"
                          name="radio-colors"
                          value="1"
                        />
                        <span className="text-slate-400">PayPal</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 p-4">
              <button
                type="submit"
                className="inline-flex items-center py-2 px-6   bg-[#FF9343] text-white rounded  hover:bg-[#fff] hover:text-[#FF9343]  border hover:border-[#FF9343] "
                onClick={paymentHandler}
              >
                Place Order
              </button>
              <Link
                to="/"
                className="inline-flex items-center py-2 px-6 rounded-md text-white bg-secondary hover:bg-secondary-dark"
              >
                Cancel
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="p-6 rounded-md shadow dark:shadow-gray-800">
              <div className="flex justify-between items-center">
                <h5 className="text-lg font-semibold">Your Cart</h5>
                <a
                  href="#"
                  className="bg-orange-500 flex justify-center items-center text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full h-5"
                >
                  {products.length}
                </a>
              </div>

              <div className="mt-4 rounded-md shadow dark:shadow-gray-800">
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="p-3 flex justify-between items-center border border-gray-100"
                  >
                    <div>
                      <h1> {truncateText(product.product.title, 30)}</h1>
                    </div>

                    <p className="text-slate-400 font-semibold">
                      ₹{product.product.price * product.quantity}
                    </p>
                  </div>
                ))}

                <div className="p-3 flex justify-between items-center border border-gray-100">
                  <div>
                    <h5 className="font-semibold">Total (INR)</h5>
                  </div>
                  <p className="font-semibold">₹{formData.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NewCheckOut;
