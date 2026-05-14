const axios = require('axios');

const BASE = 'https://e-mart-backend-5ake.onrender.com';
const ENDPOINT = `${BASE}/api/products/seed`;

// Existing category IDs from the API
const CATS = {
  men:      '684ab310df4c53b8d8042392',
  women:    '684bed08df4c53b8d80423ca',
  kids:     '684bed22df4c53b8d80423ce',
  beauty:   '684a9b4b8faf5e18742a4292',
  grocery:  '684aafca8faf5e18742a4299',
  shoes:    '684bf1eb656e0baf4acf630f',
};

// Using high-quality Unsplash images that reliably load
const products = [
  // ── MEN ──────────────────────────────────────────
  { name: "Classic White Oxford Shirt", description: "Premium 100% cotton Oxford shirt with a slim fit. Perfect for office or casual wear. Wrinkle-resistant fabric for all-day comfort.", brand: "Raymond", price: 1299, oldPrice: 1999, category: CATS.men, countInStock: 45, rating: 4.5, isFeatured: true, images: ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80"] },
  { name: "Slim Fit Chino Trousers", description: "Versatile chino trousers in a modern slim fit. Stretch fabric for comfort and style. Available in multiple colours.", brand: "Levi's", price: 1799, oldPrice: 2499, category: CATS.men, countInStock: 30, rating: 4.2, isFeatured: true, images: ["https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80"] },
  { name: "Casual Denim Jacket", description: "Classic denim jacket with a modern twist. Medium wash with subtle distressing. A wardrobe essential.", brand: "Wrangler", price: 2499, oldPrice: 3499, category: CATS.men, countInStock: 20, rating: 4.7, isFeatured: true, images: ["https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500&q=80"] },
  { name: "Polo T-Shirt", description: "Premium pique cotton polo shirt. Classic collar design with two-button placket. Perfect for smart casual occasions.", brand: "Lacoste", price: 999, oldPrice: 1499, category: CATS.men, countInStock: 60, rating: 4.3, isFeatured: false, images: ["https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&q=80"] },
  { name: "Formal Blazer", description: "Sharp single-breasted blazer in premium wool blend. Structured shoulders and clean lines for a polished look.", brand: "Van Heusen", price: 4999, oldPrice: 6999, category: CATS.men, countInStock: 15, rating: 4.6, isFeatured: false, images: ["https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80"] },
  { name: "Linen Kurta", description: "Breathable linen kurta with intricate embroidery. Ideal for festive occasions. Comes with matching pocket square.", brand: "Manyavar", price: 1599, oldPrice: 2200, category: CATS.men, countInStock: 25, rating: 4.4, isFeatured: false, images: ["https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80"] },
  { name: "Graphic Printed Tee", description: "100% cotton round-neck tee with bold graphic print. Relaxed fit for all-day comfort.", brand: "H&M", price: 599, oldPrice: 899, category: CATS.men, countInStock: 80, rating: 4.0, isFeatured: false, images: ["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&q=80"] },
  { name: "Track Pants", description: "Moisture-wicking track pants with side pockets and drawstring waist. Great for gym or lounging.", brand: "Nike", price: 1299, oldPrice: 1799, category: CATS.men, countInStock: 40, rating: 4.5, isFeatured: false, images: ["https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&q=80"] },

  // ── WOMEN ────────────────────────────────────────
  { name: "Floral Wrap Dress", description: "Elegant floral wrap dress in lightweight georgette fabric. V-neckline and flowy silhouette for a feminine look. Perfect for brunches and parties.", brand: "Zara", price: 1999, oldPrice: 2999, category: CATS.women, countInStock: 35, rating: 4.8, isFeatured: true, images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80"] },
  { name: "High-Waist Jeans", description: "Classic high-waist denim jeans in a straight-leg cut. Stretch denim for comfort. A timeless wardrobe staple.", brand: "Levi's", price: 2299, oldPrice: 3299, category: CATS.women, countInStock: 50, rating: 4.6, isFeatured: true, images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80"] },
  { name: "Embroidered Kurta Set", description: "Stunning three-piece kurta set with heavy embroidery work. Comes with matching dupatta and palazzos.", brand: "Biba", price: 3499, oldPrice: 4999, category: CATS.women, countInStock: 20, rating: 4.7, isFeatured: true, images: ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&q=80"] },
  { name: "Casual Crop Top", description: "Trendy ribbed crop top in soft jersey fabric. Wide neckline and short sleeves for a relaxed fit.", brand: "H&M", price: 699, oldPrice: 999, category: CATS.women, countInStock: 70, rating: 4.2, isFeatured: false, images: ["https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=500&q=80"] },
  { name: "Pleated Midi Skirt", description: "Elegant pleated midi skirt in satin finish. Elastic waistband for comfort. Pairs well with crop tops or blouses.", brand: "Mango", price: 1499, oldPrice: 2199, category: CATS.women, countInStock: 28, rating: 4.4, isFeatured: false, images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&q=80"] },
  { name: "Knit Cardigan", description: "Cosy oversized knit cardigan in a chunky weave. Long sleeves with deep pockets. Perfect for layering.", brand: "Forever 21", price: 1299, oldPrice: 1899, category: CATS.women, countInStock: 33, rating: 4.3, isFeatured: false, images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&q=80"] },
  { name: "Saree — Silk Kanjivaram", description: "Authentic Kanjivaram silk saree with zari border and intricate pallu. Comes with unstitched blouse piece.", brand: "Nalli", price: 8999, oldPrice: 12000, category: CATS.women, countInStock: 10, rating: 4.9, isFeatured: false, images: ["https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500&q=80"] },
  { name: "Sports Bra", description: "High-impact sports bra with mesh panel detailing. Moisture-wicking fabric and padded cups for support.", brand: "Nike", price: 1099, oldPrice: 1599, category: CATS.women, countInStock: 55, rating: 4.5, isFeatured: false, images: ["https://images.unsplash.com/photo-1571945192236-75c9bfc47e27?w=500&q=80"] },

  // ── KIDS ─────────────────────────────────────────
  { name: "Dinosaur Print Tee", description: "Fun dinosaur print T-shirt in 100% soft cotton. Crew neck with short sleeves. Easy to wash and durable.", brand: "Carter's", price: 399, oldPrice: 599, category: CATS.kids, countInStock: 90, rating: 4.6, isFeatured: true, images: ["https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500&q=80"] },
  { name: "Denim Dungaree", description: "Adorable denim dungaree with adjustable straps and cute patch pockets. Easy snap buttons at the crotch.", brand: "H&M Kids", price: 999, oldPrice: 1499, category: CATS.kids, countInStock: 40, rating: 4.7, isFeatured: true, images: ["https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=500&q=80"] },
  { name: "School Backpack", description: "Durable 20L school backpack with padded shoulder straps, multiple compartments, and a built-in pencil case.", brand: "Wildcraft", price: 799, oldPrice: 1199, category: CATS.kids, countInStock: 60, rating: 4.4, isFeatured: false, images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80"] },
  { name: "Girls Tutu Dress", description: "Magical tutu dress in soft tulle with sequin bodice. Perfect for birthdays and special occasions.", brand: "Babyhug", price: 599, oldPrice: 899, category: CATS.kids, countInStock: 45, rating: 4.5, isFeatured: false, images: ["https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&q=80"] },
  { name: "Kids Joggers Set", description: "Comfortable 2-piece jogger set with hoodie and matching pants. Fleece lining for warmth.", brand: "Mothercare", price: 699, oldPrice: 999, category: CATS.kids, countInStock: 55, rating: 4.3, isFeatured: false, images: ["https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&q=80"] },

  // ── BEAUTY ───────────────────────────────────────
  { name: "Vitamin C Face Serum", description: "Brightening Vitamin C serum with 15% ascorbic acid. Fades dark spots, evens skin tone, and boosts collagen. Dermatologist tested.", brand: "Minimalist", price: 699, oldPrice: 999, category: CATS.beauty, countInStock: 100, rating: 4.8, isFeatured: true, images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80"] },
  { name: "Matte Lipstick Collection", description: "Long-lasting matte lipstick available in 12 bold shades. Hydrating formula with Vitamin E for smooth application.", brand: "Lakme", price: 349, oldPrice: 499, category: CATS.beauty, countInStock: 150, rating: 4.5, isFeatured: true, images: ["https://images.unsplash.com/photo-1586495777744-4e6232bf8c3b?w=500&q=80"] },
  { name: "Niacinamide 10% Serum", description: "Oil control serum with 10% Niacinamide and 1% Zinc. Minimises pores, reduces blemishes, and balances sebum.", brand: "Minimalist", price: 599, oldPrice: 799, category: CATS.beauty, countInStock: 80, rating: 4.7, isFeatured: false, images: ["https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=500&q=80"] },
  { name: "Luxury Perfume — Oud", description: "Opulent Oud fragrance with notes of dark rose, amber, and sandalwood. Long-lasting 8-hour sillage. 100ml EDP.", brand: "Ajmal", price: 2499, oldPrice: 3499, category: CATS.beauty, countInStock: 25, rating: 4.9, isFeatured: true, images: ["https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500&q=80"] },
  { name: "SPF 50 Sunscreen", description: "Lightweight gel sunscreen with SPF 50+ PA++++. No white cast. Suitable for oily and combination skin.", brand: "Re'equil", price: 499, oldPrice: 699, category: CATS.beauty, countInStock: 120, rating: 4.6, isFeatured: false, images: ["https://images.unsplash.com/photo-1556228720-da6466e69177?w=500&q=80"] },
  { name: "Hyaluronic Acid Moisturiser", description: "Deep hydrating moisturiser with 2% Hyaluronic Acid and Ceramides. Plumps skin and restores moisture barrier.", brand: "CeraVe", price: 899, oldPrice: 1299, category: CATS.beauty, countInStock: 70, rating: 4.8, isFeatured: false, images: ["https://images.unsplash.com/photo-1643185539104-3622eb1ed89a?w=500&q=80"] },
  { name: "12-Pan Eyeshadow Palette", description: "Highly pigmented palette with 12 neutral to smoky shades. Mix of matte, shimmer, and glitter finishes.", brand: "Swiss Beauty", price: 799, oldPrice: 1199, category: CATS.beauty, countInStock: 60, rating: 4.4, isFeatured: false, images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&q=80"] },
  { name: "Hair Growth Serum", description: "DHT-blocking hair serum with Redensyl and Procapil. Reduces hair fall and promotes new growth in 12 weeks.", brand: "Traya", price: 1199, oldPrice: 1599, category: CATS.beauty, countInStock: 45, rating: 4.5, isFeatured: false, images: ["https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=500&q=80"] },

  // ── GROCERIES ────────────────────────────────────
  { name: "Cold Pressed Coconut Oil", description: "Pure, unrefined cold-pressed coconut oil. No additives or preservatives. Ideal for cooking, hair, and skin care. 1 Litre.", brand: "Parachute", price: 349, oldPrice: 499, category: CATS.grocery, countInStock: 200, rating: 4.6, isFeatured: true, images: ["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80"] },
  { name: "Organic Honey — Wild Forest", description: "Raw, unprocessed wild forest honey. Rich in antioxidants and enzymes. No added sugar or corn syrup. 500g.", brand: "Dabur", price: 299, oldPrice: 449, category: CATS.grocery, countInStock: 150, rating: 4.7, isFeatured: false, images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&q=80"] },
  { name: "Multigrain Atta (5kg)", description: "Heart-healthy multigrain flour blend with wheat, jowar, bajra, ragi, and oats. High in fibre and protein.", brand: "Aashirvaad", price: 299, oldPrice: 399, category: CATS.grocery, countInStock: 100, rating: 4.4, isFeatured: false, images: ["https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80"] },
  { name: "Premium Basmati Rice (2kg)", description: "Long-grain aged Basmati rice with authentic aroma. Naturally grown with no artificial preservatives.", brand: "India Gate", price: 249, oldPrice: 349, category: CATS.grocery, countInStock: 180, rating: 4.5, isFeatured: false, images: ["https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?w=500&q=80"] },
  { name: "Almonds — California (500g)", description: "Premium California almonds, raw and unsalted. Rich in Vitamin E and healthy fats. Resealable zip-lock pack.", brand: "Happilo", price: 699, oldPrice: 999, category: CATS.grocery, countInStock: 90, rating: 4.8, isFeatured: true, images: ["https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=500&q=80"] },
  { name: "Green Tea — 25 Bags", description: "Antioxidant-rich green tea bags with natural flavour. Zero calories. Boosts metabolism and energy levels.", brand: "Lipton", price: 149, oldPrice: 199, category: CATS.grocery, countInStock: 300, rating: 4.3, isFeatured: false, images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80"] },
  { name: "Peanut Butter — Crunchy (1kg)", description: "High-protein crunchy peanut butter made from 100% roasted peanuts. No added oil, sugar, or preservatives.", brand: "MuscleBlaze", price: 399, oldPrice: 549, category: CATS.grocery, countInStock: 120, rating: 4.6, isFeatured: false, images: ["https://images.unsplash.com/photo-1614201872097-ab8b87de40e5?w=500&q=80"] },

  // ── SHOES ────────────────────────────────────────
  { name: "Running Sneakers", description: "Lightweight mesh running shoes with responsive foam midsole and rubber outsole. Breathable upper for long runs.", brand: "Nike", price: 3999, oldPrice: 5999, category: CATS.shoes, countInStock: 35, rating: 4.7, isFeatured: true, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"] },
  { name: "Leather Derby Shoes", description: "Handcrafted full-grain leather derby shoes with cushioned insole and rubber sole. Perfect for formal occasions.", brand: "Clarks", price: 4499, oldPrice: 6499, category: CATS.shoes, countInStock: 20, rating: 4.8, isFeatured: true, images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&q=80"] },
  { name: "Canvas Slip-Ons", description: "Classic canvas slip-on shoes with elastic goring for easy wear. Padded collar and insole for comfort.", brand: "Vans", price: 1799, oldPrice: 2499, category: CATS.shoes, countInStock: 50, rating: 4.4, isFeatured: false, images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&q=80"] },
  { name: "Chunky Platform Sandals", description: "Trendy platform sandals with adjustable ankle strap and EVA sole. Adds 4cm height. Perfect for summer.", brand: "Steve Madden", price: 2199, oldPrice: 3199, category: CATS.shoes, countInStock: 30, rating: 4.5, isFeatured: false, images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&q=80"] },
  { name: "Ankle Boots — Chelsea", description: "Sleek Chelsea ankle boots in premium faux leather. Elastic side panels and pull tab for easy on/off.", brand: "Aldo", price: 3299, oldPrice: 4799, category: CATS.shoes, countInStock: 22, rating: 4.6, isFeatured: false, images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=500&q=80"] },
  { name: "Sports Floaters", description: "Comfortable EVA floaters with adjustable velcro straps. Waterproof and quick-drying. Ideal for beach and outdoor.", brand: "Adidas", price: 999, oldPrice: 1499, category: CATS.shoes, countInStock: 75, rating: 4.2, isFeatured: false, images: ["https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&q=80"] },
  { name: "High-Top Basketball Shoes", description: "High-top basketball shoes with ankle support strap and non-slip herringbone outsole. Air cushion midsole.", brand: "Jordan", price: 5999, oldPrice: 8999, category: CATS.shoes, countInStock: 18, rating: 4.9, isFeatured: true, images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&q=80"] },
];

async function seed() {
  console.log(`Seeding ${products.length} products...`);
  let success = 0, fail = 0;

  for (const p of products) {
    try {
      const res = await axios.post(ENDPOINT, p, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.data && res.data._id) {
        console.log(`✓ ${p.name}`);
        success++;
      } else {
        console.log(`✗ ${p.name}:`, JSON.stringify(res.data).slice(0, 100));
        fail++;
      }
    } catch (e) {
      console.log(`✗ ${p.name}: ${e.response?.data?.message || e.message}`);
      fail++;
    }
    // Small delay to avoid overwhelming the server
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nDone: ${success} created, ${fail} failed`);
}

seed();
