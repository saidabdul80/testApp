//@ts-nocheck
'use client';
import { useState, useEffect } from 'react';

import apiClient from '@/lib/apiClient';
import Link from 'next/link';
import CustomModal from '@/app/components/CustomModal';
import Button from '@/app/components/Button';

const ManagePost = ({ params }: { params: { id: any } }) => {  
  const { id } = params; // Assuming the post ID is passed as a query parameter

  const [post, setEditedPost] = useState({ title: '', body: '' }); // State to hold edited post details
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Fetch post details based on the ID when the component mounts
  useEffect(() => {
    if (id && id !== 'new') {
      // Fetch post details from API using the ID
      // Example API call:
      apiClient.fetchData('/posts/' + id).then((post) => {
        setEditedPost(post.data);
      }).catch((error) => {
        console.error('Error fetching post:', error);
      });
    }
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditedPost({ ...post, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let method = 'PUT';
    setMsg('post updated successfully');
    let url = '/posts/' + post?.id;
    if (id === 'new') {
      method = 'POST';
      url = '/posts/';
      setMsg('post created successfully');
    }
    apiClient.fetchData(url, method, post).then((response) => {
      console.log('post updated successfully:', response);
      setShowModal(true);
    }).catch((error: any) => {
      console.error('Error updating post:', error);
    });
  };

  return (
    <div className="container mx-auto p-4">
      <CustomModal showModal={showModal} icon='success' setShowModal={setShowModal} onConfirm={() => setShowModal(false)}>
        <h2>{title}</h2>
        <p>{msg}!</p>
      </CustomModal>
      {post && (
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Edit post: {post?.title}</h2>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            value={post.title}
            onChange={handleInputChange}
            className="w-full border p-2 mb-4"
          />
          <label htmlFor="body">Body:</label>
          <textarea
            rows={6}
            name="body"
            value={post.body}
            onChange={handleInputChange}
            className="w-full border p-2 mb-4"
          />
          <Button onClick={handleSubmit}  color='blue' >Submit</Button>
          <Link href='/posts'>
            <Button  color='gray' > Back</Button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default ManagePost;
