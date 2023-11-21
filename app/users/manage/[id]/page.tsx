//@ts-nocheck
'use client';
import { useState, useEffect } from 'react';

import apiClient from '@/lib/apiClient';
import Link from 'next/link';
import CustomModal from '@/app/components/CustomModal';
import Button from '@/app/components/Button';

const ManageUser = ({ params }: { params: { id: any } }) => {  
  const { id } = params // Assuming the user ID is passed as a query parameter

  const [user, setEditedUser] = useState({}); // State to hold edited user details
  const [title, setTitle] = useState(''); 
  const [msg, setMsg] = useState(''); 
  const [showModal, setShowModal] = useState(false);
  // Fetch user details based on the ID when the component mounts
  useEffect(() => {
    if (id && id != 'new') {
      // Fetch user details from API using the ID
      // Example API call:
      apiClient.fetchData('/users/' + id).then((user) => {
        //@ts-ignore
        setEditedUser(user.data);
      }).catch((error) => {
        console.error('Error fetching user:', error);
      });
    }
  }, [id]);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setEditedUser({ ...user, [name]: value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault(); 
    let method = 'PUT';
    setMsg('User updated successfully')
    if(id=='new'){
       method = 'POST';
       setMsg('User created successfully')
    }
    apiClient.fetchData('/users',method, user).then((response) => {
      // Handle successful update, e.g., show a success message
      console.log('User updated successfully:', response);
      setShowModal(true)
    }).catch((error:any) => {
      // Handle error during update
      console.log('Error updating user:', error);
    });
  };
  



  return (
    <div className="container mx-auto p-4">
      <CustomModal showModal={showModal} setShowModal={setShowModal} onConfirm={()=>{setShowModal(false)}}>
            <h2>{title}</h2>
            <p>{msg}!</p>
        </CustomModal>
      {user && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Edit User: {user?.name}</h2>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={user?.name}
            onChange={handleInputChange}
            className="w-full border p-2 mb-4"
          />
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            value={user?.username}
            onChange={handleInputChange}
            className="w-full border p-2 mb-4"
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            onChange={handleInputChange}
            className="w-full border p-2 mb-4"
          />
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={user?.phone}
            onChange={handleInputChange}
            className="w-full border p-2 mb-4"
          />
          <Button onClick={handleSubmit} children='Submit' color='blue' />     
          <Link href='/users'>
          <Button children='Back' color='gray' />     
          </Link>          
        </form>
      )}
    </div>
  );
};

export default ManageUser;
