import { EditProfile } from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="w-full flex justify-center pt-20 pb-10 px-4 animate-fade-in relative z-10">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
