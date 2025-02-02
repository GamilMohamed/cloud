"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import { useCloudStore } from "@/app/stores/useCloudStore";
import { Cloud } from "@/lib/types";
import { CloudImage } from "./CloudImage";
import { UploadPagex } from "./UploadInput";

export function toTitleCase(str: string | undefined): string | undefined {
  return str?.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

export default function AllClouds() {
  const { clouds, error, fetchClouds, shuffleClouds } = useCloudStore();

  useEffect(() => {
    fetchClouds();
  }, [fetchClouds]);

  // Create a combined array of clouds and upload component with random position
  const combinedItems = useMemo(() => {
    if (clouds.length === 0) return [{ type: 'upload' }];

    // Create array of cloud items
    const items = clouds.map((cloud, i) => ({
      type: 'cloud' as const,
      cloud,
      i
    }));

    // Insert upload component at random position
    const uploadPosition = items.length > 0 ? items.length / 2 : 0;
    items.splice(uploadPosition, 0, { type: 'upload' as const });

    return items;
  }, [clouds]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="min-h-screen w-full bg-sky-500 py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <Button
          onClick={shuffleClouds}
          className="w-full mb-8 bg-white/20 hover:bg-white/30 text-white border border-white/50"
        >
          Shuffle clouds
        </Button>
        <div className="flex flex-wrap justify-center gap-6">
        <UploadPagex />
          {combinedItems.map((item, index) => (
            <div 
              key={item.type === 'cloud' ? item.cloud.id : 'upload'}
              className="flex justify-center items-center"
            >
              {item.type === 'cloud' ? (
                <CloudImage cloud={item.cloud} i={index} />
              ) : (
                <UploadPagex />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}