import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { db } from "../../Config/firebase-config";
import { setBook } from "./BookSlice";
import { setShowModal } from "../../SystemConfig/systemSlice";


export const getAllbooksAction = () => async (dispatch) => {
    try {
        //define search query to get the books from firebase
        const q = query(collection(db, 'books'));

        let books = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            books.push({
                ...doc.data(),
                id: doc.id
            });
        })
        console.log(books);

        dispatch(setBook(books));
    } catch (error) {
        toast.error(error.message)
    }
}

// Action to add a new book to the Firestore database
export const addNewBookAction = (bookObj) => async (dispatch) => {
    try {
        // Add a new document to the 'books' collection in Firestore
        const docRef = await addDoc(collection(db, 'books'), bookObj);

        // Log the reference to the newly created document
        console.log(docRef);
        if (docRef?.id) {
            toast.success("New Book has been added.")
            dispatch(getAllbooksAction());
            return;
        }

    } catch (error) {
        // Display an error toast message if there is an error
        toast.error('Error.message', error);
    }
};


//Delete book 
export const deleteBookAction = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, 'books', id));
        dispatch(getAllbooksAction());
        dispatch(setShowModal(false));
    } catch (error) {
        toast.error('Error Message:', error);
    }
};
