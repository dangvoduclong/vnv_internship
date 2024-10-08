import SettingsIcon from "@mui/icons-material/Settings";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import { useSelector } from "react-redux";
import NavItem from "./NavItem";
import BackupIcon from "@mui/icons-material/Backup";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";

const Sidebar = () => {
  const userData = useSelector((state) => state.user.userData);

  const adminNavItems = [
    { to: "setting", icon: SettingsIcon, label: "Setting" },
    { to: "get", icon: SportsMartialArtsIcon, label: "Get" },
    { to: "post", icon: PostAddIcon, label: "Add Post" },
    { to: "put", icon: BackupIcon, label: "Backup Put" },
    { to: "patch", icon: DriveFolderUploadIcon, label: "Upload File Patch" },
    { to: "delete", icon: DeleteIcon, label: "Delete" },
  ];
  return (
    <div className="w-64 h-screen bg-white shadow-xl p-4">
      <ul className="space-y-2">
        <NavItem to="/dashboard" icon={FolderIcon} label="Dashboard" />
        <NavItem
          to="/information"
          icon={PermIdentityIcon}
          label="Information"
        />

        <NavItem to="/addphone" icon={AddIcCallIcon} label="Add Form" />

        {userData?.roles?.includes("admin") &&
          adminNavItems.map((item, index) => (
            <NavItem
              key={index}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
