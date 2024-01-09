import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

import { RiDeleteBin5Line } from "react-icons/ri";

import Nav from './App/Nav';

function App() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // ดึงข้อมูล posts ทุกครั้งที่โหลดหน้าเว็บ
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/api/posts', { name, image, text });
      console.log('Post created successfully');
      fetchPosts(); // หลังจากสร้าง Post เสร็จให้ดึงข้อมูล posts ใหม่
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`);
      console.log('Post deleted successfully');
      fetchPosts(); // หลังจากลบ Post เสร็จให้ดึงข้อมูล posts ใหม่
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <Nav />
      <div className='flex justify-center'>
      <div className='w-11/12'>
      <h1 className='text-center text-2xl pb-10'>Create Post</h1>
      <form>
            
          <div className='border border-black rounded-xl py-5 grid grid-cols-3 gap-5 px-2'>

              <div className='grid grid-cols-1'>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </div>

              <div className='grid grid-cols-1'>
                <label>Image URL :</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
              </div>


              <div className='grid grid-cols-1'>
                <label>Text :</label>
                <textarea className='resize-none' value={text} onChange={(e) => setText(e.target.value)} />
              </div>
              
          </div>

          <div className='pt-5'>
            <button className='border border-black rounded-full px-5 py-2 hover:bg-black hover:text-white transition' type="button" onClick={handleSubmit}>
              Create Post
            </button>
          </div>
          
      </form>
      </div>
      </div>

      <div className='py-10 flex justify-center'>
        <div className='w-10/12'>
          <hr />
        </div>
      </div>

      <div className='flex justify-center'>
        <div className='w-11/12'>  
          <h2>Posts</h2>
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-11/12'>
          <ul className='grid grid-cols-2 gap-10'>
          {posts.map((post) => (
            <div key={post.id} className='border border-black rounded-2xl p-10 pb-5 my-5 flex justify-between'>
              <div className='flex'>
                <div className='pr-10'>
                  <img className='w-20' src="https://static.vecteezy.com/system/resources/thumbnails/002/387/693/small/user-profile-icon-free-vector.jpg" alt="" />
                </div>
                <div>
                  <p>user : {post.name}</p>
                  <br />
                  <p>Message : {post.text}</p>
                  <br />
                  <img src={post.image} alt="Image : Post" />
                </div>
              </div>
              <div>
                <button className='text-red-600 border border-red-600 rounded-md px-4 py-1 mt-5 flex hover:text-white hover:bg-red-600 transition' onClick={() => handleDelete(post.id)}>
                  <span className='pt-1 pr-2'><RiDeleteBin5Line /></span>Delete
                </button>
              </div>
            </div>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;