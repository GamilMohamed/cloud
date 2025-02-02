// stores/useCloudStore.ts
import { create } from 'zustand'

interface Cloud {
	id: number;
	image: string;
	filter: string;
	aspect: "square" | "landscape" | "portrait";
	user: {
		id: number;
		name: string;
	};
	createdAt: string;
}

interface CloudStore {
	clouds: Cloud[];
	isLoading: boolean;
	error: string | null;
	fetchClouds: () => Promise<void>;
	shuffleClouds: () => void;
}

export const useCloudStore = create<CloudStore>((set) => ({
	clouds: [],
	isLoading: false,
	error: null,

	fetchClouds: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await fetch("http://localhost:3000/api/clouds");
			const data = await response.json();
			set({ clouds: data, isLoading: false });
		} catch (error) {
			set({ error: "Failed to fetch clouds", isLoading: false });
		}
	},

	shuffleClouds: () => {
		set((state) => ({
			clouds: [...state.clouds].sort(() => Math.random() - 0.5)
		}));
	}
}));