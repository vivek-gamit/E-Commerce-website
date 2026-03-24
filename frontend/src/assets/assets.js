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
import watch_1 from '../assets/images/component_2/watch_1.png'
import watch_2 from '../assets/images/component_2/watch_2.png'
import W_watch_2 from '../assets/images/product/watch/W_watch_2.png'

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

import Hat_1 from '../assets/images/component_3/Hat_1.png'
import Hat_2 from '../assets/images/component_3/Hat_2.png'
import Hat_3 from '../assets/images/component_3/Hat_3.png'
import Hat_4 from '../assets/images/component_3/Hat_4.png'

import watch_4 from '../assets/images/component_3/watch_4.png'

import glasses_comp2_1 from '../assets/images/component_2/glasses_1.png'
import glasses_comp2_2 from '../assets/images/component_2/glasses_2.png'
import watch_comp2_1 from '../assets/images/component_2/watch_1.png'
import watch_comp2_2 from '../assets/images/component_2/watch_2.png'

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

// assets.jsx
export const allProducts = [
    // Group 1: Bags
    { id: 1, name: "Taupe Bag Classic", category: "bags", price: "4,999", mainImg: Taupe_Bag_1, hoverImg: hover_img_1, categories: "New Arrival" },
    { id: 2, name: "Taupe Bag Modern", category: "bags", price: "4,999", mainImg: Taupe_Bag_2, hoverImg: hover_img_2, categories: "New Arrival" },
    { id: 3, name: "Taupe Bag Sleek", category: "bags", price: "4,999", mainImg: Taupe_Bag_3, hoverImg: hover_img_3, categories: "New Arrival" },
    // { id: 4, name: "Taupe Bag Urban", category: "bags", price: "4,999", mainImg: Taupe_Bag_4, hoverImg: hover_img_4, categories: "Trendy" },
    
    // Group 4: Hats & More
    { id: 4, name: "Featured Hat", category: "Hat", price: "4,999", mainImg: Hat_1, hoverImg: Hat_2, categories: "Featured" },
    { id: 5, name: "Classic Hat", category: "Hat", price: "2,499", mainImg: Hat_3, hoverImg: Hat_4, categories: "Popular" },

        // Group 2: Glasses
    // { id: 6, name: "Sunset Glasses", category: "glasses", price: "4,999", mainImg: glasses_1, hoverImg: G_hover_1, categories: "New Arrival" },
    { id: 6, name: "Vista Glasses", category: "glasses", price: "4,999", mainImg: glasses_3, hoverImg: G_hover_3, categories: "Featured" },

        // Group 3: Watches
    // { id: 7, name: "Elite Watch", category: "watches", price: "4,999", mainImg: watch_1, hoverImg: W_hover_1, categories: "New Arrival" },
    { id: 7, name: "Luxury Watch", category: "watches", price: "4,999", mainImg: W_watch_2, hoverImg: W_hover_2, categories: "Popular" },
    { id: 8, name: "Sport Watch", category: "watches", price: "4,999", mainImg: W_hover_3, hoverImg: watch_3 , categories: "Featured" },
    
    // Group 5: Trendy items from your second list
    { _id: "69c0f01e4b283c1d4f0520d6", name: "Trendy Bag", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/091dc66654ec5527d465af1f2022d933bc2ee134_Xzc2DzkXi.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/glasses_2_PedTZStNX.png", categories: "Trendy" },
    { id: 10, name: "Trendy Glasses", category: "glasses", price: "4,999", mainImg: glasses_comp2_1, hoverImg: glasses_comp2_2, categories: "Trendy" },
    { id: 11, name: "Trendy Watch", category: "watches", price: "4,999", mainImg: watch_comp2_1, hoverImg: watch_comp2_2, categories: "Trendy" }
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
    { id: 10, name: "Taupe Bag",category: "Hat" , price: "4,999",mainImg: Hat_1, hoverImg: Hat_2, categories: "Featured"},
    { id: 11, name: "Classic Hat",category: "Hat" , price: "2,499",mainImg: Hat_3, hoverImg: Hat_4, categories: "Popular"},
    { id: 12, name: "Luxury Watch", price: "6,999", mainImg: W_watch_2, hoverImg: watch_4, categories: "Popular", category: "watches" },
];