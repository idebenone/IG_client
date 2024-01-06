"use client";

import { fetchExplorePosts } from "@/components/api/postsApi";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Explore() {
  const [explrePosts, setExplorePosts] = useState<any[]>([]);

  const handleExplorePosts = async () => {
    const response = await fetchExplorePosts();
    const posts = Array.isArray(response) ? response : [response];
    setExplorePosts((prev) => [...prev, ...posts]);
    console.log(posts);
  };

  useEffect(() => {
    handleExplorePosts();
  }, []);

  return (
    <div className="flex w-full h-full justify-center">
      <div className="grid grid-cols-3 gap-0.5 relative">
        {explrePosts.map((val, key) => (
          <div className="group border relative z-[1]" key={key}>
            <Image
              src={val.img}
              alt={val.user}
              width={300}
              height={400}
              className="cursor-pointer transition duration-300 ease-in-out filter brightness-100 group-hover:brightness-75"
            />
            <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer">
              <div className="flex gap-4">
                <span className="gap-1 items-center flex">
                  <Heart className="h-5 w-5" />
                  <p>{val.likes}</p>
                </span>
                <span className="gap-1 items-center flex">
                  <MessageCircle className="mb-0.5 h-5 w-5" />
                  <p>{val.comment}</p>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
