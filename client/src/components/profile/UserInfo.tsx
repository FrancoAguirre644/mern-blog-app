import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '../../interfaces/global'
import NotFound from '../global/NotFound'

const UserInfo = () => {

    const initState = {
        name: '', account: '', avatar: '', password: '', cf_password: ''
    }

    const { auth } = useSelector((state: RootStore) => state);
    const dispatch = useDispatch();

    const [user, setUser] = useState(initState);
    const [typePass, setTypePass] = useState(false);
    const [typeCfPass, setTypeCfPass] = useState(false);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setUser({ ...user, [name]: value });
    }

    const { name, account, avatar, password, cf_password } = user;

    if (!auth.user) return <NotFound />

    return (
        <div>
            <form className="profile_info">
                <div className="info_avatar">
                    <img src={auth.user.avatar} alt="avatar" />

                    <span>
                        <i className="fas fa-camera"></i>
                        <p>Change</p>
                        <input type="file" accept='image/*' name="file" id="file_up" />
                    </span>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="name" className='form-label'>Name</label>
                    <input type="text" className='form-control' id="name"
                        name="name" defaultValue={auth.user.name}
                        onChange={handleChangeInput}
                    />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="account" className='form-label'>Account</label>
                    <input type="text" className='form-control' id="account"
                        name="account" defaultValue={auth.user.account}
                        onChange={handleChangeInput} disabled={true}
                    />
                </div>

                <div className="form-group my-3">
                    <label htmlFor="password" className='form-label'>Password</label>
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className='form-control' id="password"
                            name='password' value={password} onChange={handleChangeInput}
                        />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                </div>

                <div className="form-group my-3">
                    <label htmlFor="cf_password" className='form-label'>Confirm Password</label>
                    <div className="pass">
                        <input type={typeCfPass ? "text" : "password"} className='form-control' id="cf_password"
                            name='cf_password' value={cf_password} onChange={handleChangeInput}
                        />

                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? 'Hide' : 'Show'}
                        </small>
                    </div>
                </div>

                <button className="btn btn-dark w-100" type='submit'>
                    Update
                </button>
            </form>
        </div>
    )
}

export default UserInfo
