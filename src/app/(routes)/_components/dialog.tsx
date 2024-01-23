import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Comments from "./comments";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import { Bookmark, HeartIcon, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { addComment, likePost, unlikePost } from "@/components/api/userApi";

interface PostDialogProps {
  post: any;
  profile_img: string;
  username: string;
  isOpen: boolean;
  onClose: () => void;
}

const PostDialog = (props: PostDialogProps) => {
  const [comment, setComment] = useState<any>();

  const handleComment = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    const response = await addComment({
      post: props.post._id,
      parent_comment: null,
      comment: comment,
    });
  };

  const handleLike = async () => {
    await likePost({ post: props.post._id, post_owner: props.post.user });
  };

  const handleUnlike = async () => {
    await unlikePost({ post: props.post._id, post_owner: props.post.user });
  };

  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.onClose}>
        <DialogContent className="max-w-[1000px]">
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={props.post.img}
              width={300}
              height={400}
              alt="Individual Post"
              className="w-full h-full object-cover"
            />
            <div className="w-full flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src={props.profile_img}
                    alt="Profile Image"
                    height={100}
                    width={100}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <p className="font-bold">{props.username}</p>
                </div>
                <p>...</p>
              </div>
              <Separator className="my-3" />
              <div className="flex flex-col h-full">
                <div className="flex gap-4 items-center">
                  <Image
                    src={props.profile_img}
                    alt="Profile Image"
                    height={100}
                    width={100}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <div className="flex gap-2">
                    <p className="font-semibold text-sm">{props.username}</p>
                    <p className="font-thin text-sm">{props.post.caption}</p>
                  </div>
                </div>
                <Comments post_id={props.post._id} />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-4">
                    {props.post.isLiked ? (
                      <HeartFilledIcon
                        className="cursor-pointer w-6 h-6 text-red-700"
                        onClick={handleUnlike}
                      />
                    ) : (
                      <HeartIcon
                        className="cursor-pointer"
                        onClick={handleLike}
                      />
                    )}

                    <MessageCircle className="cursor-pointer" />
                    <Send className="cursor-pointer" />
                  </div>
                  <Bookmark className="cursor-pointer" />
                </div>

                <div>
                  <p className="font-semibold text-xs">
                    {props.post.likes_count} likes
                  </p>
                  <p className="font-thin text-xs">{props.post.created_at}</p>
                </div>

                <Separator />

                <div className="flex w-full gap-2">
                  <Input
                    placeholder="Write a comment"
                    className="w-full border-none focus:outline-none"
                    onChange={handleComment}
                  />
                  <Button variant={"ghost"} onClick={handleSubmitComment}>
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDialog;
