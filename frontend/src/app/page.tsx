"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from 'next/link'
 
interface Cloud {
  id: number;
  answer: string;
  author: string;
  image: string;
}


export default function Home() {
  const [text, setText] = useState("Marche pas!");
  const [clouds, setClouds] = useState<Cloud[]>([]);
  

  useEffect(() => {
    async function fetchClouds() {
      try {
        const res = await fetch(`http://localhost:4500/cloud/`);
        const data = await res.json();

        console.log(data[0].answer);
        setText(data[0].answer);
        setClouds(data);

      }
      catch (error) {
        console.error("Error fetching data", error);
        setText("Error fetching data");
      }
    }
    fetchClouds();
  }, [name]);

  return (
    <div className="w-screen h-screen bg-grexen-200 flex flex-col items-center justify-center">
    <div className="h-full w-[80vw] bg-red-200 flex flex-row items-center justify-center">
      <div className="bg-pink-200 w-1/2 h-full flex justify-center items-center">
        <Button onClick={() => setText("Hello")} variant={"link"} >
          <Link href="uploadcloud" >
          Upload Cloud
          </Link>
          </Button>
      </div>
      <div className="bg-blue-200 w-1/2 h-full flex justify-center items-center">
        <Button onClick={() => setText("Hello")} variant={"link"} >Giess Clouds</Button>
      </div>
      {/* {clouds.map((cloud) => (
        <Card 
        className="w-1/2"
        key={cloud.id}>
          <p>{cloud.answer}</p>
          <Image src={cloud.image} alt="cloud" width={100} height={100} />
          <p>{cloud.author}</p>
        </Card>
      ))}
      <Button>Click me</Button>
    {text} */}
    </div>
    </div>
  );
}
