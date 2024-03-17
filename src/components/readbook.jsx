import { useNavigate, useParams } from "react-router-dom";
import '../styles/readbook.css';
import { useEffect, useState } from "react";
import { getBookDataByID } from "../reduxtoolkit/actions/bookThunk";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GET_BOOK_DATA_BY_ID_PENDING } from "../reduxtoolkit/constants";

const Readbooks = () => {
    let params = useParams();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    let { booksDataByID, loading, error } = useSelector((state) => state?.books);
    let [book, setBook] = useState({});
    let [message, setMessage] = useState('');

    let fetchData = async () => {
        try {
            // await dispatch(getBookDataByID(params.id));
            dispatch({ type: GET_BOOK_DATA_BY_ID_PENDING ,payload:params.id});
        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        } else if (booksDataByID) {
            setBook(booksDataByID);
        }
    }, [booksDataByID, error]);

    useEffect(() => {
        if (Object.keys(book).length === 0 && !loading) {
            let countdown = 8;
            setMessage(`Redirecting.....`);
            const timer = setInterval(() => {
                setMessage(`Redirecting to ${countdown}`);
                countdown--;
                if (countdown === -2) {
                    clearInterval(timer);
                    navigate('/books');
                }
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [book, loading, navigate]);

    return (
        <div className="readbook" style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
            <div className="main addmain">
                <div className="section">
                    {
                        loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error} - {message}</p>
                        ) : Object.keys(book).length === 0 ? (
                            <div>
                                No Data found - {message}
                            </div>
                        ) : (
                            <div className="bookcard">
                                <div className="bookimage">
                                    <img src={book.thumbnailUrl} title={book.title} alt={book.title} />
                                </div>
                                <div className="bookcardinfo rightCards">
                                    <div className="bookscardinfo-no-btns readbookinfo">
                                        <div className="booktitle">
                                            <h2 title={book.title}><strong>{book.title}</strong></h2>
                                        </div>
                                        <div>
                                            <p><span>Authors : </span> {book.authors}</p>
                                        </div>
                                        <div>
                                            <p className="categories"><span>Categories :</span> {book.categories}</p>
                                        </div>
                                        <div>
                                            <p><span>ShortDescription : </span>{book.shortDescription}</p>
                                        </div>
                                        <div>
                                            <p><span>Page Count : </span>{book.pageCount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Readbooks;
