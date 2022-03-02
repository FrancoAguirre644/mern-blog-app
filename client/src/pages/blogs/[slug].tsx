import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CardVert from '../../components/cards/CardVert';
import NotFound from '../../components/global/NotFound';
import Pagination from '../../components/global/Pagination';
import { RootStore } from '../../interfaces/global';
import { IBlog } from '../../interfaces/IBlog';
import { IParams } from '../../interfaces/IParams';
import { getBlogsByCategoryId } from '../../redux/actions/blogAction';

const BlogsByCategory = () => {

    const { categories, blogsCategory } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();

    const { slug } = useParams<IParams>();

    const [categoryId, setCategoryId] = useState('');
    const [blogs, setBlogs] = useState<IBlog[]>();
    const [total, setTotal] = useState(0);

    const history = useHistory();
    const { search } = history.location;

    const handlePagination = (num: number) => {
        const search = `?page=${num}`;
        dispatch(getBlogsByCategoryId(categoryId, search));
    }

    useEffect(() => {

        const category = categories.find(item => item.name === slug);
        if (category) setCategoryId(category._id);

    }, [slug, categories]);

    useEffect(() => {
        if (!categoryId) return;

        if (blogsCategory.every(item => item.id !== categoryId)) {
            dispatch(getBlogsByCategoryId(categoryId, search));
        } else {
            const data = blogsCategory.find(item => item.id === categoryId);
            if (!data) return;

            setBlogs(data.blogs);
            setTotal(data.total);
            if (data.search) history.push(data.search);
        }

    }, [categoryId, blogsCategory, dispatch, search, history]);

    if (!blogs) return <NotFound />

    return (
        <div className="blogs_category">

            <div className="col-12">
                <div className="shadow p-3 mb-3 bg-white font-weight-bold rounded text-mda-negro border-bottom border-5 border-primary">
                    { slug.toUpperCase() }
                </div>
            </div>

            <div className="show_blogs">
                {
                    blogs.map(blog => (
                        <CardVert key={blog._id} blog={blog} />
                    ))
                }
            </div>

            {
                total > 1 &&
                <Pagination
                    total={total}
                    callback={handlePagination}
                />
            }
        </div>
    )
};

export default BlogsByCategory;
