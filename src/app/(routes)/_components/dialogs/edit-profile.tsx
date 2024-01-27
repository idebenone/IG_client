import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EditProfileProps {
  // data:any
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfile(props: EditProfileProps) {
  return (
    <>
      <Dialog open={props.isOpen} onOpenChange={props.onClose}>
        <DialogContent className="max-w-[800px] max-h-[800px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div>
              <Label>Username</Label>
              <Input placeholder="Username" />
            </div>

            <div>
              <Label>Name</Label>
              <Input placeholder="Name" />
            </div>

            <div>
              <Label>Email</Label>
              <Input placeholder="Email" />
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea placeholder="Bio" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
