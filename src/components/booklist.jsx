import { useEffect, useState } from "react";
import '../styles/booklist.css';
import { useNavigate } from "react-router-dom";
import remove from '../../src/images/remove32.png'
import edit from '../../src/images/edit.png'
import { useDispatch, useSelector } from "react-redux";
import { deleteBookData, fetchBooksData } from "../reduxtoolkit/actions/bookThunk";
import { toast } from "react-toastify";
import { DELETE_BOOK_DATA_PENDING, FETCH_BOOKS_DATA_PENDING } from "../reduxtoolkit/constants";

const Booklist = ({ setIsedit }) => {
    let navigate = useNavigate();
    let dispatch = useDispatch()
    let { booksData, loading, error } = useSelector((state) => state?.books);

    let [books, setBooks] = useState([])

    let fetchData = () => {
       dispatch({ type: FETCH_BOOKS_DATA_PENDING });
        // dispatch(fetchBooksData())
    }

    useEffect(() => {
        fetchData()
    }, [dispatch]);


    useEffect(() => {
        if (booksData) {
            setBooks(booksData);
        }
    }, [booksData]);

    let readmore = (id) => {
        if (id) {
            navigate(`/books/${id}`);
        }
    }

    let handleremoveClick = async (id, title) => {
        try {
            // await dispatch(deleteBookData(id));
            dispatch({ type: DELETE_BOOK_DATA_PENDING, payload: id });
            toast.success(`${title} has been deleted permanently`)
            fetchData();
        } catch (error) {
            console.error(error);
            toast.error(error.message)
            alert(error.message);
        }
    };

    let handleeditclick = (id, title) => {
        setIsedit(true)
        navigate(`/editbook/${id}`)
    }

    return (
        <div className="booklist">
            <div className="outerbooklist">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && books?.length > 0 && (
                    <div className="main addmain">
                        <h1>Book List ({books?.length})</h1>
                        <div className="section">
                            {books?.length > 0 ? (
                                books?.map((data, index) =>
                                    <div data-testid="bookcard" className="bookcard" key={index}>
                                        <div className="bookimage">
                                            <img src={data.thumbnailUrl} title={data.title} alt={data.title} />
                                        </div>
                                        <div className="bookcardinfo">
                                            <div className="bookscardinfo-no-btns">
                                                <div className="titlerow">
                                                    <h2 title={data.title}><strong>{data.title}</strong></h2>
                                                    <button title="edit" className="booklistedit" onClick={() => handleeditclick(data.id, data.title)}><img src={edit} alt="edit book" /></button>
                                                </div>
                                                <div>
                                                    <p><span>Authors : </span> {data.authors}</p>
                                                </div>
                                                <div>
                                                    <p className="categories"><span>Categories :</span> {data.categories}</p>
                                                </div>
                                                <div>
                                                    <p><span>Page Count : </span>{data.pageCount}</p>
                                                </div>
                                            </div>
                                            <div className="booklistbtns">
                                                <div>
                                                    <button title="Read more >>" onClick={() => readmore(data.id)} className="booklistbtn">Read More &gt;&gt;</button>
                                                </div>
                                                <div>
                                                    <button title="Delete" className="booklistremove booklistedit" onClick={() => handleremoveClick(data.id, data.title)}><img src={remove} alt="delete book" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <div>
                                    <p>Book is empty</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Booklist;
