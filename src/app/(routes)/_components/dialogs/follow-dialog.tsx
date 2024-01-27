import {
  getFollowers,
  getFollowersSearch,
  getFollowing,
  getFollowingSearch,
} from "@/components/api/userApi";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FollowProps {
  user_id: string;
  type: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function FollowDialog(props: FollowProps) {
  const [list, setList] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let response;
    if (props.type == "Followers") {
      response = await getFollowersSearch(e.target.value, props.user_id);
    } else {
      response = await getFollowingSearch(e.target.value.trim(), props.user_id);
    }
    response?.status != 200 ? setList([]) : setList(response?.data);
  };

  const handleList = async () => {
    let response;
    if (props.type == "Followers") {
      response = await getFollowers(props.user_id);
    } else {
      response = await getFollowing(props.user_id);
    }
    response?.status != 200 ? setList([]) : setList(response?.data);
  };

  useEffect(() => {
    if (props.isOpen) {
      handleList();
    }
  }, [props.isOpen]);

  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.onClose}>
        <DialogContent className="max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{props.type}</DialogTitle>
          </DialogHeader>
          <Input placeholder="Search" onChange={handleSearch} />

          <div className="flex flex-col gap-3">
            {list.length > 0 ? (
              list.map((val, key) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        props.type == "Followers"
                          ? val.user.profile_img
                          : val.follower.profile_img
                      }
                      alt="Profile pic"
                      height={100}
                      width={100}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p>
                        {props.type == "Followers"
                          ? val.user.username
                          : val.follower.username}
                      </p>
                      <p className="text-muted-foreground font-light text-sm">
                        {props.type == "Followers"
                          ? val.user.name
                          : val.follower.name}
                      </p>
                    </div>
                  </div>

                  {props.type === "Followers" ? (
                    <Button>Follow</Button>
                  ) : (
                    <Button variant={"destructive"}>Remove</Button>
                  )}
                </div>
              ))
            ) : (
              <p>No {props.type} found</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
