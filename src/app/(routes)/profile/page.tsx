"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { getProfile, uploadProfileImage } from "@/components/api/userApi";
import PostCards from "../_components/cards/post-cards";
import PostDialog from "../_components/dialogs/post-dialog";
import FollowDialog from "../_components/dialogs/follow-dialog";
import EditProfile from "../_components/dialogs/edit-profile";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [posts, setPosts] = useState<any[]>([]);
  const [post, setPost] = useState<any>({});
  const [postDialogState, setPostDialogState] = useState<boolean>(false);
  const [followDialogState, setFollowDialogState] = useState<boolean>(false);
  const [editProfileState, setEditProfileState] = useState<boolean>(false);
  const [followType, setFollowType] = useState<string>("");

  const handleFileSelect = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProfileImgUpload(file);
    }
  };

  const handleProfileImgUpload = async (image: any) => {
    try {
      const formData = new FormData();
      formData.append("file", image, "profile.jpg");
      const response = await uploadProfileImage(formData as any);
      if (response?.status == 200) handleProfileFetch();
    } catch (error) {
      console.error("Error sharing post:", error);
    }
  };

  const handleProfileFetch = async () => {
    const response = await getProfile();
    setProfile(response?.data.user);
    setPosts(response?.data.posts);
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

  const handleOpenProfile = () => {
    setEditProfileState(true);
  };

  const handleCloseProfile = () => {
    setEditProfileState(false);
  };

  useEffect(() => {
    handleProfileFetch();
  }, []);

  return (
    <>
      <div className="flex flex-col w-full items-center">
        <div className="flex gap-12 items-center">
          <div className="relative">
            <label htmlFor="file">
              <Image
                src={profile.profile_img}
                height={100}
                width={100}
                alt="Profile Image"
                className="cursor-pointer aspect-square object-cover rounded-full h-44 w-44"
              />
            </label>
            <input
              id="file"
              className="hidden"
              type="file"
              onChange={handleFileSelect}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <p className="font-medium">{profile.username}</p>

              <Button variant={"secondary"} onClick={handleOpenProfile}>
                Edit Profile
              </Button>
              <Button variant={"secondary"}>View Archive</Button>
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

        <EditProfile isOpen={editProfileState} onClose={handleCloseProfile} />

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
    </>
  );
}
