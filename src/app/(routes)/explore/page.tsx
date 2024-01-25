"use client";

import { fetchExplorePosts } from "@/components/api/postsApi";
import { useEffect, useState } from "react";
import PostCards from "../_components/cards/post-cards";

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
          <div key={key}>
            <PostCards
              img={val.img}
              user={val.user}
              likes={val.likes}
              comment={val.comment}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
