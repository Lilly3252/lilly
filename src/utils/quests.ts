export interface Quest {
	questName: string;
	description: string;
	reward: string;
	expiryDate?: Date;
	progress?: number;
	completed: boolean;
}

export const quests: Quest[] = [
	{
		questName: "Feed your pet",
		description: "Feed your pet to keep it happy and healthy.",
		reward: "50 XP",
		expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
		progress: 0,
		completed: false
	},
	{
		questName: "Train your pet",
		description: "Spend time training your pet to improve its skills.",
		reward: "200 XP",
		expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
		progress: 0,
		completed: false
	},
	{
		questName: "Participate in a pet show",
		description: "Enter your pet in a local pet show and try to win a prize.",
		reward: "500 XP and a special item",
		expiryDate: new Date("2024-12-25"), // Specific event date
		progress: 0,
		completed: false
	}
];
