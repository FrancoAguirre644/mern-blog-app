import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CardHoriz from '../components/cards/CardHoriz';
import CreateForm from '../components/cards/CreateForm';
import NotFound from '../components/global/NotFound';
import { RootStore } from '../interfaces/global';
import { IBlog } from '../interfaces/IBlog';
import ReactQuill from '../components/editor/ReactQuill';
import { getAPI } from '../utils/fetchData';
import { updateBlog } from '../redux/actions/blogAction';

interface IProps {
    id?: string;
}

const CreateBlog: React.FC<IProps> = ({ id }) => {

    const initState = {
        user: '',
        title: '',
        content: '',
        description: '',
        thumbnail: '',
        category: '',
        createdAt: new Date().toISOString()
    }

    const [blog, setBlog] = useState<IBlog>(initState);
    const [body, setBody] = useState('');

    const { auth, categories } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();

    const [oldData, setOldData] = useState<IBlog>(initState);

    useEffect(() => {
        if (!id) return;

        getAPI(`blogs/${id}`)
            .then(res => {
                console.log(res);
                setBlog(res.data);
                setBody(res.data.content);
                setOldData(res.data);
            })
            .catch(err => console.log(err));

        const initData = {
            user: '',
            title: '',
            content: '',
            description: '',
            thumbnail: '',
            category: '',
            createdAt: new Date().toISOString()
        }

        return () => {
            setBlog(initData);
            setBody('');
            setOldData(initData);
        }

    }, [id]);

    const handleSubmit = async () => {
        if (!auth.access_token) return;

        let newData = { ...blog, content: body };

        if (id) {
            dispatch(updateBlog(newData, auth.access_token));
        }

    }

    if (!auth.access_token) return <NotFound />

    return (
        <div className="my-4 create_blog">
            <div className="row mt-4">
                <div className="col-md-6">
                    <h5>Create</h5>
                    <CreateForm blog={blog} setBlog={setBlog} />
                </div>
                <div className="col-md-6">
                    <h5>Preview</h5>
                    <CardHoriz blog={blog} />
                </div>
            </div>

            <ReactQuill setBody={setBody} body={body} />

            <button className="btn btn-dark mt-3 d-block mx-auto"
                onClick={handleSubmit}>
                {id ? 'Update Post' : 'Create Post'}
            </button>
        </div>
    )
}

export default CreateBlog
