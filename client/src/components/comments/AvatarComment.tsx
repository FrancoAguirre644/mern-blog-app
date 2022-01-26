import React from 'react';
import { Link } from 'react-router-dom';
import { IUser } from '../../interfaces/IUser';

interface IProps {
  user: IUser;
}

const AvatarComment: React.FC<IProps> = ({ user }) => {
  return (
    <div className="me-1 avatar_comment">
      <img src={user.avatar} alt="avatar" />

      <small className="d-block text-break">
        <Link to={`/profile/${user._id}`}>
          {user.name}
        </Link>
      </small>
    </div>
  )
};

export default AvatarComment;
