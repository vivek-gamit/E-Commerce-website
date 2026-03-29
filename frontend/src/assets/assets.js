// --- 1. Category Images ---
import Casual_Wears from '../assets/images/category/img-1.jpg'
import Suits from '../assets/images/category/img-2.jpg'
import Party_Wears_women from '../assets/images/category/img-3.jpg'
import Party_Wears_men from '../assets/images/category/img-4.jpg'
import Sports_Wears from '../assets/images/category/img-5.png'

export const banner_1 = '../assets/images/banner_1.png'

export const categories = [
    { id: 1, name: 'Casual Wears', image: Casual_Wears },
    { id: 2, name: 'Suits', image: Suits },
    { id: 3, name: 'Party Wears', image: Party_Wears_women },
    { id: 4, name: 'Party Wears', image: Party_Wears_men },
    { id: 5, name: 'Sports Wears', image: Sports_Wears }
];

export const allProducts = [
    // Group 1: Bags
    { _id: "69c676485ceb57686b67dd36", name: "Taupe Bag Classic", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/hover_img_1_LBFkeonY8l.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Taupe_Bag_1__0hYX79-8.png", categories: "New Arrival" },
    { _id: "69c9626c7a3717ee0b1e1145", name: "Taupe Bag Modern", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/hover_img_2_B3wpErAGa.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Taupe_Bag_2_FbB41tR4m.png", categories: "New Arrival" },
    { _id: "69c677235ceb57686b67dd38", name: "Taupe Bag Sleek", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/hover_img_3_kRd80ChqU.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Taupe_Bag_3_5w7vJMOz9.png", categories: "New Arrival" },
    
    // Group 4: Hats & More
    { _id: "69c66d0f0dda8843c06d5783", name: "Featured Hat", category: "Hat", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Hat_1_74F5BzhoY.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Hat_2_Cn2RM98Cj.png", categories: "Featured" },
    { _id: "69c672ac5ceb57686b67dd24", name: "Classic Hat", category: "Hat", price: "2,499", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Hat_3_MxwYz9LOb.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Hat_4_WGFoAGoY1.png", categories: "Popular" },

     // Group 2: Glasses
    { _id: "69c66e5b0dda8843c06d5787", name: "Vista Glasses", category: "glasses", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/glasses_2_Cr4rc1tdI.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/glasses_1_UTbtpeydr.png", categories: "Featured" },

    // Group 3: Watches
    { _id: "69c673865ceb57686b67dd2a", name: "Luxury Watch", category: "watches", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/watch_3_CL62tHhv9.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/watch_4_1yG0Hk0Je.png", categories: "Popular" },
    { _id: "69c670315ceb57686b67dd1c", name: "Sport Watch", category: "watches", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/watch_1_HPf_aOBWj.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/watch_2_14PocPTj8.png" , categories: "Featured" },
    
    // Group 5: Trendy items from your second list
    { _id: "69c668f60dda8843c06d5763", name: "Trendy Bag", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/bag_1_28F4oNC4h_.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/bag_2_ZbRLQNfiEF.png", categories: "Trendy" },
    { _id: "69c66a920dda8843c06d5767", name: "Trendy Glasses", category: "glasses", price: "500", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/glasses_1_ubk5U9J51.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/glasses_2_kSz0inHYl.png", categories: "Trendy" },
    { _id: "69c66ba30dda8843c06d5779", name: "Trendy Watch", category: "watches", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/watch_1_rJ6nTP6-0.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/watch_2_ytvWbJNMj_.png", categories: "Trendy" }
];

export const small_cards = [
    { _id: "69c676485ceb57686b67dd36", name: "Taupe Bag", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/hover_img_1_LBFkeonY8l.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Taupe_Bag_1__0hYX79-8.png" },
    { _id: "69c676485ceb57686b67dd36", name: "Taupe Bag", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/hover_img_2_Vd5oQ77KM.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Taupe_Bag_2_U0G5MsR8h.png" },
    { _id: "69c677235ceb57686b67dd38", name: "Taupe Bag", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/hover_img_3_kRd80ChqU.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/Taupe_Bag_3_5w7vJMOz9.png" },
    { _id: "69c668f60dda8843c06d5763", name: "Taupe Bag", category: "bags", price: "4,999", mainImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/bag_1_28F4oNC4h_.png", hoverImg: "https://ik.imagekit.io/opdlhflsvu/fashion-store/product/bag_2_ZbRLQNfiEF.png" },
];