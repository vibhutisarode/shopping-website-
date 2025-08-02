const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
require('dotenv').config();

const sampleProducts = [
  {
    name: "iPhone 15 Pro",
    description: "The latest iPhone with advanced camera system and A17 Pro chip",
    price: 999,
    originalPrice: 1099,
    category: "smartphones",
    brand: "Apple",
    model: "iPhone 15 Pro",
    images: [
      {
        url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500&h=500&fit=crop",
        alt: "iPhone 15 Pro"
      }
    ],
    specifications: {
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main Camera",
      "Storage": "128GB"
    },
    features: ["Face ID", "Wireless Charging", "Water Resistant", "5G Compatible"],
    stock: 50,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.8,
      count: 245
    },
    reviews: [],
    tags: ["smartphone", "apple", "premium"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Natural Titanium", "Blue Titanium", "White Titanium", "Black Titanium"]
  },
  {
    name: "MacBook Pro 14-inch",
    description: "Powerful laptop with M3 chip for professional workflows",
    price: 1999,
    originalPrice: 2199,
    category: "laptops",
    brand: "Apple",
    model: "MacBook Pro 14",
    images: [
      {
        url: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=500&fit=crop",
        alt: "MacBook Pro 14-inch"
      }
    ],
    specifications: {
      "Processor": "Apple M3 chip",
      "Memory": "16GB",
      "Storage": "512GB SSD",
      "Display": "14.2-inch Liquid Retina XDR"
    },
    features: ["Touch ID", "Backlit Keyboard", "Force Touch Trackpad", "Thunderbolt 4"],
    stock: 25,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.9,
      count: 189
    },
    reviews: [],
    tags: ["laptop", "apple", "professional"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Space Gray", "Silver"]
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    description: "Flagship Android phone with S Pen and advanced AI features",
    price: 1199,
    category: "smartphones",
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    images: [
      {
        url: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop",
        alt: "Samsung Galaxy S24 Ultra"
      }
    ],
    specifications: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB"
    },
    features: ["S Pen", "5G", "120Hz Display", "AI Camera"],
    stock: 40,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.7,
      count: 156
    },
    reviews: [],
    tags: ["smartphone", "samsung", "android"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Titanium Black", "Titanium Gray", "Titanium Violet", "Titanium Yellow"]
  },
  {
    name: "Sony WH-1000XM5",
    description: "Premium noise-canceling wireless headphones",
    price: 399,
    originalPrice: 449,
    category: "headphones",
    brand: "Sony",
    model: "WH-1000XM5",
    images: [
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop",
        alt: "Sony WH-1000XM5"
      }
    ],
    specifications: {
      "Type": "Over-ear wireless",
      "Battery": "30 hours",
      "Connectivity": "Bluetooth 5.2",
      "Noise Canceling": "Yes"
    },
    features: ["Active Noise Canceling", "Touch Controls", "Quick Charge", "Multipoint Connection"],
    stock: 75,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.6,
      count: 324
    },
    reviews: [],
    tags: ["headphones", "sony", "wireless"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Black", "Silver"]
  },
  {
    name: "iPad Pro 12.9-inch",
    description: "Professional tablet with M2 chip and Apple Pencil support",
    price: 1099,
    category: "tablets",
    brand: "Apple",
    model: "iPad Pro 12.9",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
        alt: "iPad Pro 12.9-inch"
      }
    ],
    specifications: {
      "Display": "12.9-inch Liquid Retina XDR",
      "Chip": "Apple M2",
      "Storage": "128GB",
      "Camera": "12MP Wide + 10MP Ultra Wide"
    },
    features: ["Apple Pencil Support", "Magic Keyboard Compatible", "Face ID", "5G Option"],
    stock: 30,
    isActive: true,
    isFeatured: false,
    rating: {
      average: 4.8,
      count: 98
    },
    reviews: [],
    tags: ["tablet", "apple", "professional"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Space Gray", "Silver"]
  },
  {
    name: "Dell XPS 13",
    description: "Ultra-portable laptop with Intel Core i7 processor",
    price: 1299,
    category: "laptops",
    brand: "Dell",
    model: "XPS 13",
    images: [
      {
        url: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
        alt: "Dell XPS 13"
      }
    ],
    specifications: {
      "Processor": "Intel Core i7-1355U",
      "RAM": "16GB",
      "Storage": "512GB SSD",
      "Display": "13.4-inch FHD+"
    },
    features: ["Thunderbolt 4", "Backlit Keyboard", "Fingerprint Reader", "Wi-Fi 6E"],
    stock: 20,
    isActive: true,
    isFeatured: false,
    rating: {
      average: 4.5,
      count: 67
    },
    reviews: [],
    tags: ["laptop", "dell", "ultrabook"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Platinum Silver", "Graphite"]
  },
  {
    name: "PlayStation 5",
    description: "Next-generation gaming console with lightning-fast SSD and haptic feedback",
    price: 499,
    originalPrice: 599,
    category: "gaming",
    brand: "Sony",
    model: "PlayStation 5",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop",
        alt: "PlayStation 5"
      }
    ],
    specifications: {
      "CPU": "AMD Zen 2",
      "GPU": "AMD RDNA 2",
      "Memory": "16GB GDDR6",
      "Storage": "825GB SSD"
    },
    features: ["Ray Tracing", "Haptic Feedback", "3D Audio", "Backward Compatibility"],
    stock: 15,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.9,
      count: 892
    },
    reviews: [],
    tags: ["gaming", "console", "sony"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["White"]
  },
  {
    name: "Apple Watch Series 9",
    description: "Advanced health tracking and fitness features with bright Always-On Retina display",
    price: 399,
    originalPrice: 449,
    category: "wearables",
    brand: "Apple",
    model: "Watch Series 9",
    images: [
      {
        url: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop",
        alt: "Apple Watch Series 9"
      }
    ],
    specifications: {
      "Display": "45mm Always-On Retina",
      "Chip": "S9 SiP",
      "Battery": "Up to 18 hours",
      "Connectivity": "GPS + Cellular"
    },
    features: ["Health Monitoring", "Fitness Tracking", "ECG", "Blood Oxygen", "Always-On Display"],
    stock: 45,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.7,
      count: 567
    },
    reviews: [],
    tags: ["smartwatch", "apple", "fitness"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Midnight", "Starlight", "Silver", "Product Red"]
  },
  // Additional Smartphones
  {
    name: "Google Pixel 8 Pro",
    description: "Advanced AI photography and Pure Google experience with 7 years of updates",
    price: 999,
    originalPrice: 1099,
    category: "smartphones",
    brand: "Google",
    model: "Pixel 8 Pro",
    images: [
      {
        url: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop",
        alt: "Google Pixel 8 Pro"
      }
    ],
    specifications: {
      "Display": "6.7-inch LTPO OLED",
      "Processor": "Google Tensor G3",
      "RAM": "12GB",
      "Storage": "128GB"
    },
    features: ["Magic Eraser", "Real Tone", "Live Translate", "Car Crash Detection"],
    stock: 35,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.6,
      count: 423
    },
    reviews: [],
    tags: ["smartphone", "google", "photography"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Obsidian", "Porcelain", "Bay"]
  },
  {
    name: "OnePlus 12",
    description: "Flagship performance with Snapdragon 8 Gen 3 and ultra-fast charging",
    price: 799,
    originalPrice: 899,
    category: "smartphones",
    brand: "OnePlus",
    model: "OnePlus 12",
    images: [
      {
        url: "https://images.unsplash.com/photo-1607936854279-55e8f4bc0b9a?w=500&h=500&fit=crop",
        alt: "OnePlus 12"
      }
    ],
    specifications: {
      "Display": "6.82-inch LTPO AMOLED",
      "Processor": "Snapdragon 8 Gen 3",
      "RAM": "12GB",
      "Storage": "256GB"
    },
    features: ["100W SuperVOOC", "50W Wireless Charging", "Hasselblad Camera", "OxygenOS 14"],
    stock: 28,
    isActive: true,
    isFeatured: false,
    rating: {
      average: 4.5,
      count: 267
    },
    reviews: [],
    tags: ["smartphone", "oneplus", "fast-charging"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Silky Black", "Flowy Emerald"]
  },
  // Additional Laptops
  {
    name: "ASUS ROG Zephyrus G14",
    description: "Powerful gaming laptop with AMD Ryzen 9 and RTX 4070 graphics",
    price: 1899,
    originalPrice: 2099,
    category: "laptops",
    brand: "ASUS",
    model: "ROG Zephyrus G14",
    images: [
      {
        url: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=500&fit=crop",
        alt: "ASUS ROG Zephyrus G14"
      }
    ],
    specifications: {
      "Processor": "AMD Ryzen 9 7940HS",
      "Graphics": "NVIDIA RTX 4070",
      "RAM": "32GB DDR5",
      "Storage": "1TB SSD",
      "Display": "14-inch QHD+ 165Hz"
    },
    features: ["AniMe Matrix Display", "Dolby Atmos", "WiFi 6E", "USB4"],
    stock: 15,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.7,
      count: 189
    },
    reviews: [],
    tags: ["laptop", "gaming", "asus"],
    warranty: {
      duration: "2 years",
      type: "Manufacturer warranty"
    },
    colors: ["Eclipse Gray", "Moonlight White"]
  },
  {
    name: "HP Spectre x360 14",
    description: "Premium 2-in-1 convertible laptop with OLED display and long battery life",
    price: 1399,
    originalPrice: 1599,
    category: "laptops",
    brand: "HP",
    model: "Spectre x360 14",
    images: [
      {
        url: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=500&h=500&fit=crop",
        alt: "HP Spectre x360 14"
      }
    ],
    specifications: {
      "Processor": "Intel Core i7-1355U",
      "RAM": "16GB LPDDR5",
      "Storage": "512GB SSD",
      "Display": "13.5-inch 3K2K OLED Touch"
    },
    features: ["360° Hinge", "HP Pen Support", "Bang & Olufsen Audio", "Privacy Camera"],
    stock: 22,
    isActive: true,
    isFeatured: false,
    rating: {
      average: 4.4,
      count: 156
    },
    reviews: [],
    tags: ["laptop", "2-in-1", "hp"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Nightfall Black", "Natural Silver"]
  },
  // Additional Tablets
  {
    name: "Samsung Galaxy Tab S9 Ultra",
    description: "Premium Android tablet with S Pen and desktop-class performance",
    price: 1199,
    originalPrice: 1399,
    category: "tablets",
    brand: "Samsung",
    model: "Galaxy Tab S9 Ultra",
    images: [
      {
        url: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500&h=500&fit=crop",
        alt: "Samsung Galaxy Tab S9 Ultra"
      }
    ],
    specifications: {
      "Display": "14.6-inch Super AMOLED",
      "Processor": "Snapdragon 8 Gen 2",
      "RAM": "12GB",
      "Storage": "256GB"
    },
    features: ["S Pen Included", "DeX Mode", "5G Ready", "IP68 Water Resistant"],
    stock: 18,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.6,
      count: 234
    },
    reviews: [],
    tags: ["tablet", "samsung", "productivity"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Graphite", "Beige", "Cream"]
  },
  {
    name: "Microsoft Surface Pro 9",
    description: "Versatile 2-in-1 tablet with laptop performance and Surface Pen support",
    price: 999,
    originalPrice: 1199,
    category: "tablets",
    brand: "Microsoft",
    model: "Surface Pro 9",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&h=500&fit=crop",
        alt: "Microsoft Surface Pro 9"
      }
    ],
    specifications: {
      "Display": "13-inch PixelSense",
      "Processor": "Intel Core i5-1235U",
      "RAM": "8GB",
      "Storage": "256GB SSD"
    },
    features: ["Surface Pen Compatible", "Kickstand", "Windows 11", "Thunderbolt 4"],
    stock: 25,
    isActive: true,
    isFeatured: false,
    rating: {
      average: 4.3,
      count: 178
    },
    reviews: [],
    tags: ["tablet", "microsoft", "2-in-1"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Platinum", "Graphite", "Sapphire", "Forest"]
  },
  // Additional Audio Products
  {
    name: "Apple AirPods Pro 2nd Gen",
    description: "Advanced noise cancellation with spatial audio and USB-C charging",
    price: 249,
    originalPrice: 279,
    category: "audio",
    brand: "Apple",
    model: "AirPods Pro 2",
    images: [
      {
        url: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop",
        alt: "Apple AirPods Pro 2nd Gen"
      }
    ],
    specifications: {
      "Driver": "Custom Apple Driver",
      "Chip": "Apple H2",
      "Battery": "6 hours + 24 hours with case",
      "Connectivity": "Bluetooth 5.3"
    },
    features: ["Active Noise Cancellation", "Spatial Audio", "Transparency Mode", "USB-C Charging"],
    stock: 50,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.8,
      count: 1567
    },
    reviews: [],
    tags: ["audio", "wireless", "apple"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["White"]
  },
  {
    name: "Bose QuietComfort Ultra Earbuds",
    description: "World-class noise cancellation in wireless earbuds with immersive audio",
    price: 299,
    originalPrice: 349,
    category: "audio",
    brand: "Bose",
    model: "QuietComfort Ultra",
    images: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
        alt: "Bose QuietComfort Ultra Earbuds"
      }
    ],
    specifications: {
      "Driver": "Custom Bose Driver",
      "Battery": "6 hours + 18 hours with case",
      "Connectivity": "Bluetooth 5.3",
      "Controls": "Touch Controls"
    },
    features: ["World-Class ANC", "Immersive Audio", "CustomTune Technology", "Multipoint Bluetooth"],
    stock: 32,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.7,
      count: 892
    },
    reviews: [],
    tags: ["audio", "noise-cancelling", "bose"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Black", "White Smoke", "Moonstone Blue"]
  },
  // Smart Home Products
  {
    name: "Google Nest Hub Max",
    description: "Smart display with Google Assistant, camera, and home control hub",
    price: 229,
    originalPrice: 279,
    category: "smart-home",
    brand: "Google",
    model: "Nest Hub Max",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop",
        alt: "Google Nest Hub Max"
      }
    ],
    specifications: {
      "Display": "10-inch HD Touchscreen",
      "Camera": "6.5MP Camera",
      "Audio": "Stereo Speakers",
      "Connectivity": "WiFi, Bluetooth"
    },
    features: ["Google Assistant", "Video Calling", "Smart Home Control", "Photo Frame Mode"],
    stock: 28,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.4,
      count: 456
    },
    reviews: [],
    tags: ["smart-home", "display", "google"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Chalk", "Charcoal"]
  },
  {
    name: "Philips Hue White and Color Ambiance Starter Kit",
    description: "Smart LED bulbs with millions of colors and voice control compatibility",
    price: 199,
    originalPrice: 249,
    category: "smart-home",
    brand: "Philips",
    model: "Hue Starter Kit",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=500&h=500&fit=crop",
        alt: "Philips Hue Starter Kit"
      }
    ],
    specifications: {
      "Brightness": "800 lumens per bulb",
      "Colors": "16 million colors",
      "Lifespan": "25,000 hours",
      "Connectivity": "Zigbee"
    },
    features: ["Voice Control", "App Control", "Scheduling", "Sync with Entertainment"],
    stock: 40,
    isActive: true,
    isFeatured: false,
    rating: {
      average: 4.6,
      count: 789
    },
    reviews: [],
    tags: ["smart-home", "lighting", "philips"],
    warranty: {
      duration: "2 years",
      type: "Manufacturer warranty"
    },
    colors: ["White"]
  },
  // Additional Gaming Products
  {
    name: "Xbox Series X",
    description: "Most powerful Xbox ever with 4K gaming and Smart Delivery technology",
    price: 499,
    originalPrice: 599,
    category: "gaming",
    brand: "Microsoft",
    model: "Xbox Series X",
    images: [
      {
        url: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=500&h=500&fit=crop",
        alt: "Xbox Series X"
      }
    ],
    specifications: {
      "CPU": "AMD Zen 2",
      "GPU": "AMD RDNA 2",
      "Memory": "16GB GDDR6",
      "Storage": "1TB SSD"
    },
    features: ["4K Gaming", "Ray Tracing", "Smart Delivery", "Quick Resume"],
    stock: 12,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.8,
      count: 634
    },
    reviews: [],
    tags: ["gaming", "console", "microsoft"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["Black"]
  },
  {
    name: "Nintendo Switch OLED",
    description: "Handheld gaming console with vibrant OLED screen and versatile play modes",
    price: 349,
    originalPrice: 399,
    category: "gaming",
    brand: "Nintendo",
    model: "Switch OLED",
    images: [
      {
        url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=500&fit=crop",
        alt: "Nintendo Switch OLED"
      }
    ],
    specifications: {
      "Display": "7-inch OLED Touchscreen",
      "CPU": "NVIDIA Custom Tegra",
      "Storage": "64GB Internal",
      "Battery": "4.5-9 hours"
    },
    features: ["Handheld/TV Mode", "Joy-Con Controllers", "Touch Screen", "Local Multiplayer"],
    stock: 25,
    isActive: true,
    isFeatured: true,
    rating: {
      average: 4.7,
      count: 892
    },
    reviews: [],
    tags: ["gaming", "handheld", "nintendo"],
    warranty: {
      duration: "1 year",
      type: "Manufacturer warranty"
    },
    colors: ["White", "Neon Red/Blue"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/electrostore');
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} sample products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleProducts };
