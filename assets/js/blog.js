let config = {};

// Define fetchBlogPosts BEFORE it's called
function fetchBlogPosts() {
  const blogContainer = document.getElementById('blog-posts');
  const loadingIndicator = document.getElementById('loading');
  
  loadingIndicator.style.display = 'block';

  fetch(`${config}/blog/`)
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(json => {
      const blogPosts = json.data || [];
      loadingIndicator.style.display = 'none';
      renderBlogPosts(blogPosts);
    })
    .catch(error => {
      console.error('API fetch failed:', error);
      loadingIndicator.style.display = 'none';
    });
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function renderBlogPosts(blogPosts) {
  const blogContainer = document.getElementById('blog-posts');
  blogContainer.innerHTML = '';

  blogPosts.forEach(post => {
    const blogHTML = `
      <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
        <div class="card blog-item item-cyan position-relative">
          <div class="w-100 pb-0">
            <img src="${post.image}" class="img-fluid" alt="${post.title}">
          </div>
          <div>
            <h4 class="mt-3"><a href="${post.link}" target="_blank">${post.title}</a></h4>
            <p>${post.shortDesc || ''}</p>
            <p><strong>Date:</strong> ${formatDate(post.createdAt)}</p>
          </div>
          <a href="${post.link}" class="read-more" target="_blank">Read More <i class="bi bi-arrow-right"></i></a>
        </div>
      </div>
    `;
    blogContainer.innerHTML += blogHTML;
  });

  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// Fetch config and THEN call fetchBlogPosts
fetch('./assets/json/config.json')
  .then(res => res.json())
  .then(json => {
    config = json.configApi || {};
    console.log('Config Loaded:', config);
    fetchBlogPosts(); // Call here after defining
  })
  .catch(err => {
    console.error('Failed to load config:', err);
  });