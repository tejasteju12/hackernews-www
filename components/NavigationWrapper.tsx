"use client";

import NavigationBar from "@/components/NavigationBar";
import { useRouter } from "next/navigation";

const NavigationWrapper = () => {
  const router = useRouter();

  const handleSearch = (query: string) => {
    // Replace with actual logic to navigate or search
    console.log("Search query:", query);
    // router.push(`/search?q=${query}`); // Optional for routing
  };

  return <NavigationBar onSearch={handleSearch} />;
};

export default NavigationWrapper;
