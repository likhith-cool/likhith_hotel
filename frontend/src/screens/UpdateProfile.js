import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { updateUserAction, changePasswordAction, deleteUserAction } from '../redux/actions/userAction';
import Loader from '../components/Loader';
import Meta from '../utils/Meta';

const UpdateProfile = () => {
    const { user, isLoading } = useSelector((state) => state.userState);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isNameOpen, setIsNameOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const changeNameHandler = () => {
        if (name.length < 1) return;

        dispatch(updateUserAction({ name }))
        setIsNameOpen(!isNameOpen);
        setName(user.name);
    }

    const changeEmailHandler = () => {
        if (email.length < 1) return;

        dispatch(updateUserAction({ email }))
        setIsEmailOpen(!isEmailOpen);
        setEmail(user.email);
    }

    const changePasswordHandler = () => {
        if (confirmPassword !== newPassword || newPassword.length < 8) return;

        dispatch(changePasswordAction({ oldPassword, newPassword }))
        setIsPasswordOpen(!isPasswordOpen);
    }

    const deleteAccountHandler = () => {

        dispatch(deleteUserAction());
        setIsDeleteOpen(!isDeleteOpen);
    }

    return (
        <Fragment>
            <Meta title="Account Setting" />
            <Fragment >
                {isLoading ? <Loader /> : (
                    <div className="mx-auto px-4 md:px-10 lg:px-20 xl:px-48  flex flex-col md:flex-row justify-between pb-6 h-[calc(100vh-115px)] bg-pink-100">
                        <div className="w-8/12 mx-auto h-full mt-4 mb-6 flex flex-col border border-solid border-gray-900">
                            <Link to="/account" className="text-blue-500 hover:text-blue-700">
                                <ArrowBackIosNewIcon fontSize="small" /> <span>Go Back</span>
                            </Link>
                            <h2 className="text-2xl font-semibold my-5 text-gray-800 ml-3">Update Your Account Settings</h2>
                            <p className=" font-semibold text-gray-700 mb-1 ml-5">Name: <span className="capitalize font-medium font-mono ml-2">{user?.name}</span><button onClick={() => setIsNameOpen(!isNameOpen)} className="font-medium text-sm ml-4 mb-1 text-blue-600 hover:text-blue-800">Edit</button> </p>
                            <Dialog open={isNameOpen}>
                                <DialogTitle className="text-center">Change your name</DialogTitle>
                                <DialogContent className="my-8 sm:mx-8">
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-4 rounded" required />
                                </DialogContent>
                                <DialogActions>
                                    <button onClick={() => setIsNameOpen(!isNameOpen)} className="bg-blue-500 hover:bg-gray-100 hover:text-blue-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                    <button onClick={changeNameHandler} disabled={name.length < 1} className=" bg-blue-500 hover:bg-gray-100 hover:text-blue-500 hover:bg-red-200 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
                                </DialogActions>
                            </Dialog>
                            <p className=" font-semibold text-gray-700 ml-5">Email: <span className=" font-medium font-mono ml-2">{user?.email}</span> <button onClick={() => setIsEmailOpen(!isEmailOpen)} className="font-medium text-sm ml-4 mb-1 text-blue-600 hover:text-blue-800">Edit</button> </p>
                            <Dialog open={isEmailOpen}>
                                <DialogTitle className="text-center">Change your Email</DialogTitle>
                                <DialogContent className="my-8 sm:mx-8">
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-4 rounded" required />
                                </DialogContent>
                                <DialogActions>
                                    <button onClick={() => setIsEmailOpen(!isEmailOpen)} className="bg-blue-500 hover:bg-gray-100 hover:text-blue-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                    <button onClick={changeEmailHandler} disabled={email.length < 1} className=" bg-blue-500 hover:bg-gray-100 hover:text-blue-500 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
                                </DialogActions>
                            </Dialog>
                            <hr className="mt-6 border-t border-dashed border-gray-300" />
                            <div className="h-12 flex items-center justify-between px-6 border-b border-solid border-gray-400">
                                <button onClick={() => setIsPasswordOpen(!isPasswordOpen)} className=" text-blue-600" >Change Password</button>
                                <ArrowForwardIosIcon fontSize="small" className="text-blue-600" />
                                <Dialog open={isPasswordOpen}>
                                    <DialogTitle className="text-center">Change your password</DialogTitle>
                                    <DialogContent className="my-8 mx-4 sm:mx-12 md:mx-20 flex flex-col gap-4">
                                        <input type="password" value={oldPassword} placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-3 rounded" required />
                                        <input type="password" value={newPassword} placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-3 rounded" required />
                                        <input type="password" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} className="focus:outline-none border border-solid border-gray-600 p-3 rounded" required />
                                    </DialogContent>
                                    <DialogActions>
                                        <button onClick={() => setIsPasswordOpen(!isPasswordOpen)} className="bg-blue-500 hover:bg-gray-100 hover:text-blue-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                        <button onClick={changePasswordHandler} disabled={oldPassword.length < 8 || newPassword.length < 8 || newPassword !== confirmPassword} className=" bg-blue-500 hover:bg-gray-100 hover:text-blue-500 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Update</button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                            <div className="h-12 flex items-center justify-between px-6 border-b border-solid border-gray-400">
                                <button onClick={() => setIsDeleteOpen(!isDeleteOpen)} className=" text-blue-600" >Delete Account</button>
                                <ArrowForwardIosIcon fontSize="small" className="text-blue-600" />
                                <Dialog open={isDeleteOpen}>
                                    <DialogTitle className="text-center">Delete your Account?</DialogTitle>
                                    <DialogContent className="m-8">
                                        <DialogContentText className="text-gray-900">This will delete your bookings deltails also.</DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <button onClick={() => setIsDeleteOpen(!isDeleteOpen)} className="bg-blue-500 hover:bg-gray-100 hover:text-blue-500 py-2 rounded-lg w-24 text-center text-neutral-50  transition duration-200 font-semibold">Cancel</button>
                                        <button onClick={deleteAccountHandler} className=" bg-blue-500 hover:bg-gray-100 hover:text-blue-500 border-solid border py-2 rounded-lg w-24 text-center transition duration-200 box-border">Delete</button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        
                    </div>
                )}
            </Fragment>
        </Fragment>
    )
}
export default UpdateProfile;