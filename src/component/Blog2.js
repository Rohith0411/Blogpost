import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Blog2.css';

function Blog2() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', details: '', image:'' });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;


  const fetchBlogs = async () => {
    const res = await axios.get('http://localhost:3001/Details');
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`http://localhost:3001/Details/${editBlogId}`, formData);
    } else {
      await axios.post('http://localhost:3001/Details', formData);
    }
    setFormData({ title: '', description: '', details: '' });
    setShowForm(false);
    setIsEditing(false);
    fetchBlogs();
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setEditBlogId(blog.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/Details/${id}`);
    fetchBlogs();
  };

  const filtered = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, image: reader.result }));
        };
        reader.readAsDataURL(file);
}
};
  

  const handleNext = () => {
    if (currentPage * blogsPerPage < filtered.length)
        {
        setCurrentPage(currentPage + 1);
    }
};

const handlePrev = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

const startIndex = (currentPage - 1) * blogsPerPage;
const displayedBlogs = filtered.slice(startIndex, startIndex + blogsPerPage);


  return (
    <div className="blog2-container">
      <div className="nav-bar">
        <Link id="linkhome" to="/">Home</Link>
      </div>

      <div className="searchbox">
        <input
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-button" onClick={() => setShowForm(true)}>Add</button>
      </div>

      {showForm && (
        <div className="form-section">
          <form onSubmit={handleSubmit}>
            <label>Choose the image</label>
            <input type='file' accept='image' onChange={handleImageChange}/>
            <input name="title" placeholder="Title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            <input name="description" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <textarea name="details" placeholder="Details" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} />
            <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
            <button type="button" onClick={() => { setShowForm(false); setFormData({ title: '', description: '', details: '' }); }}>Cancel</button>
          </form>
        </div>
      )}

      <div className="blog-list">
      {displayedBlogs.length > 0 ? (
  displayedBlogs.map(blog => (
            <div key={blog.id} className="blog-card">
               {blog.image && <img src={blog.image} alt={blog.title} className="blog-image"/>} 
              <h2>{blog.title}</h2>
              <h4>{blog.description}</h4>
              <p>{blog.details}</p>
              <div className='btn-row'>
              <button id='edit' onClick={() => handleEdit(blog)}>Edit</button>
              <button id='delete' onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
            </div>
          ))
        ) : <p>No blogs found.</p>}
      </div>

      <div className="page">
                <button className="btn" onClick={handlePrev} disabled={currentPage === 1}>Previous</button>
                <button className="btn" onClick={handleNext} disabled={currentPage * blogsPerPage >= filtered.length}>Next</button>
            </div>
    </div>
  );
}

export default Blog2;
