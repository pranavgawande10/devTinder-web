import { EditProfile } from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="min-h-screen pt-24 px-4 bg-[#0b0b0f] flex justify-center">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
