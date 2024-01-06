import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Profile() {
  return (
    <div className="flex justify-center">
      <div className="w-2/5">
        <div className="flex justify-between">
          <p className="bg-white rounded-full h-40 w-40"></p>

          <div className="flex flex-col gap-3">
            <div className="flex gap-4 items-center">
              <p className="font-medium">user_name</p>

              <Button variant={"secondary"}>Edit Profile</Button>
              <Button variant={"secondary"}>View Archive</Button>
            </div>

            <div className="flex gap-4">
              <div className="flex gap-1">
                <p className="font-semibold">4</p>
                <p className="text-muted-foreground">posts</p>
              </div>

              <div className="flex gap-1">
                <p className="font-semibold">283</p>
                <p className="text-muted-foreground">followers</p>
              </div>

              <div className="flex gap-1">
                <p className="font-semibold">252</p>
                <p className="text-muted-foreground">following</p>
              </div>
            </div>

            <p className="font-light">Vineeth G</p>
          </div>
        </div>

        <Separator className="my-12" />
      </div>
    </div>
  );
}
