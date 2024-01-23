import { getComments } from "@/components/api/userApi";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CommentProps {
  post_id: string;
}

const Comments = (props: CommentProps) => {
  const [comments, setComments] = useState<any[]>([]);

  const getComment = async () => {
    const response = await getComments(props.post_id);
    if (response?.status == 200) {
      setComments(response?.data);
    } else {
      setComments([]);
    }
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div className="w-full h-full mt-4 flex flex-col gap-4">
      {comments.length > 0 ? (
        comments.map((val, key) => (
          <div key={key} className="flex gap-4">
            <Image
              width={100}
              height={100}
              src={val.user.profile_img}
              alt="User pfp"
              className="rounded-full w-8 h-8 object-cover"
            />
            <div className="flex gap-2">
              <p className="font-semibold text-sm">{val.user.username}</p>
              <p className="text-sm font-light">{val.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No Comments</p>
      )}
    </div>
  );
};

export default Comments;
