export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Blouses" | "Tops" | "Dresses" | "Trousers" | "Outerwear";
  sizes: ("S" | "M" | "L" | "XL")[];
  colors: ("Sand" | "Olive" | "Terracotta" | "Natural" | "Charcoal")[];
  image: string;
  hoverImage?: string;
  description: string;
  details: string[];
  inStock: boolean;
  featured?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Sand Minimalist Linen Blouse",
    price: 1100,
    category: "Blouses",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sand", "Natural"],
    image: "/products/1.jpeg",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    description: "Crafted from 100% pure organic linen. Features a relaxed silhouette with mother-of-pearl buttons and subtle dropped shoulders for effortless elegance.",
    details: ["100% Organic Egyptian Linen", "Mother-of-pearl buttons", "Relaxed fit", "Breathable & lightweight"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Olive Earth Cotton Blouse",
    price: 980,
    category: "Tops",
    sizes: ["S", "M", "L"],
    colors: ["Olive"],
    image: "/products/2.jpeg",
    hoverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
    description: "Hand-dyed organic cotton top with natural botanical tones. Designed for maximum softness and versatile daily wear.",
    details: ["100% Organic Raw Cotton", "Plant-based eco dye", "Pre-washed for softness", "Ethically made"],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Terracotta Wrap Linen Blouse",
    price: 1050,
    category: "Blouses",
    sizes: ["M", "L", "XL"],
    colors: ["Terracotta"],
    image: "/products/3.jpeg",
    hoverImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
    description: "A flattering wrap blouse featuring warm terracotta hues, adjustable waist ties, and flowy bell sleeves.",
    details: ["100% Pure Flax Linen", "Adjustable side-tie closure", "V-neckline", "Natural earthy texture"],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "Charcoal Raw Edge Tunic",
    price: 1250,
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal"],
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    description: "A deep charcoal linen tunic with raw unfinished hem detailing. Designed for layered minimalism.",
    details: ["Heavyweight organic linen", "Raw fray-proof hems", "Side seam slits", "Relaxed oversized cut"],
    inStock: true,
    featured: false,
  },
  {
    id: "5",
    name: "Natural Raw Linen Maxi Dress",
    price: 1650,
    category: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Natural", "Sand"],
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
    description: "An airy, floor-length minimalist dress in unbleached natural flax. Comes with side pockets and a subtle back keyhole button.",
    details: ["100% Unbleached Flax Linen", "Hidden side pockets", "Ankle-length flared hem", "Cooling breathability"],
    inStock: true,
    featured: true,
  },
  {
    id: "6",
    name: "Sand Wide-Leg Linen Trousers",
    price: 1350,
    category: "Trousers",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sand", "Natural"],
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    description: "High-waisted trousers with an elasticated back waistband, front pleats, and wide flowy legs for maximum movement.",
    details: ["Medium-weight organic linen", "Elastic waistband with drawstring", "Deep side slant pockets", "High rise fit"],
    inStock: true,
    featured: false,
  },
  {
    id: "7",
    name: "Olive Earth Kimono Cardigan",
    price: 1480,
    category: "Outerwear",
    sizes: ["S", "M", "L"],
    colors: ["Olive"],
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
    description: "An open-front linen kimono jacket with wide ¾ sleeves and a relaxed boxy drape. Perfect for transitional layering.",
    details: ["100% Linen weave", "Open front silhouette", "Dropped shoulder seams", "Garment-washed"],
    inStock: true,
    featured: false,
  },
  {
    id: "8",
    name: "Terracotta Sundress",
    price: 1550,
    category: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Terracotta"],
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
    hoverImage: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    description: "Sleeveless square-neck linen sundress with a tiered flared skirt and delicate wooden back buttons.",
    details: ["Organic flax linen", "Square neck cut", "Tiered skirt", "Natural wood buttons"],
    inStock: true,
    featured: false,
  }
];
