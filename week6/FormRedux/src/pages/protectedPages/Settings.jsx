import Loading from "../home/components/Loading";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import useCreateUser from "../../hooks/useCreateUser";
import useFetchUsers from "../../hooks/useFetchUsers";
import useUpdateUser from "../../hooks/useUpdateUser";
import useDeleteUser from "../../hooks/useDeleteUser";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  DialogContentText,
} from "@mui/material";
import CustomTextField from "./components/CustomTextField";
import {
  selectError,
  selectLoading,
  selectUsers,
} from "../../redux/slice/userApiSlice";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const Settings = () => {
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useFetchUsers();

  const {
    addNewUser,
    error: createUserError,
    loading: creatingUser,
  } = useCreateUser();

  const { updateNewUser } = useUpdateUser();

  const { deleteNewUser } = useDeleteUser();

  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newUser, setNewUser] = useState({
    id: null,
    name: "",
    username: "",
    email: "",
    phone: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lng: "",
      },
    },
    website: "",
    company: {
      name: "",
      catchPhrase: "",
      bs: "",
    },
  });

  const resetForm = () => {
    setIsOpen(false);
    setNewUser({
      id: null,
      name: "",
      username: "",
      email: "",
      phone: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: "",
        },
      },
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: "",
      },
    });
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setIsOpen(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setOpen(true);
  };

  const handleAddUser = async () => {
    try {
      await addNewUser(newUser);
      resetForm();
      toast.success("User added successfully");
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUser = async () => {
    const result = await updateNewUser(newUser);
    if (result.success) {
      resetForm();
      toast.success("User updated successfully");
    } else {
      console.error(result.error);
    }
  };

  const handleDeleteUser = async () => {
    if (userToDelete) {
      const result = await deleteNewUser(userToDelete);
      if (result.success) {
        toast.success("User deleted successfully.");
        setOpen(false);
        setUserToDelete(null);
      } else {
        console.error(result.error);
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="flex flex-col mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold border-l-4 border-blue-500 pl-2">
          List User
        </h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PersonAddAlt1Icon />}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add User
        </Button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
          >
            <Box flex={1}>
              <CustomTextField
                autoFocus
                label="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
              <CustomTextField
                label="Username"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
              <CustomTextField
                label="Email"
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
              <CustomTextField
                label="Phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
              <CustomTextField
                label="Street"
                value={newUser.address.street}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, street: e.target.value },
                  })
                }
              />
              <CustomTextField
                label="City"
                value={newUser.address.city}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, city: e.target.value },
                  })
                }
              />
              <CustomTextField
                label="Latitude"
                value={newUser.address.geo.lat}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: {
                      ...newUser.address,
                      geo: { ...newUser.address.geo, lat: e.target.value },
                    },
                  })
                }
              />
            </Box>
            <Box flex={1}>
              <CustomTextField
                label="Longitude"
                value={newUser.address.geo.lng}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: {
                      ...newUser.address,
                      geo: { ...newUser.address.geo, lng: e.target.value },
                    },
                  })
                }
              />
              <CustomTextField
                label="Suite"
                value={newUser.address.suite}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, suite: e.target.value },
                  })
                }
              />
              <CustomTextField
                label="Zipcode"
                value={newUser.address.zipcode}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    address: { ...newUser.address, zipcode: e.target.value },
                  })
                }
              />
              <CustomTextField
                label="Website"
                value={newUser.website}
                onChange={(e) =>
                  setNewUser({ ...newUser, website: e.target.value })
                }
              />
              <CustomTextField
                label="Company Name"
                value={newUser.company.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    company: { ...newUser.company, name: e.target.value },
                  })
                }
              />
              <CustomTextField
                label="Company Catchphrase"
                value={newUser.company.catchPhrase}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    company: {
                      ...newUser.company,
                      catchPhrase: e.target.value,
                    },
                  })
                }
              />
              <CustomTextField
                label="Company BS"
                value={newUser.company.bs}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    company: { ...newUser.company, bs: e.target.value },
                  })
                }
              />
            </Box>
          </Box>
          {createUserError && <p className="text-red-500">{createUserError}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={newUser.id ? handleUpdateUser : handleAddUser}
            color="primary"
            disabled={creatingUser}
          >
            {creatingUser
              ? "Creating..."
              : newUser.id
              ? "Update User"
              : "Create User"}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this user?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone. Please confirm if you would like to
            proceed with the deletion.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDeleteUser} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <div className="py-2 -my-2 overflow-x-auto xs:mx-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="inline-block min-w-full align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Id
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Name
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Username
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Email
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Status
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Address
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Phone
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Website
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Company
                </th>
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" />
                <th className="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.username}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <span className="inline-flex px-2 text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.address.street}, {user.address.city}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.website}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    {user.company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                    <a
                      href="#"
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => handleEditUser(user)}
                    >
                      Edit
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                    <a
                      href="#"
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(user)}
                    >
                      Del
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
