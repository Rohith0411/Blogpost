import { Link } from 'react-router-dom';


function Blog() {
  return (
    <div>
      <nav className="navbar">
        <h4>Rohith A</h4>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/blog2" style={{marginRight:'10px'}}>My Blog</Link>
        </div>
      </nav>

      <div className="content-1">
        <p className="intro-paragraph">
        I am a recent B.Tech graduate in Information Technology with a strong foundation
          in software development and a keen interest in building modern web applications. 
          I have completed a full-stack development course, where I gained hands-on experience
          in technologies such as HTML, CSS, JavaScript, React, Node.js and pega. As a passionate
          learner and a dedicated team player, I am actively seeking opportunities to begin my career
          in a dynamic organization where I can contribute, grow, and continue learning.
        </p>
      </div>
    </div>
  );
}

export default Blog;
