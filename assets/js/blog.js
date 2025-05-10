/**
 * Blog functionality - Loads and displays blog posts from a JSON file
 */
document.addEventListener('DOMContentLoaded', function() {
  // Get the blog posts container and loading indicator
  const blogContainer = document.getElementById('blog-posts');
  const loadingIndicator = document.getElementById('loading');
  
  // Fallback data in case the JSON file cannot be loaded
  // const fallbackBlogData = [
  //   {
  //     title: "How to Prepare for a Medical Job Interview",
  //     description: "Discover the best strategies to stand out in your medical job interview. Learn about common questions, professional presentation tips, and how to demonstrate your clinical knowledge effectively.",
  //     image: "assets/img/blog/blog-1.jpg",
  //     link: "#",
  //     source: "The Medical Times",
  //     sourceLink: "https://medicaltimes.example.com"
  //   },
  //   {
  //     title: "Top CV Mistakes to Avoid in 2025",
  //     description: "Make sure your resume doesn't fall into these traps that could cost you job opportunities. Learn about modern CV best practices, ATS optimization, and how to highlight your skills effectively.",
  //     image: "assets/img/blog/blog-2.jpg",
  //     link: "#",
  //     source: "Instagram",
  //     sourceLink: "https://instagram.com/qroots_official"
  //   },
  //   {
  //     title: "Why Career Counseling Matters More Than Ever",
  //     description: "Career confusion is real. Learn how professional counseling helps navigate today's complex job market, adapt to industry changes, and find meaningful work that aligns with your values and skills.",
  //     image: "assets/img/blog/blog-3.jpg",
  //     link: "#",
  //     source: "Facebook",
  //     sourceLink: "https://facebook.com/qroots"
  //   }
  // ];
  
  function fetchBlogPosts() {
    // Try different paths that might work
    fetch('./assets/json/blogData.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Hide loading indicator
        loadingIndicator.style.display = 'none';
        
        // Render the blog posts
        renderBlogPosts(data);
      })
      .catch(error => {
        console.error('Error fetching blog data:', error);
        // Try alternative path
        fetch('./assets/data/blogdata.json')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
            
            // Render the blog posts
            renderBlogPosts(data);
          })
          .catch(altError => {
            console.error('Error fetching from alternative path:', altError);
            // Fall back to using the hardcoded data
            console.log('Using fallback data');
            // loadingIndicator.style.display = 'none';
            // renderBlogPosts(fallbackBlogData);
          });
      });
  }
  
  function renderBlogPosts(blogPosts) {
    blogContainer.innerHTML = '';
    
    blogPosts.forEach(post => {
      const blogHTML = `
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
          <div class="card blog-item item-cyan position-relative">
            <div class="w-100 pb-0">
              <img src="${post.image}" class="img-fluid" alt="${post.title}">
            </div>
            <div>
              <h4 class="mt-3"><a href="${post.link}">${post.title}</a></h4>
              <p>${post.description}</p><br>
              <p><strong>From:</strong> <a href="${post.sourceLink}" target="_blank">${post.source}</a></p>
            </div>
            <a href="${post.link}" class="read-more">Read More <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      `;
      blogContainer.innerHTML += blogHTML;
    });
    
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }
  }
  
  fetchBlogPosts();
});