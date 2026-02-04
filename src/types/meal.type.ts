export interface IMeal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  categoryId: string;
  categoryName: string;
  isAvailable: boolean;
  providerId: string;
  userId: string;
  createdAt: string;
  views: number;
  provider: {
    id: string;
    userId: string;
    shopName: string;
    description: string;
    address: string;
    isOpen: boolean;
  };
}

export interface ICartItem {
  mealId: string;
  providerId: string;
  price: number;
  name: string;
  quantity: number;
  userId: string;
}
