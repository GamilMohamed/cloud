"use client";
import Image from "next/image";
import { use, useEffect, useState } from "react";


function CloudImage({ cloud }) {
  const [filter, setFilter] = useState(false);

  return (
    <div className="relative w-[300px] ">
      {/* Base Cloud Image */}
      <Image
        onClick={() => setFilter(!filter)}
        width="300"
        height="300"
        src={cloud.image}
        alt="cloud"
        className="cloud-image"
      />

      {/* Filter Overlay */}
      {filter && (
        <Image
          onClick={() => setFilter(false)}
          width="300"
          height="300"
          src={cloud.filter}
          alt="cloud-filter"
          className="absolute top-0 left-0 w-full h-full cloud-filter"
        />
      )}
    </div>
  );
}
export default function AllClouds() {
  const [clouds, setClouds] = useState([]);
  useEffect(() => {
    async function fetchClouds() {
      const response = await fetch("http://localhost:3000/api/clouds");
      const data = await response.json();
      setClouds(data);
    }
    fetchClouds();
  }, []);
  console.log(clouds);

  return (
	<>
      {/* <h1 className="text-9xl text-sky-700">All Clouds</h1> */}
    <main className="h-screen w-screen bg-sky-400 flex justify-center items-center flexx-wrap">
      {clouds.map((cloud) => (
		  <div key={cloud.id} className="cloud-card">
          <CloudImage cloud={cloud} />
          <p className="cloud-name">{cloud.userId}</p>
        </div>
      ))}
    </main>
	</>
  );
}
