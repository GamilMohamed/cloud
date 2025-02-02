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
	orderClouds: () => void;
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
	},

	orderClouds: () => {
		set((state) => {
			alert("Ordering clouds");
			const lenOfLandscapes = state.clouds.filter((cloud) => cloud.aspect === "landscape").length;
			const lenOfSquares = state.clouds.filter((cloud) => cloud.aspect === "square").length;
			const diff = lenOfLandscapes - lenOfSquares;
			// Add your ordering logic here
			// order 1 landscape then 1 square and if there are more landscapes than squares, add a fake cloud
			return {
				clouds: state.clouds.sort((a, b) => {
					if (a.aspect === "landscape" && b.aspect === "square") {
						return -1;
					}
					if (a.aspect === "square" && b.aspect === "landscape") {
						return 1;
					}
					return 0;
				})
			}
		});
	},

}));