import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrMsg } from '../../components/alert/Alert';
import { IBlog } from '../../interfaces/IBlog';
import { IParams } from '../../interfaces/IParams';
import { getAPI } from '../../utils/fetchData';

const DetailBlog = () => {

    const id = useParams<IParams>().slug;

    const [blog, setBlog] = useState<IBlog>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!id) return;
        setLoading(true);

        getAPI(`blogs/${id}`)
            .then(res => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.response.data.msg);
                setLoading(false);
            })

    }, [id]);

    return (
        <div className='my-4'>
            { error && showErrMsg(error) }
        </div>
    );
};

export default DetailBlog;
