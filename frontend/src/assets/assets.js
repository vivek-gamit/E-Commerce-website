// 1. Import all images
import Casual_Wears from '../assets/images/category/img-1.jpg'
import Suits from '../assets/images/category/img-2.jpg'
import Party_Wears_women from '../assets/images/category/img-3.jpg'
import Party_Wears_men from '../assets/images/category/img-4.jpg'
import Sports_Wears from '../assets/images/category/img-5.png'
import bag_1 from '../assets/images/component_2/bag_1.png'
import bag_2 from '../assets/images/component_2/bag_2.png'
import glasses_1 from '../assets/images/component_2/glasses_1.png'
import glasses_2 from '../assets/images/component_2/glasses_2.png'
import watch_1 from '../assets/images/component_2/watch_1.png'
import watch_2 from '../assets/images/component_2/watch_2.png'
import watch_3 from '../assets/images/product/watch/watch_3.png'
import hat_1 from '../assets/images/hat/hat_1.png'
import hat_2 from '../assets/images/hat/hat_2.png'
import hat_3 from '../assets/images/hat/hat_3.png'

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
    { id: 1, name: "Hat",category: "Hat", mainImg: hat_1,},
    { id: 2, name: "Hat",category: "Hat", mainImg: hat_1,},
    { id: 3, name: "Hat",category: "Hat", mainImg: hat_2,},
    { id: 4, name: "Hat",category: "Hat", mainImg: hat_3,},
    { id: 5, name: "Watch",category: "watches", mainImg: watch_1,},
    { id: 6, name: "Watch",category: "watches", mainImg: watch_2,},
    { id: 7, name: "Watch",category: "watches", mainImg: watch_3,},
    
];

