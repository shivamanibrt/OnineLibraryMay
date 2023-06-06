import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../Config/firebase-config';
import { setBook, setSelectedBooks } from './BookSlice';
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
        const bookWithAvailability = { ...bookObj, isAvailable: true }; // Add isAvailable property with value true

        const docRef = await addDoc(collection(db, 'books'), bookWithAvailability);
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

//const this displays the readmore button into new pages
export const fetchBookByIdAction = (id) => async (dispatch) => {
    try {
        const docRef = doc(db, 'books', id);
        const docSnapshot = await getDoc(docRef);

        const bookData = docSnapshot.data();
        const borrowingBooksData = { ...bookData, id: docSnapshot.id };

        if (borrowingBooksData.isAvailable) {
            dispatch(setSelectedBooks({ ...borrowingBooksData, isAvailable: false }));
        } else {
            dispatch(setSelectedBooks(borrowingBooksData));
        }
    } catch (error) {
        toast.error(error);
    }
};

//burrow book

export const createNewBurrowAction = (obj) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, 'burrowHistory'), obj)
        if (docRef?.id) {
            toast.success('New burrowing item has been added.')
            //update the books isAvailable:false,availableFrom:Date
            const updateObj = {
                isAvailable: false,
                availableFrom: obj?.returnDate,
                id: obj?.bookId
            }
            //not fetch all the books from database and mount to our redux
            dispatch(updateBookDetail(updateObj));
            return;
        }
    } catch (error) {
        toast.error('Error Message: ' + error);
    }
}
