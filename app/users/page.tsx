// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';
import Link from 'next/link'
import { EyeIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import CustomModal from '../components/CustomModal';

export default function Users() {
  const [pageIndex, setPageIndex] = useState(0);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [title, setTitle] = useState(''); // State to hold edited user details
  const [msg, setMsg] = useState(''); // State to hold edited user details
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  useEffect(() => {
    // Fetch data based on the pageIndex
    apiClient.fetchData(`/users?page=${pageIndex}`, 'GET').then((response) => {
      try {
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  }, [pageIndex]);
  const handleDelete = (id) => {
    setSelectedUser(id)
    setTitle('Confirmation')
    setMsg('Are you sure you want to Delete?')
    setShowModal(true); // Show the confirmation modal
  };
  const confirmDelete = () => {
    apiClient.fetchData(`/users/${selectedUser}`,'DELETE').then((response) => {
      console.log('User deleted successfully:', response);
      setShowModal2(true); 
      setTitle('')
      setMsg('User deleted successfully')
    }).catch((error) => {
      console.error('Error deleting user:', error);
    });
    setShowModal(false); // Hide the modal after delete
  };

  return (
    <main className="min-h-screen p-6">
        <CustomModal showModal={showModal} setShowModal={setShowModal} onConfirm={confirmDelete}>
            <h2>{title}</h2>
            <p>{msg}</p>
        </CustomModal>
        <CustomModal showModal={showModal2} setShowModal={setShowModal2}>
            <h2>{title}</h2>
            <p>{msg}</p>
        </CustomModal>
        <Link href='/users/manage/new'><button  className='py-2 px-4 mbtn rounded-md bg-green-500 mx-2 w-[100px] flex items-center text-white'> <PlusIcon className='w-4 h-4'/>User</button></Link>
      <div className="overflow-x-auto shadow-md bg-white">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">#</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{item.name}</td>
                <td className="py-3 px-6 text-left">{item.username}</td>
                <td className="py-3 px-6 text-left">{item.email}</td>
                <td className="py-3 px-6 text-left">{item.phone}</td>
                <td className="py-3 px-6 text-left">
                    <div>
                    <Link href={`users/manage/${item.id}`}><button  className='py-2 my-1 mbtn px-4 rounded-md bg-amber-500 mx-auto  text-white'> <EyeIcon className='w-4 h-4'/></button></Link>
                    <button onClick={() => handleDelete(item.id)} className='py-2 my-1 px-4 mbtn rounded-md bg-red-500 mx-auto lg:mx-2 text-white'> <TrashIcon className='w-4 h-4'/></button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          disabled={pageIndex === 0}
          onClick={() => setPageIndex(pageIndex - 1)}
          className="py-2 px-4 rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed">
          Previous
        </button>
        <button
          onClick={() => setPageIndex(pageIndex + 1)}
          className="py-2 px-4 rounded-md bg-blue-500 text-white">
          Next
        </button>
      </div>
    </main>
  );
}
