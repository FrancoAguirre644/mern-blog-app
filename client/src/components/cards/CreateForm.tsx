import React, { ChangeEvent } from 'react'
import { useSelector } from 'react-redux';
import { RootStore } from '../../interfaces/global'
import { IBlog } from '../../interfaces/IBlog';

interface IProps {
    blog: IBlog,
    setBlog: (blog: IBlog) => void
}

const CreateForm: React.FC<IProps> = ({ blog, setBlog }) => {

    const { categories } = useSelector((state: RootStore) => state);;

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { value, name } = e.target;
        setBlog({ ...blog, [name]: value });
    }

    const handleChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement
        const files = target.files
        if (files) {
            const file = files[0]
            setBlog({ ...blog, thumbnail: file })
        }
    }

    return (
        <form>
            <div className="form-group position-relative">

                <div className="form-group">
                    <input type="text" className="form-control" name='title'
                        value={blog.title} onChange={handleChangeInput} />
                    <small className="text-muted position-absolute"
                        style={{ bottom: 0, right: '3px', opacity: '0.5' }}>
                        {blog.title.length}/50
                    </small>
                </div>

            </div>


            <div className="form-group my-3">
                <input type="file" className="form-control"
                    accept="image/*" onChange={handleChangeThumbnail} />
            </div>

            <div className="form-group position-relative">
                <div className="form-group">
                    <textarea className="form-control" value={blog.description}
                        name="description" onChange={handleChangeInput}
                        style={{ resize: 'none' }} rows={4} />
                    <small className="text-muted position-absolute"
                        style={{ bottom: 0, right: '3px', opacity: '0.5' }}>
                        {blog.description.length}/200
                    </small>
                </div>
            </div>

            <div className="form-group my-3">
                <select name="category" className="form-control text-capitalize"
                    value={blog.category} onChange={handleChangeInput}>
                    <option value="">Choose a category</option>
                    {
                        categories.map((category) => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>

        </form>
    )
}

export default CreateForm
