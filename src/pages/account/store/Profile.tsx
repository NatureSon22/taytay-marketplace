import StoreProfile from "@/components/StoreProfile";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();

  const clickEditStore = () => {
    navigate("/account/store/edit");
  };

  return (
    <div className="grid gap-4">
      <Button
        className="border ml-auto"
        variant={"ghost"}
        onClick={clickEditStore}
      >
        <PencilIcon />
        Edit Store Information
      </Button>
      <StoreProfile showExtraProps={false} />
    </div>
  );
};

export default Profile;
