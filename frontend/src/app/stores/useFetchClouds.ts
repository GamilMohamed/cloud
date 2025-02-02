// import { useQuery } from '@tanstack/react-query';

// const fetchClouds = async () => {
// 	const response = await fetch('http://localhost:3000/api/clouds');
// 	return response.json();
// };

// export const useFetchClouds = () => {
// 	return useQuery({
// 		queryKey: ['clouds'], // Unique key for the query
// 		queryFn: fetchClouds, // Function to fetch data
// 		staleTime: 100000, // Cache for 100 seconds
// 	});
// };