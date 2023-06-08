import { toast } from "react-toastify";
import { auth, db } from "../../Config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { setUserCount, setUser, setAllUser } from "../Redux/User/userSlice";

export const getAllUser = () => async (dispatch) => {
    try {
        // Retrieve all users from the Firestore collection
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userCount = querySnapshot.size;

        // Dispatch an action to set the user count in the Redux store
        dispatch(setUserCount(userCount));
    } catch (error) {
        // Display an error toast if an error occurs
        toast.error(error.message);
    }
};

export const getUserAction = (uid) => async (dispatch) => {
    try {
        // Retrieve a specific user by ID from Firestore
        const userRef = await getDoc(doc(db, 'users', uid));
        const userInfo = { ...userRef.data(), uid: uid };

        // Dispatch an action to set the user information in the Redux store
        dispatch(setUser(userInfo));
    } catch (error) {
        // Display an error toast if an error occurs
        toast.error(error.message);
    }
};

export const loginUser = (data) => async (dispatch) => {
    try {
        // Sign in the user with the provided email and password
        const pendingUser = signInWithEmailAndPassword(auth, data.email, data.password);
        // Display a toast message while the user is being signed in
        toast.promise(pendingUser, {
            pending: 'Please wait...'
        });
        const { user } = await pendingUser;

        if (user.uid) {
            // If the user is successfully signed in, retrieve their information and update the Redux store
            dispatch(getUserAction(user.uid));
        }
    } catch (error) {
        // Display an error toast if an error occurs
        toast.error(error.message);
    }
};

export const updateProfileAction = ({ id, ...rest }) => async (dispatch) => {
    try {
        // Update the user profile details in Firestore
        await setDoc(doc(db, "users", id), rest, { merge: true });
        // Retrieve the updated user information and update the Redux store
        dispatch(getUserAction(id));
        // Display a success toast message
        toast.success("Your account has been updated successfully");
    } catch (error) {
        // Display an error toast if an error occurs
        toast.error('Error Message: ', error);
    }
};

export const getAllUserAction = (uid) => async (dispatch, getState) => {
    try {
        // Get the user role from the Redux store state
        const { role } = getState().user.user;

        let querySnapshot;
        if (role === 'admin') {
            // If the user is an admin, retrieve all users from Firestore
            querySnapshot = await getDocs(collection(db, 'users'));
        } else if (role === 'user') {
            // If the user is a regular user, retrieve only their own information from Firestore
            const q = query(collection(db, 'users'), where('userId', '==', uid));
            querySnapshot = await getDocs(q);
        }

        const setUser = [];
        querySnapshot.forEach((doc) => {
            setUser.push({
                ...doc.data(),
                id: doc.id,
            });
        });

        // Set the retrieved user information in the Redux store
        dispatch(setAllUser(setUser));
    } catch (error) {
        // Display an error toast if an error occurs
        toast.error(error.message);
    }
};

export const deleteUserAction = (userId) => async (dispatch) => {
    try {
        // Delete the user document from the Firestore collection
        await deleteDoc(doc(db, "users", userId));
        toast.success("User deleted successfully");

        // Fetch updated user list after deletion
        dispatch(getAllUserAction());
    } catch (error) {
        toast.error(error.message);
    }
};

export const editUserAction = (userId, updatedData) => async (dispatch) => {
    try {
        // Update the user document in the Firestore collection
        await setDoc(doc(db, "users", userId), updatedData, { merge: true });
        toast.success("User profile updated successfully");

        // Fetch the updated user details
        dispatch(getUserAction(userId));
    } catch (error) {
        toast.error(error.message);
    }
};
