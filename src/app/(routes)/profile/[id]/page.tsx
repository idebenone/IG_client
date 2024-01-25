"use client";

import {
  followUser,
  getOtherProfiles,
  unfollowUser,
} from "@/components/api/userApi";
import { useEffect, useState } from "react";
import PostCards from "../../_components/cards/post-cards";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PostDialog from "../../_components/dialogs/post-dialog";
import FollowDialog from "../../_components/dialogs/follow-dialog";

export default function Page({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [following, setFollowing] = useState<boolean>(false);
  const [post, setPost] = useState<any>({});
  const [postDialogState, setPostDialogState] = useState<boolean>(false);
  const [followDialogState, setFollowDialogState] = useState<boolean>(false);
  const [followType, setFollowType] = useState<string>("");

  const handleFollowUser = async (id: string) => {
    await followUser(id);
  };

  const handleUnFollowUser = async (id: string) => {
    await unfollowUser(id);
  };

  const handleProfileFetch = async () => {
    const response = await getOtherProfiles(params.id);
    setProfile(response?.data.user);
    setPosts(response?.data.posts);
    setFollowing(response?.data.is_following);
  };

  const handleOpenPost = (data: any) => {
    setPost(data);
    setPostDialogState(true);
  };

  const handleClosePost = () => {
    setPostDialogState(false);
  };

  const handleOpenFollow = (type: string) => {
    setFollowType(type);
    setFollowDialogState(true);
  };

  const handleCloseFollow = () => {
    setFollowDialogState(false);
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

            <div
              className="flex gap-1 cursor-pointer hover:text-muted-foreground"
              onClick={() => handleOpenFollow("Followers")}
            >
              <p className="font-semibold">{profile.followers_count}</p>
              <p>followers</p>
            </div>

            <div
              className="flex gap-1 cursor-pointer hover:text-muted-foreground"
              onClick={() => handleOpenFollow("Following")}
            >
              <p className="font-semibold">{profile.following_count}</p>
              <p>following</p>
            </div>
          </div>

          <p className="font-light">{profile.name}</p>
        </div>
      </div>
      <Separator className="my-12" />

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

      <PostDialog
        post={post}
        profile_img={profile.profile_img}
        username={profile.username}
        isOpen={postDialogState}
        onClose={handleClosePost}
      />

      <FollowDialog
        user_id={profile._id}
        type={followType}
        isOpen={followDialogState}
        onClose={handleCloseFollow}
      />
    </div>
  );
}
