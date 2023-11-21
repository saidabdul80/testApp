// @ts-nocheck
'use client';
import { useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';
import Link from 'next/link'
import { EyeIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import CustomModal from '../components/CustomModal';

export default function Posts() {
  const [pageIndex, setPageIndex] = useState(0);
  const [posts, setposts] = useState([]);
  const [selectedpost, setSelectedpost] = useState(null);
  const [title, setTitle] = useState(''); // State to hold edited post details
  const [msg, setMsg] = useState(''); // State to hold edited post details
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  useEffect(() => {
    // Fetch data based on the pageIndex
    apiClient.fetchData(`/posts?page=${pageIndex}`, 'GET').then((response) => {
      try {
        setposts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });
  }, [pageIndex]);
  const handleDelete = (id) => {
    setSelectedpost(id)
    setTitle('Confirmation')
    setMsg('Are you sure you want to Delete?')
    setShowModal(true); // Show the confirmation modal
  };
  const confirmDelete = () => {
    apiClient.fetchData(`/posts/${selectedpost}`,'DELETE').then((response) => {
      console.log('post deleted successfully:', response);
      setShowModal2(true); 
      setTitle('')
      setMsg('post deleted successfully')
    }).catch((error) => {
      console.error('Error deleting post:', error);
    });
    setShowModal(false); // Hide the modal after delete
  };

  return (
    <main className="min-h-screen p-6">
        <CustomModal showModal={showModal} setShowModal={setShowModal} onConfirm={confirmDelete}>
            <h2>{title}</h2>
            <p>{msg}</p>
        </CustomModal>
        <CustomModal showModal={showModal2} icon='success' setShowModal={setShowModal2}>
            <h2>{title}</h2>
            <p>{msg}</p>
        </CustomModal>
        <Link href='/posts/manage/new' className='inline-block'><button  className='py-2 px-4 mbtn rounded-md bg-green-500 mx-2 w-[100px] flex items-center text-white'> <PlusIcon className='w-4 h-4'/>post</button></Link>
      <div className="overflow-x-auto shadow-md bg-white">
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">title</th>
              <th className="py-3 px-6 text-left">body</th>
              <th className="py-3 px-6 text-left">#</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {posts.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{item.title}</td>
                <td className="py-3 px-6 text-left">{item.body?.slice(0,30)}</td>
                <td className="py-3 px-6 text-left">
                    <div>
                    <Link href={`posts/manage/${item.id}`}><button  className='py-2 my-1 mbtn px-4 rounded-md bg-amber-500 mx-auto  text-white'> <EyeIcon className='w-4 h-4'/></button></Link>
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
