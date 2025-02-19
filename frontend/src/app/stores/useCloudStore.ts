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
	totalClouds: number | null;
	isLoading: boolean;
	error: string | null;
	fetchClouds: () => Promise<void>;
	shuffleClouds: () => void;
	orderClouds: () => void;
}

export const useCloudStore = create<CloudStore>((set) => ({
	clouds: [],
	totalClouds: null,
	isLoading: false,
	error: null,

	fetchClouds: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await fetch("http://localhost:3000/api/clouds", {
				credentials: 'include',
			});
			//totalClouds is in the headers
			const totalClouds = response.headers.get("X-Total-Count");
			set({ totalClouds: totalClouds ? parseInt(totalClouds, 10) : null });
			console.log(response.headers);
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
			console.log(state.clouds.map((cloud) => cloud.aspect));
			const onlySquare = state.clouds.filter((cloud) => cloud.aspect === "square");
			const onlyLandscape = state.clouds.filter((cloud) => cloud.aspect === "landscape");

			const newC = [];
			let diff = onlySquare.length - onlyLandscape.length;

			for (let i = 0; i < Math.max(onlySquare.length, onlyLandscape.length); i++) {
				if (diff > 3 && i < onlySquare.length) {
					newC.push(onlySquare[i]);
					diff--;
				}
				if (onlyLandscape[i])
					newC.push(onlyLandscape[i]);
				if (onlySquare[i])
					newC.push(onlySquare[i]);
			}

			return { clouds: newC };
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