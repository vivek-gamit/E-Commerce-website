// --- 1. Category Images ---
import Casual_Wears from '../assets/images/category/img-1.jpg'
import Suits from '../assets/images/category/img-2.jpg'
import Party_Wears_women from '../assets/images/category/img-3.jpg'
import Party_Wears_men from '../assets/images/category/img-4.jpg'
import Sports_Wears from '../assets/images/category/img-5.png'

// --- 2. Product Images (Main & Hover) ---
import bag_1 from '../assets/images/component_2/bag_1.png'
import bag_2 from '../assets/images/component_2/bag_2.png'
import glasses_1 from '../assets/images/component_2/glasses_1.png'
import glasses_2 from '../assets/images/component_2/glasses_2.png'
import watch_1 from '../assets/images/component_2/watch_1.png'
import watch_2 from '../assets/images/component_2/watch_2.png'

// --- 3. Specific Collection Images (Bags, Glasses, Watches) ---
import Taupe_Bag_1 from '../assets/images/product/Bag/Taupe_Bag_1.png'
import Taupe_Bag_2 from '../assets/images/product/Bag/Taupe_Bag_2.png'
import Taupe_Bag_3 from '../assets/images/product/Bag/Taupe_Bag_3.png'
import Taupe_Bag_4 from '../assets/images/product/Bag/Taupe_Bag_4.png'
import hover_img_1 from '../assets/images/product/Bag/hover_img_1.png'
import hover_img_2 from '../assets/images/product/Bag/hover_img_2.png'
import hover_img_3 from '../assets/images/product/Bag/hover_img_3.png'
import hover_img_4 from '../assets/images/product/Bag/hover_img_4.png'

import G_hover_1 from '../assets/images/product/Glasses/G_hover_1.png'
import G_hover_3 from '../assets/images/product/Glasses/G_hover_3.png'
import glasses_3 from '../assets/images/product/Glasses/glassess_3.png'

import watch_3 from '../assets/images/product/watch/watch_3.png'
import W_hover_1 from '../assets/images/product/watch/W_hover_1.png'
import W_hover_2 from '../assets/images/product/watch/W_hover_2.png'
import W_hover_3 from '../assets/images/product/watch/W_hover_3.png'

// --- 4. Other Assets ---
export const banner_1 = '../assets/images/banner_1.png'

// --- Data Exports ---

export const categories = [
    { id: 1, name: 'Casual Wears', image: Casual_Wears },
    { id: 2, name: 'Suits', image: Suits },
    { id: 3, name: 'Party Wears', image: Party_Wears_women },
    { id: 4, name: 'Party Wears', image: Party_Wears_men },
    { id: 5, name: 'Sports Wears', image: Sports_Wears }
];

export const products = [
    { id: 1, name: "Taupe Bag", category: "bags", price: "4,999", mainImg: bag_1, hoverImg: bag_2 },
    { id: 2, name: "Sunset Glasses", category: "glasses", price: "2,499", mainImg: glasses_1, hoverImg: glasses_2 },
    { id: 3, name: "Elite Watch", category: "watches", price: "8,999", mainImg: watch_1, hoverImg: watch_2 },
];

export const small_cards = [
    { id: 1, name: "Taupe Bag", category: "bags", price: "4,999", mainImg: Taupe_Bag_1, hoverImg: hover_img_1 },
    { id: 2, name: "Taupe Bag", category: "bags", price: "4,999", mainImg: Taupe_Bag_2, hoverImg: hover_img_2 },
    { id: 3, name: "Taupe Bag", category: "bags", price: "4,999", mainImg: Taupe_Bag_3, hoverImg: hover_img_3 },
    { id: 4, name: "Taupe Bag", category: "bags", price: "4,999", mainImg: Taupe_Bag_4, hoverImg: hover_img_4 },
    { id: 5, name: "Glasses", category: "glasses", price: "4,999", mainImg: glasses_1, hoverImg: G_hover_1 },
    { id: 6, name: "Glasses", category: "glasses", price: "4,999", mainImg: glasses_3, hoverImg: G_hover_3 },
    { id: 7, name: "Watch", category: "watches", price: "4,999", mainImg: watch_1, hoverImg: W_hover_1 },
    { id: 8, name: "Watch", category: "watches", price: "4,999", mainImg: watch_2, hoverImg: W_hover_2 },
    { id: 9, name: "Watch", category: "watches", price: "4,999", mainImg: watch_3, hoverImg: W_hover_3 },
];