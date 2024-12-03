import { LogOut, User2 } from "lucide-react/dist/cjs/lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ProfileDropDown = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild aria-label="User menu">
          <Button className="size-8 bg-white shadow-none border border-primary text-black rounded-full ">
            <User2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel asChild>
            <h2 className="">User</h2>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <User2 />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropDown;
