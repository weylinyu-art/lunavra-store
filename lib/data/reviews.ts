export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export const productReviews: ProductReview[] = [
  { id: "r1", productId: "1", author: "Sarah M.", rating: 5, text: "The Ivory Lace set is stunning. Perfect fit and the lace is so soft. Arrived in discreet packaging as promised.", date: "2024-01-15" },
  { id: "r2", productId: "1", author: "Layla H.", rating: 5, text: "Best lingerie purchase I've made. Quality is premium and the cash on delivery made it so easy.", date: "2024-01-18" },
  { id: "r3", productId: "2", author: "Ahmed K.", rating: 5, text: "Bought the Champagne Silk Set for my wife. She loved it! Elegant and luxurious feel.", date: "2024-01-20" },
  { id: "r4", productId: "4", author: "Nora S.", rating: 5, text: "Rose Blush Underwire is my new everyday bra. Comfortable, invisible under clothes. Highly recommend.", date: "2024-01-22" },
  { id: "r5", productId: "7", author: "Emily R.", rating: 5, text: "The Silk Slip Nightgown is dreamy. So lightweight and breathable. Feels like I'm wearing clouds.", date: "2024-01-25" },
  { id: "r6", productId: "10", author: "Maya A.", rating: 5, text: "Bridal collection exceeded expectations. Perfect for my wedding night. Thank you NileChic!", date: "2024-02-01" },
  { id: "r7", productId: "1", author: "Dina F.", rating: 5, text: "Fast delivery, perfect packaging, beautiful product. Will definitely order again.", date: "2024-02-05" },
  { id: "r8", productId: "15", author: "Fatima K.", rating: 5, text: "The Satin Robe is gorgeous. Perfect for layering. Makes getting ready feel so luxurious.", date: "2024-02-08" },
];
