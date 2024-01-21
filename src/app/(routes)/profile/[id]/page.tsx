"use client";

import {
  addComment,
  followUser,
  getOtherProfiles,
  unfollowUser,
} from "@/components/api/userApi";
import { useEffect, useState } from "react";
import PostCards from "../../_components/post-cards";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bookmark, HeartIcon, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import Comments from "../../_components/comments";

export default function Page({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [following, setFollowing] = useState<boolean>(false);
  const [post, setPost] = useState<any>({});
  const [comment, setComment] = useState<any>();

  const handleFollowUser = async (id: string) => {
    await followUser(id);
  };

  const handleUnFollowUser = async (id: string) => {
    await unfollowUser(id);
  };

  const handleOpenPost = (data: any) => {
    setPost(data);
  };

  const handleProfileFetch = async () => {
    const response = await getOtherProfiles(params.id);
    setProfile(response?.data.user);
    setPosts(response?.data.posts);
    setFollowing(response?.data.is_following);
  };

  const formatDate = (inputDate: string): string => {
    // console.log(inputDate);
    // const date = new Date(inputDate);
    // const options: any = {
    //   day: "numeric",
    //   month: "long",
    //   year: "numeric",
    // };
    // const formatter = new Intl.DateTimeFormat("en-US", options);
    // return formatter.format(date);
    return inputDate;
  };

  const handleComment = (e: any) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    const response = await addComment({
      post: post._id,
      parent_comment: null,
      comment: comment,
    });
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <div className="flex gap-12 items-center">
        <div className="relative">
          <Image
            src={profile.profile_img}
            height={100}
            width={100}
            alt="Profile Image"
            className="cursor-pointer aspect-square object-cover rounded-full h-44 w-44"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-4 items-center">
            <p className="font-medium">{profile.username}</p>

            {following ? (
              <Button
                variant={"secondary"}
                onClick={() => handleUnFollowUser(profile._id)}
              >
                Following
              </Button>
            ) : (
              <Button
                variant={"secondary"}
                onClick={() => handleFollowUser(profile._id)}
              >
                Follow
              </Button>
            )}
            <Button variant={"secondary"}>Message</Button>
          </div>

          <div className="flex gap-4">
            <div className="flex gap-1">
              <p className="font-semibold">{profile.posts_count}</p>
              <p className="text-muted-foreground">posts</p>
            </div>

            <div className="flex gap-1">
              <p className="font-semibold">{profile.followers_count}</p>
              <p className="text-muted-foreground">followers</p>
            </div>

            <div className="flex gap-1">
              <p className="font-semibold">{profile.following_count}</p>
              <p className="text-muted-foreground">following</p>
            </div>
          </div>

          <p className="font-light">{profile.name}</p>
        </div>
      </div>
      <Separator className="my-12" />

      <Dialog>
        <DialogTrigger asChild>
          <div className="grid grid-cols-3 gap-0.5">
            {posts.map((val, key) => (
              <div key={key} onClick={() => handleOpenPost(val)}>
                <PostCards
                  user={val.user}
                  img={val.img}
                  likes={val.likes_count}
                  comment={val.comments_count}
                />
              </div>
            ))}
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-[1000px]">
          <div className="flex flex-col md:flex-row gap-4">
            <Image
              src={post.img}
              width={300}
              height={300}
              alt="Individual Post"
              className="w-full h-full"
            />
            <div className="w-full flex flex-col justify-between">
              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <Image
                    src={profile.profile_img}
                    alt="Profile Image"
                    height={100}
                    width={100}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <p className="font-bold">{profile.username}</p>
                </div>
                <p>...</p>
              </div>
              <Separator className="my-3" />
              <div className="flex flex-col h-full">
                <div className="flex gap-4 items-center">
                  <Image
                    src={profile.profile_img}
                    alt="Profile Image"
                    height={100}
                    width={100}
                    className="rounded-full w-8 h-8 object-cover"
                  />
                  <div className="flex gap-2">
                    <p className="font-semibold text-sm">{profile.username}</p>
                    <p className="font-thin text-sm">{post.caption}</p>
                  </div>
                </div>

                <Comments post_id={post._id} />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center w-full">
                  <div className="flex gap-4">
                    <HeartIcon className="cursor-pointer" />
                    <MessageCircle className="cursor-pointer" />
                    <Send className="cursor-pointer" />
                  </div>
                  <Bookmark className="cursor-pointer" />
                </div>

                <div>
                  <p className="font-semibold text-xs">
                    {post.likes_count} likes
                  </p>
                  <p className="font-thin text-xs">
                    {formatDate(post.created_at)}
                  </p>
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
    </div>
  );
}
