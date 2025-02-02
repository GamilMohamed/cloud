export interface Cloud {
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