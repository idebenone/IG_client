import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

interface PostCardProps {
  img: string;
  user: string;
  likes: number;
  comment: number;
}

export default function PostCards(props: PostCardProps) {
  return (
    <div className="group border relative z-[1]">
      <Image
        src={props.img}
        alt={props.user}
        width={300}
        height={300}
        className="cursor-pointer transition duration-300 ease-in-out filter brightness-100 group-hover:brightness-75 aspect-square object-cover"
      />
      <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out cursor-pointer">
        <div className="flex gap-4">
          <span className="gap-1 items-center flex">
            <Heart className="h-5 w-5" />
            <p>{props.likes}</p>
          </span>
          <span className="gap-1 items-center flex">
            <MessageCircle className="mb-0.5 h-5 w-5" />
            <p>{props.comment}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
