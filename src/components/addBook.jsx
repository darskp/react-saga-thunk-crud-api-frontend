import '../styles/addbook.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import hero from '../../src/images/hero1.png'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addBookData, getBookDataByID, putBookData } from '../reduxtoolkit/actions/bookThunk';
import { toast } from 'react-toastify';
import { GET_BOOK_DATA_BY_ID_PENDING, POST_ADD_BOOK_DATA_FULFILLED, POST_ADD_BOOK_DATA_PENDING, POST_ADD_BOOK_DATA_REJECTED, PUT_UPDATE_BOOK_DATA_PENDING } from '../reduxtoolkit/constants';

const Addbooks = ({ isEdit, setIsedit }) => {
    let params = useParams();
    const id = params?.id
    let dispatch = useDispatch()
    let navigate = useNavigate();
    let { booksDataByID, loading, error } = useSelector((state) => state?.books);

    let [title, setTitle] = useState('');
    let [authors, setAuthors] = useState('');
    let [categories, setCategories] = useState('');
    let [pageCount, setPageCount] = useState(null);
    let [shortDescription, setShortDescription] = useState('');
    let [thumbnailUrl, setThumbnailUrl] = useState('');

    useEffect(() => {
        if (booksDataByID && isEdit) {
            setTitle(booksDataByID?.title)
            setAuthors(booksDataByID?.authors)
            setCategories(booksDataByID?.categories)
            setPageCount(booksDataByID?.pageCount)
            setShortDescription(booksDataByID?.shortDescription)
            setThumbnailUrl(booksDataByID
                ?.thumbnailUrl)
        }
    }, [booksDataByID]);

    let handlesubmit = async (e) => {
        e.preventDefault();
        let bookdata = { title, authors, categories, pageCount, shortDescription, thumbnailUrl };
        try {
            // const action = await dispatch(addBookData(bookdata));
            // if (addBookData.fulfilled.match(action)) {
            //     console.log("Book data", bookdata);
            //     toast.success(action.payload)
            //     navigate('/books');
            // }

            dispatch({ type: POST_ADD_BOOK_DATA_PENDING, payload: bookdata });
                console.log("Book data", bookdata);
                // toast.success(action.payload); 
                navigate('/books');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    let handleUpdate = async (e) => {
        e.preventDefault();
        let formData = { title, authors, categories, pageCount, shortDescription, thumbnailUrl };
        try {
            // const action = await dispatch(putBookData({ id, formData }));
            // console.log(action);
            // if (putBookData.fulfilled.match(action)) {
            //     toast.success(action.payload.message)
            //     setIsedit(false);
            //     navigate('/books');
            // } else {
            //     console.error('Failed to update book data', action.payload);
            // }

            let payload = { id, formData }
            dispatch({ type: PUT_UPDATE_BOOK_DATA_PENDING, payload });

            // console.log(action);
            // if (putBookData.fulfilled.match(action)) {
            //     toast.success(action.payload.message)
                setIsedit(false);
                navigate('/books');
            // } else {
            //     console.error('Failed to update book data', action.payload);
            // }
        } catch (error) {
            console.error('Error:', error);
        }
    }


    let fetchData = async () => {
        // dispatch(getBookDataByID(id))
        dispatch({ type: GET_BOOK_DATA_BY_ID_PENDING, payload: id });
    }
    useEffect(() => {
        if (isEdit) {
            fetchData();
        }
    }, [isEdit, dispatch]);


    return (
        <div className='mainadd'>
            <div className="itemadd">
                <h1 className='addtitle'>{isEdit ? 'Edit ' : 'Add '} a Book</h1>
                <div className='container'>
                    <div className="form_image heropageright user-link">
                        <img src={hero} className="heroimg" alt="hero-img" />
                    </div>
                    <div className="form">
                        <form onSubmit={!isEdit ? handlesubmit : handleUpdate}>
                            <div className="title-add">
                                <input name='title' value={title} onChange={e => setTitle(e.target.value)} required type="text" placeholder="Enter the title" />
                            </div>
                            <div className="authors">
                                <input name='authors' value={authors} onChange={e => setAuthors(e.target.value)} required type="text" placeholder="Enter the authors" />
                            </div>
                            <div className="categories">
                                <input name='categories' value={categories} onChange={e => setCategories(e.target.value)} type="text" placeholder="Enter the categories" />
                            </div>
                            <div className="pageCount">
                                <input name='pageCount' value={pageCount} onChange={e => setPageCount(e.target.value)} type="number" min="0" placeholder="Enter the page count" />
                            </div>
                            <div className="Description">
                                <textarea name='shortDescription' className="inputtextarea shortDescription" value={shortDescription} onChange={e => setShortDescription(e.target.value)} placeholder="Enter the short description"></textarea>
                            </div>
                            <div className="thumbnailUrl">
                                <input name="thumbnailUrl" value={thumbnailUrl} onChange={e => setThumbnailUrl(e.target.value)} type="text" placeholder="Enter the thumbnail url" />
                            </div>
                            <div className='booklistbtns btn'>
                                <button className="booklistbtn">{isEdit ? 'Edit ' : 'Add '} Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addbooks;