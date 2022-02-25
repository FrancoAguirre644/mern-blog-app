import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginSMS } from '../../redux/actions/authAction';

const LoginSMS = () => {

    const [phone, setPhone] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(loginSMS(phone));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="phone" className='form-label'>Phone number</label>
                <input type="text" className="form-control" id="phone"
                    value={phone} onChange={e => setPhone(e.target.value)}
                />
            </div>

            <button type='submit' className="btn btn-dark w-100">
                Login
            </button>
        </form>
    )
}

export default LoginSMS
