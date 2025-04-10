const mongoose = require('mongoose');
const tf = require('@tensorflow/tfjs-node');
const sharp = require('sharp');
const axios = require('axios');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jewelry_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Product Schema
const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  category: String,
  price: Number,
  description: String,
  image: String,
  features: [Number],
  metalType: String,
  stoneType: String
});

const Product = mongoose.model('Product', ProductSchema);

// Load the AI model
let model;
async function loadModel() {
  try {
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    console.log('Model loaded successfully');
    return true;
  } catch (error) {
    console.error('Error loading model:', error);
    return false;
  }
}

// Function to extract features from an image URL
async function extractFeaturesFromUrl(imageUrl) {
  try {
    // Download the image
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(response.data);

    // Resize image to 224x224 (MobileNet input size) and convert to RGB
    const resizedImageBuffer = await sharp(imageBuffer)
      .resize(224, 224, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .removeAlpha()
      .toFormat('jpeg')
      .toBuffer();

    // Convert buffer to tensor
    const imageTensor = tf.node.decodeImage(resizedImageBuffer, 3)
      .expandDims(0)
      .toFloat()
      .div(255.0);

    // Get features from the model
    const features = model.predict(imageTensor);
    const featuresArray = await features.data();

    // Convert 1024 features to 512 by taking every other feature
    const reducedFeatures = Array.from(featuresArray).filter((_, i) => i % 2 === 0);

    // Normalize the features
    const magnitude = Math.sqrt(reducedFeatures.reduce((sum, val) => sum + val * val, 0));
    const normalizedFeatures = reducedFeatures.map(val => val / magnitude);

    // Cleanup
    imageTensor.dispose();
    features.dispose();

    return normalizedFeatures;
  } catch (error) {
    console.error('Error extracting features from URL:', error);
    // Return normalized random features as fallback
    const randomFeatures = Array(512).fill(0).map(() => Math.random() * 2 - 1);
    const magnitude = Math.sqrt(randomFeatures.reduce((sum, val) => sum + val * val, 0));
    return randomFeatures.map(val => val / magnitude);
  }
}

// Sample jewelry products with realistic data
const sampleProducts = [
  {
    id: '1',
    name: 'Diamond Solitaire Ring',
    category: 'Rings',
    price: 2499.99,
    description: 'Classic diamond solitaire ring in 18k white gold',
    image: 'https://cdn.augrav.com/online/jewels/2017/12/Unique-Platinum-Diamond-Rings-For-Women-4.jpg',
    metalType: 'white-gold',
    stoneType: 'diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '2',
    name: 'Vintage Emerald Ring',
    category: 'Rings',
    price: 1899.99,
    description: 'Vintage-style emerald and diamond ring in 18k yellow gold',
    image: 'https://cdn.shopclues.com/images1/thumbnails/56549/320/320/80356442-56549030-1654922549.jpg',
    metalType: 'yellow-gold',
    stoneType: 'emerald',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '3',
    name: 'Three-Stone Diamond Ring',
    category: 'Rings',
    price: 4999.99,
    description: 'Luxurious three-stone diamond engagement ring in platinum',
    image: 'https://www.candere.com/media/jewellery/images/KC04353YG_1.jpeg',
    metalType: 'platinum',
    stoneType: 'diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '4',
    name: 'Princess Cut Diamond Ring',
    category: 'Rings',
    price: 3899.99,
    description: 'Stunning princess cut diamond in platinum setting',
    image: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Sites-Tanishq-product-catalog/default/dw5f2c5c45/images/hi-res/510122FAAAA00.jpg?sw=480&sh=480',
    metalType: 'platinum',
    stoneType: 'diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '5',
    name: 'Dainty Silver Chain Necklace',
    category: 'Necklaces',
    price: 599.99,
    description: 'Elegant dainty silver chain necklace for everyday wear',
    image: 'https://images-cdn.ubuy.co.in/6669ddc2b536bd39f43027f4-tewiky-silver-necklace-for-women-dainty.jpg',
    metalType: 'silver',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '6',
    name: 'Stone Struck Layered Necklace',
    category: 'Necklaces',
    price: 899.99,
    description: 'Beautiful layered necklace with stone accents',
    image: 'https://zariin.com/cdn/shop/products/Stone-Struck-Layered-Necklace_96e3b54d-e117-4761-8148-2ce9138885e7.png?v=1743152250',
    metalType: 'gold-plated',
    stoneType: 'mixed',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '7',
    name: 'Traditional Gold Necklace',
    category: 'Necklaces',
    price: 3999.99,
    description: 'Exquisite traditional gold necklace with intricate design',
    image: 'https://assets.ajio.com/medias/sys_master/root/20240727/scRO/66a462f06f60443f31c9eb49/-473Wx593H-463229487-gold-MODEL.jpg',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '8',
    name: 'Pearl Chain Necklace',
    category: 'Necklaces',
    price: 799.99,
    description: 'Delicate pearl chain necklace with gold accents',
    image: 'https://cdn.caratlane.com/media/catalog/product/cache/6/image/480x480/9df78eab33525d08d6e5fb8d27136e95/J/L/JL04679-1RP900_11_listfront.jpg',
    metalType: 'yellow-gold',
    stoneType: 'pearl',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '9',
    name: 'Antique Gold Necklace',
    category: 'Necklaces',
    price: 2999.99,
    description: 'Antique-style gold necklace with traditional motifs',
    image: 'https://akshayagold.in/wp-content/uploads/sites/313/2022/08/500-12.jpg',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '10',
    name: 'Diamond Pendant Necklace',
    category: 'Necklaces',
    price: 1499.99,
    description: 'Elegant diamond pendant necklace in white gold',
    image: 'https://maioradiamonds.in/cdn/shop/files/MD-NK00003_800x.jpg?v=1734505824',
    metalType: 'white-gold',
    stoneType: 'diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '11',
    name: 'Contemporary Gold Necklace',
    category: 'Necklaces',
    price: 1299.99,
    description: 'Modern gold necklace with contemporary design',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh1igWMs74z6L3HhGUKN8c63C6KGr2lSKqnA&s',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '12',
    name: 'Kundan Bridal Necklace',
    category: 'Necklaces',
    price: 4999.99,
    description: 'Luxurious kundan bridal necklace with precious stones',
    image: 'https://www.anantexports.in/cdn/shop/files/IMG-20240527-WA0010.jpg?v=1716750357',
    metalType: 'yellow-gold',
    stoneType: 'kundan',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '13',
    name: 'Diamond Cluster Necklace',
    category: 'Necklaces',
    price: 2499.99,
    description: 'Stunning diamond cluster pendant necklace',
    image: 'https://kinclimg1.bluestone.com/f_jpg,c_scale,w_1024,q_80,b_rgb:f0f0f0/giproduct/BIAB0523N03_RAA18DIG4XXXXXXXX_ABCD00-PICS-00003-1024-44770.png',
    metalType: 'white-gold',
    stoneType: 'diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '14',
    name: 'Ruby Gold Necklace',
    category: 'Necklaces',
    price: 3499.99,
    description: 'Elegant gold necklace with ruby accents',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Hwd1fj5XuycFlqALrCdLWbuft9ryigHvlg&s',
    metalType: 'yellow-gold',
    stoneType: 'ruby',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '15',
    name: 'Diamond Choker Necklace',
    category: 'Necklaces',
    price: 5999.99,
    description: 'Luxurious diamond choker necklace in white gold',
    image: 'https://navrathan.com/wp-content/uploads/2024/11/NJJ-W_T-D-2152691-600x800.webp',
    metalType: 'white-gold',
    stoneType: 'diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '16',
    name: 'Circular Jhumka Earrings',
    category: 'Earrings',
    price: 799.99,
    description: 'Traditional circular jhumka earrings with intricate design',
    image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/27169944/2024/1/24/7d025b6f-da32-4403-881f-ff347e8153cb1706082421394RubansCircularJhumkasEarrings1.jpg',
    metalType: 'gold-plated',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '17',
    name: 'Pearl Drop Earrings',
    category: 'Earrings',
    price: 599.99,
    description: 'Elegant pearl drop earrings with gold accents',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2TFMPq0MHoApR1yTZ9rJtFXymfC0GC42vyQ&s',
    metalType: 'yellow-gold',
    stoneType: 'pearl',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '18',
    name: 'Traditional Gold Chandbali',
    category: 'Earrings',
    price: 1299.99,
    description: 'Classic chandbali earrings with intricate filigree work',
    image: 'https://assets.ajio.com/medias/sys_master/root/20240109/OcoR/659c80a474cb305fe00d378d/-473Wx593H-466964197-gold-MODEL5.jpg',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '19',
    name: 'Crystal Stud Earrings',
    category: 'Earrings',
    price: 499.99,
    description: 'Sparkling crystal stud earrings in silver setting',
    image: 'https://images-static.nykaa.com/media/catalog/product/0/9/0908d35DGIVAX00000351_1.jpg?tr=w-500',
    metalType: 'silver',
    stoneType: 'crystal',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '20',
    name: 'Sterling Silver Stone Earrings',
    category: 'Earrings',
    price: 699.99,
    description: 'Modern sterling silver earrings with colored stones',
    image: 'https://www.dishisjewels.com/image/cache/catalog/4297-925-Kirti-Sterling-Silver-Stone-Earrings-01-545x545.jpg',
    metalType: 'silver',
    stoneType: 'mixed',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '21',
    name: 'Ruby Zircon Earrings',
    category: 'Earrings',
    price: 1499.99,
    description: 'Luxurious ruby and zircon studded earrings',
    image: 'https://www.kushals.com/cdn/shop/files/zircon-earring-ruby-gold-zircon-earring-170943-39243672256668.jpg?v=1721879182&width=1200',
    metalType: 'yellow-gold',
    stoneType: 'ruby',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '22',
    name: 'White Stone Stud Earrings',
    category: 'Earrings',
    price: 899.99,
    description: 'Classic white stone stud earrings with floral design',
    image: 'https://www.chidambaramcovering.com/image/cache/catalog/Earrings1/erg2157-latest-white-stone-big-impon-stud-earrings-for-women-1-850x1000.jpg.webp',
    metalType: 'white-gold',
    stoneType: 'white-stone',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '23',
    name: 'Antique Gold Jhumkas',
    category: 'Earrings',
    price: 1099.99,
    description: 'Traditional antique finish gold jhumka earrings',
    image: 'https://www.soosi.co.in/cdn/shop/products/WhatsAppImage2022-03-16at1.27.49PM_580x.jpg?v=1647418449',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '24',
    name: 'Rose Gold American Diamond Bracelet',
    category: 'Bracelets',
    price: 899.99,
    description: 'Elegant rose gold-plated bracelet with American diamonds',
    image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/25131444/2023/9/23/7e38c233-a9a1-4946-b5a0-14606e0b3cf51695455270975JewelsGalaxyWomenRoseGoldWhiteAmericanDiamondRoseGold-Plated1.jpg',
    metalType: 'rose-gold-plated',
    stoneType: 'american-diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '25',
    name: 'Traditional Gold Kada',
    category: 'Bracelets',
    price: 2499.99,
    description: 'Traditional gold kada with intricate design work',
    image: 'https://www.divinehindu.in/cdn/shop/files/Untitled-2_0201e091-4ba8-403f-bec4-d7ce8cf6c5d6.jpg?v=1719412998',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '26',
    name: 'Silver Chain Bracelet',
    category: 'Bracelets',
    price: 599.99,
    description: 'Sleek silver chain bracelet for everyday wear',
    image: 'https://carltonlondon.co.in/cdn/shop/files/sb1607b_2.jpg?v=1741161932',
    metalType: 'silver',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '27',
    name: 'Pearl Tennis Bracelet',
    category: 'Bracelets',
    price: 799.99,
    description: 'Elegant pearl tennis bracelet with delicate design',
    image: 'https://d25g9z9s77rn4i.cloudfront.net/uploads/product/265/1661190684_0429d9ea23405e6d0325.jpg',
    metalType: 'white-gold',
    stoneType: 'pearl',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '28',
    name: 'Diamond Link Bracelet',
    category: 'Bracelets',
    price: 3999.99,
    description: 'Luxurious diamond link bracelet in white gold',
    image: 'https://kinclimg8.bluestone.com/f_jpg,c_scale,w_1024,q_80,b_rgb:f0f0f0/giproduct/BIPO0671V01-POSTER-50047.jpg',
    metalType: 'white-gold',
    stoneType: 'diamond',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '29',
    name: 'Crystal Tennis Bracelet',
    category: 'Bracelets',
    price: 699.99,
    description: 'Sparkling crystal tennis bracelet in silver setting',
    image: 'https://clarusworld.com/media/catalog/product/cache/0b98583e815a46c68015344254d5cc73/0/0/002_3_.jpg',
    metalType: 'silver',
    stoneType: 'crystal',
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '30',
    name: 'Gold Chain Bracelet',
    category: 'Bracelets',
    price: 1299.99,
    description: 'Classic gold chain bracelet with modern design',
    image: 'https://img.tatacliq.com/images/i11/437Wx649H/MP000000011289743_437Wx649H_202306202015051.jpeg',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  },
  {
    id: '31',
    name: 'Antique Gold Bangle',
    category: 'Bracelets',
    price: 1899.99,
    description: 'Traditional antique finish gold bangle with detailed work',
    image: 'https://psjewellery.in/cdn/shop/products/1nO0Oc-Zg_HUG8jWdTE4yhh8_tKeqXu8T.jpg?v=1708677795',
    metalType: 'yellow-gold',
    stoneType: null,
    features: Array(512).fill(0).map(() => Math.random() * 2 - 1)
  }
];

// Function to seed the database
async function seedDatabase() {
  try {
    // Load the model first
    await loadModel();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Process each product to extract features from its image
    const productsWithFeatures = await Promise.all(
      sampleProducts.map(async (product) => {
        console.log(`Processing features for ${product.name}...`);
        const features = await extractFeaturesFromUrl(product.image);
        return { ...product, features };
      })
    );

    // Insert new products with extracted features
    await Product.insertMany(productsWithFeatures);
    console.log('Successfully seeded products');

    // Close the database connection
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeding function
seedDatabase(); 