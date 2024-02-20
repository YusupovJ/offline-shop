export interface ProductType {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
  description: string;
  products: ProductType[];
}

export const products: ProductType[] = [
  {
    id: 1,
    name: "Smartphone",
    description: "A powerful smartphone with high-resolution display and advanced features.",
    price: 599.99,
    image:
      "https://www.zdnet.com/a/img/resize/06119597d8fde27e3074dc3bb4a9ce0f1851280a/2023/04/24/4e586f53-afa2-452d-baf4-cc7c78c2c5fb/samsung-galaxy-a54-5g.jpg?auto=webp&fit=crop&height=900&width=1200",
  },
  {
    id: 2,
    name: "Laptop",
    description: "A lightweight laptop with a fast processor and long battery life.",
    price: 899.99,
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/06/laptops-2048px-5607.jpg?auto=webp&quality=75&crop=1.91:1&width=1200",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    description: "Premium wireless headphones with active noise cancellation technology.",
    price: 249.99,
    image: "https://images-cdn.ubuy.co.in/63ec2ab159725522bb0a8433-prtukyt-6s-wireless-bluetooth-headphones.jpg",
  },
  {
    id: 4,
    name: "Smartwatch",
    description: "A sleek smartwatch with fitness tracking and heart rate monitoring.",
    price: 199.99,
    image: "https://media.wired.com/photos/6511aab1189c419c40374c92/1:1/w_1358,h_1358,c_limit/Apple-Watch-Ultra-2-Alt-Gear.jpg",
  },
  {
    id: 5,
    name: "Digital Camera",
    description: "A high-resolution digital camera with advanced autofocus and image stabilization.",
    price: 799.99,
    image: "https://utopiacam.com/wp-content/uploads/2022/09/ZV1.jpg",
  },
  {
    id: 6,
    name: "Gaming Console",
    description: "A powerful gaming console with 4K graphics support and online multiplayer capabilities.",
    price: 499.99,
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/11/gamingconsoles-2048px-00633.jpg",
  },
  {
    id: 7,
    name: "Tablet",
    description: "A versatile tablet with a large touchscreen display and long battery life.",
    price: 399.99,
    image: "https://m.media-amazon.com/images/I/71Mt4JAZQtL.jpg",
  },
  {
    id: 8,
    name: "Wireless Speaker",
    description: "High-fidelity wireless speaker with immersive sound quality and voice assistant support.",
    price: 149.99,
    image: "https://m.media-amazon.com/images/I/713TUYjagQL.jpg",
  },
  {
    id: 9,
    name: "Fitness Tracker",
    description: "An advanced fitness tracker with GPS tracking and heart rate monitoring.",
    price: 129.99,
    image:
      "https://cdn.vox-cdn.com/thumbor/fLLSMVSEkx4HA66l9WIFgwX41-I=/0x0:2040x1360/768x512/filters:focal(1020x680:1021x681)/cdn.vox-cdn.com/uploads/chorus_asset/file/24259072/226428_Garmin_Venu_Sq_2_AKrales_0152.jpg",
  },
  {
    id: 10,
    name: "External Hard Drive",
    description: "A reliable external hard drive with large storage capacity and fast data transfer speeds.",
    price: 119.99,
    image: "https://cdn.thewirecutter.com/wp-content/media/2023/05/externalhardrives-2048px-09450.jpg?auto=webp&quality=75&crop=3:2&width=1024",
  },
];

export const categories: CategoryType[] = [
  {
    id: 1,
    name: "Electronics",
    image:
      "https://thumbs.dreamstime.com/b/electronics-store-flat-design-long-shadow-glyph-icon-household-equipment-online-shop-category-small-major-domestic-appliance-187368856.jpg",
    description: "Explore the latest electronic gadgets and devices.",
    products: [
      products[0], // Smartphone
      products[1], // Laptop
      products[2], // Wireless Headphones
      products[3], // Smartwatch
      products[4], // Digital Camera
    ],
  },
  {
    id: 2,
    name: "Gaming",
    image: "https://wtxnews.com/wp-content/uploads/2023/04/DualSense-Xbox-3f59-wcqpVD.jpeg",
    description: "Immerse yourself in the world of gaming with top-notch consoles and accessories.",
    products: [
      products[5], // Gaming Console
    ],
  },
  {
    id: 3,
    name: "Tablets",
    image:
      "https://res.cloudinary.com/teepublic/image/private/s--Xet6T5rD--/t_Resized%20Artwork/c_fit,g_north_west,h_1054,w_1054/co_ffffff,e_outline:53/co_ffffff,e_outline:inner_fill:53/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1627976811/production/designs/23440447_0.jpg",
    description: "Discover powerful and versatile tablets for work and entertainment.",
    products: [
      products[6], // Tablet
    ],
  },
  {
    id: 4,
    name: "Audio",
    image: "https://www.fyneaudio.com/wp-content/uploads/2021/08/F500sp-category-web-tile.jpg",
    description: "Experience superior sound quality with our range of audio devices and accessories.",
    products: [
      products[2], // Wireless Headphones
      products[8], // Wireless Speaker
    ],
  },
  {
    id: 5,
    name: "Wearable Tech",
    image: "https://www.42gears.com/wp-content/uploads/2020/07/IomTWearable-Technology-Featured-1.png",
    description: "Stay connected and track your fitness goals with our wearable technology.",
    products: [
      products[3], // Smartwatch
      products[9], // Fitness Tracker
    ],
  },
  {
    id: 6,
    name: "Computers",
    image: "https://media.gcflearnfree.org/content/55e0730c7dd48174331f5164_01_17_2014/whatisacomputer_desktop_computers.jpg",
    description: "Find the perfect computer to suit your needs, from powerful desktops to sleek laptops.",
    products: [
      products[1], // Laptop
      products[6], // Tablet
    ],
  },
  {
    id: 7,
    name: "Cameras",
    image: "https://www.adorama.com/alc/wp-content/uploads/2021/04/photography-camera-types-feature-825x465.jpg",
    description: "Capture life's moments in stunning detail with our range of digital cameras.",
    products: [
      products[4], // Digital Camera
    ],
  },
  {
    id: 8,
    name: "Smart Home",
    image:
      "https://iotnews.asia/wp-content/uploads/2018/10/All-Categories-of-Smart-Home-Devices-Forecast-to-Deliver-Double-Digit-Growth-Through-2022.jpg",
    description: "Transform your living space with cutting-edge smart home devices and technology.",
    products: [
      products[8], // Wireless Speaker (can be used in smart home setups)
    ],
  },
  {
    id: 9,
    name: "Storage",
    image: "https://windowsreport.com/wp-content/uploads/2020/10/usb-mass-storage-has-a-driver-problem-1200x1200.jpg",
    description: "Keep your files safe and accessible with our range of storage solutions.",
    products: [
      products[10], // External Hard Drive
    ],
  },
  {
    id: 10,
    name: "Accessories",
    image: "https://www.lancetrend.com/wp-content/uploads/2022/09/phone-accessories-2.jpg",
    description: "Complete your setup with our collection of essential tech accessories.",
    products: [
      products[2], // Wireless Headphones
      products[8], // Wireless Speaker
    ],
  },
];
