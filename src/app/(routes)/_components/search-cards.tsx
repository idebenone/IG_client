"use client";

import Image from "next/image";

interface SearchCardProps {
  profile_img: string;
  username: string;
  name: string;
}

export default function SearchCard(data: SearchCardProps) {
  return (
    <div className="flex p-2 gap-4 w-full items-center">
      <Image
        src={data.profile_img}
        alt="Profile image"
        height="100"
        width="100"
        className="rounded-full w-14 h-14 object-cover aspect-square"
      />
      <div>
        <p className="font-semibold">{data.username}</p>
        <p className="text-muted-foreground">{data.name}</p>
      </div>
    </div>
  );
}
