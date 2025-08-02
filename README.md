# ElectroStore - Electronic Appliances E-commerce Website

A modern, responsive e-commerce website built with the MERN stack for selling electronic appliances and gadgets.

## 🚀 Features

### Frontend Features
- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Product Catalog**: Browse products by categories with filtering and search
- **Shopping Cart**: Add/remove items, manage quantities
- **User Authentication**: Login, registration, and profile management
- **Product Details**: Detailed product pages with specifications and reviews
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Backend Features
- **RESTful API**: Clean, scalable API architecture
- **User Management**: Registration, authentication, and profile management
- **Product Management**: CRUD operations for products
- **Order Processing**: Complete order management system
- **Security**: JWT authentication, password hashing, and data validation

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Styled Components** for styling
- **Axios** for API calls
- **React Toastify** for notifications
- **React Icons** for beautiful icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Multer** for file uploads
- **CORS** for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```



5. Start the development server:
```bash
npm run dev
```

The backend will be running on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
echo "REACT_APP_API_URL=http://localhost:5000" > .env
```

4. Start the development server:
```bash
npm start
```

The frontend will be running on `http://localhost:3000`

## 🗂️ Project Structure

```
electrostore/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── users.js
│   │   ├── products.js
│   │   └── orders.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   ├── Footer/
│   │   │   └── ProductCard/
│   │   ├── pages/
│   │   │   ├── Home/
│   │   │   ├── Products/
│   │   │   ├── Auth/
│   │   │   └── Cart/
│   │   ├── store/
│   │   │   ├── store.ts
│   │   │   └── slices/
│   │   ├── styles/
│   │   └── utils/
│   ├── public/
│   └── package.json
└── README.md
```

## 🎯 Product Categories

- **Smartphones**: Latest mobile devices
- **Laptops**: Computing devices for work and gaming
- **Tablets**: Portable touch devices
- **Audio**: Headphones, speakers, and sound systems
- **Smart Home**: IoT devices and home automation
- **Gaming**: Gaming consoles and accessories
- **Cameras**: Photography and videography equipment
- **Wearables**: Smartwatches and fitness trackers

## 🔧 API Endpoints

### Authentication
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get product categories

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status

## 🎨 UI Features

### Design System
- **Color Palette**: Modern gradient themes with purple and blue accents
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Reusable, styled components with consistent design
- **Animations**: Smooth hover effects and transitions
- **Icons**: Comprehensive icon set for better UX

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Responsive design for all screen sizes
- **Grid System**: Flexible grid layouts
- **Touch Friendly**: Optimized for touch interactions

## 🚦 Getting Started

1. **Clone the repository**
2. **Set up the backend** following the Backend Setup instructions
3. **Set up the frontend** following the Frontend Setup instructions
4. **Access the application** at `http://localhost:3000`
5. **Create an account** or login to start shopping

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **ElectroStore Team** - *Initial work*

## 🙏 Acknowledgments

- React community for excellent documentation
- MongoDB for the robust database solution
- Express.js for the fast and flexible backend framework
- All open-source contributors whose packages made this project possible

---

**Happy Shopping! 🛒✨**
