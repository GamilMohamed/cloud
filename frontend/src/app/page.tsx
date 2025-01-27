"use client"
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { useEffect, useState } from "react";

const names = ["moha", "adnan"];

export default function Home() {
  const [name, setName] = useState(names[0]);
  const [text, setText] = useState("Marche pas!");
  
  function nextName() {
    const currentIndex = names.indexOf(name);
    setName(names[(currentIndex + 1) % names.length]);
  }


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/users/` + name);
        const data = await res.json();
        console.log(data.message);
        setText(data.message);

      }
      catch (error) {
        console.error("Error fetching data", error);
        setText("Error fetching data");
      }
    }
    fetchData();
  }, [name]);

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <Button variant={"secondary"}
      onClick={nextName}>Click me</Button>
    {text}
    </div>
  );
}
