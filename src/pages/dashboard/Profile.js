import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateUser } from '../../features/user/userSlice';

const Profile = () => {
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const [selects, setSelects] = useState({
    name: userData.name ? true : false,
    email: userData.email ? true : false,

  })

  const handleFocus = (e) => {
    const title = e.target.name
    const value = !selects[title]
    if(!userData[title]){
      setSelects({ ...selects, [title]: value });
    }
  };

  const handleBlur = (e) => {
    const title = e.target.name
    const value = !selects[title]
    if(!userData[title]){
      setSelects({ ...selects, [title]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email } = userData;
    if (!name || !email) {
      toast.error('please fill out all fields');
      return;
    }
    dispatch(updateUser(userData));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className='form-center'>
          <FormRow
            type='text'
            name='name'
            value={userData.name}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            selected={selects.name}
          />
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            selected={selects.email}
          />
          <button type='submit' className='btn btn-block' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
