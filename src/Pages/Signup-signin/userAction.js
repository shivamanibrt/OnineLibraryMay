import { toast } from "react-toastify"
import { auth, db, } from "../../Config/firebase-config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { setUser } from "../Redux/User/userSlice"


export const getUserAction = (uid) => async (dispatch) => {

    try {
        //get user by id from firebase 

        const userRef = await getDoc(doc(db, 'users', uid));
        const userInfo = { ...userRef.data(), uid: uid };

        //mount to user redux
        dispatch(setUser(userInfo))

    } catch (error) {
        toast.error(error.message)
    }
}
//create new user 
export const loginUser = (data) => async (dispatch) => {
    try {
        const pendingUser = signInWithEmailAndPassword(auth, data.email, data.password);
        toast.promise(pendingUser, {
            pending: 'Please wait...'
        });
        const { user } = await pendingUser;

        if (user.uid) {
            //get user info and mount in the redux
            dispatch(getUserAction(user.uid))
        }
    } catch (error) {
        toast.error(error.message)

    }
}

//Update user Profile Details
export const updateProfileAction = ({ id, ...rest }) => async (dispatch) => {
    try {
        await setDoc(doc(db, "users", id), rest); // Corrected line
        dispatch(getUserAction(id));
        toast.success("Your account has been updated successfully");
    } catch (error) {
        toast.error('Error Message: ', error);
    }
};


