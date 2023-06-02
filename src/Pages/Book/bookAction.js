import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase-config';
import { setBook } from './BookSlice';
import { setShowModal } from '../../SystemConfig/systemSlice';

export const getAllbooksAction = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const books = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setBook(books));
    } catch (error) {
        toast.error(error.message);
    }
};

export const addNewBookAction = (bookObj) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, 'books'), bookObj);
        if (docRef?.id) {
            toast.success('New Book has been added.');
            dispatch(getAllbooksAction());
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const deleteBookAction = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, 'books', id));
        dispatch(getAllbooksAction());
        dispatch(setShowModal(false));
    } catch (error) {
        toast.error(error.message);
    }
};

export const updateBookDetail = (id, updatedData) => async (dispatch) => {
    try {
        await setDoc(doc(db, 'books', id), updatedData, { merge: true });
        toast.success('Book Updated');
        dispatch(getAllbooksAction());
        dispatch(setShowModal(false));
    } catch (error) {
        toast.error(error.message);
    }
};
