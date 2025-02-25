# TechHaven - Your Ultimate E-commerce Solution

Welcome to **TechHaven**, an advanced and feature-rich eCommerce platform designed to provide a seamless online shopping experience.

## 🌐 Live Demo

🔗 **[TechHaven](https://mytechhaven.vercel.app/)** - Explore the live version of the project.

---

## 🚀 Features

✅ Modern UI/UX with **Next.js & Tailwind CSS**  
✅ Secure Authentication (Login, Register)  
✅ Product Listings & Categories  
✅ Shopping Cart & Checkout System  
✅ Payment Integration  
✅ Order Management  
✅ User Profile Management  
✅ API Routes for Backend Operations  
✅ Fully Responsive Design  

---

## 📦 Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Payment Gateway:** Stripe/PayPal *(Optional)*
- **Deployment:** Vercel

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/0xDevUsman/ecommerce-app.git
cd ecommerce-app
```

### 2️⃣ Install Dependencies
```sh
npm install
# or
yarn install
```

### 3️⃣ Setup Environment Variables
Create a `.env.local` file in the root directory and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
```

### 4️⃣ Run the Development Server
```sh
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📜 API Endpoints

| Method | Endpoint              | Description          |
|--------|----------------------|----------------------|
| GET    | `/api/products`       | Get all products    |
| GET    | `/api/products/:id`   | Get product by ID   |
| POST   | `/api/auth/register`  | User registration   |
| POST   | `/api/auth/login`     | User login          |
| POST   | `/api/cart`           | Add to cart         |
| DELETE | `/api/cart/clear`     | Clear cart          |
| POST   | `/api/orders`         | Create an order     |
| GET    | `/api/orders`         | Get user orders     |

---

## 👨‍💻 Contribution

We welcome contributions! To contribute:
1. Fork the repo
2. Create a feature branch (`git checkout -b feature-branch`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 📬 Contact

For any queries or suggestions, reach out to me:  
🐙 GitHub: [0xDevUsman](https://github.com/0xDevUsman)  
