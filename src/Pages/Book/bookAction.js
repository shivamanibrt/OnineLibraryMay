import { toast } from 'react-toastify';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../../Config/firebase-config';
import { setBook, setBurrowBooksHistory, setSelectedBooks } from './BookSlice';
import { setShowModal } from '../../SystemConfig/systemSlice';

// Action to get all books
export const getAllbooksAction = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const books = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        dispatch(setBook(books));
    } catch (error) {
        toast.error(error.message);
    }
};

// Action to add a new book
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

// Action to delete a book
export const deleteBookAction = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, 'books', id));
        dispatch(getAllbooksAction());
        dispatch(setShowModal(false));
    } catch (error) {
        toast.error(error.message);
    }
};

// Action to update book details
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

// Action to fetch book by ID
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

// Action to create a new burrow entry
export const createNewBurrowAction = (obj) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, 'burrowHistory'), obj);
        if (docRef?.id) {
            toast.success('New burrowing item has been added.');
            // Update the book's isAvailable status and availableFrom date
            const updateObj = {
                isAvailable: false,
                availableFrom: obj?.returnDate,
                id: obj?.bookId
            };
            dispatch(updateBookDetail(updateObj));
            return;
        }
    } catch (error) {
        toast.error('Error Message: ' + error);
    }
};

// Action to get burrowed books history
export const burrowBooksAction = (uid) => async (dispatch, getState) => {
    try {
        const { role } = getState().user.user;

        let querySnapshot;
        if (role === 'admin') {
            querySnapshot = await getDocs(collection(db, 'burrowHistory'));
        } else if (role === 'user') {
            const q = query(collection(db, 'burrowHistory'), where('userId', '==', uid));
            querySnapshot = await getDocs(q);
        }

        const burrowBooks = [];
        querySnapshot.forEach((doc) => {
            burrowBooks.push({
                ...doc.data(),
                id: doc.id,
            });
        });
        dispatch(setBurrowBooksHistory(burrowBooks));
    } catch (error) {
        toast.error(error.message);
    }
};
