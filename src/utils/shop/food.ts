export interface FoodItem {
	itemName: string;
	price: number;
	hungerBenefit: number;
	healthBenefit: number;
}
export const foodItems: FoodItem[] = [
	{ itemName: "⭐ Premium Food", price: 15, hungerBenefit: 15, healthBenefit: 15 },
	{ itemName: "🫘 Dry Kibble", price: 10, hungerBenefit: 10, healthBenefit: 10 },
	{ itemName: "🥃 Wet Food", price: 12, hungerBenefit: 12, healthBenefit: 12 },
	{ itemName: "🍦 Treats", price: 8, hungerBenefit: 8, healthBenefit: 8 },
	{ itemName: "🥩 Raw Meat", price: 20, hungerBenefit: 20, healthBenefit: 20 },
	{ itemName: "🐟 Fish", price: 18, hungerBenefit: 18, healthBenefit: 18 },
	{ itemName: "🐔 Chicken", price: 16, hungerBenefit: 16, healthBenefit: 16 },
	{ itemName: "🍖 Beef", price: 22, hungerBenefit: 22, healthBenefit: 22 },
	{ itemName: "🐑 Lamb", price: 24, hungerBenefit: 24, healthBenefit: 24 },
	{ itemName: "🍗 Turkey", price: 19, hungerBenefit: 19, healthBenefit: 19 },
	{ itemName: "🦆 Duck", price: 21, hungerBenefit: 21, healthBenefit: 21 },
	{ itemName: "🐇 Rabbit", price: 23, hungerBenefit: 23, healthBenefit: 23 },
	{ itemName: "🌾 Grain-Free Food", price: 17, hungerBenefit: 17, healthBenefit: 17 },
	{ itemName: "🌾 Organic Food", price: 25, hungerBenefit: 25, healthBenefit: 25 }
];
