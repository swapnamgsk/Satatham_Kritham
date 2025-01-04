const menuIcon = document.getElementById('menu-icon');
const cancelIcon = document.getElementById('cancel-icon');
const navLinks = document.getElementById('nav-links');

// Show the menu when the hamburger icon is clicked
menuIcon.addEventListener('click', () => {
  navLinks.classList.add('show');
  menuIcon.style.display = 'none';
  cancelIcon.style.display = 'block';
});

// Hide the menu when the cancel icon is clicked
cancelIcon.addEventListener('click', () => {
  navLinks.classList.remove('show');
  menuIcon.style.display = 'block';
  cancelIcon.style.display = 'none';
});

// testimonials
// const wrapper = document.querySelector(".testimonial-wrapper");
// let currentIndex = 0;

// function slideLeft() {
//   const totalSlides = document.querySelectorAll(".testimonial").length / 2; // Total sets of 2 divs
//   currentIndex = (currentIndex - 1 + totalSlides) % totalSlides; // Loop back to the last set
//   updateSlider();
// }

// function slideRight() {
//   const totalSlides = document.querySelectorAll(".testimonial").length / 2; // Total sets of 2 divs
//   currentIndex = (currentIndex + 1) % totalSlides; // Loop back to the first set
//   updateSlider();
// }

// function updateSlider() {
//     const offset = currentIndex * 100; // Each set is 100% of the wrapper
//     wrapper.style.transform = `translateX(-${offset}%)`; // Use backticks for template literal
//   }
const wrapper = document.getElementById('testimonialWrapper');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = document.querySelectorAll('.testimonial').length;
    let currentIndex = 0;

    function updateSlidePosition() {
      wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots();
    }

    function nextSlide() {
      if (currentIndex < totalSlides - 1) {
        currentIndex++;
        updateSlidePosition();
      }
    }

    function prevSlide() {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
      }
    }

    function goToSlide(index) {
      currentIndex = index;
      updateSlidePosition();
    }

    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }


// function closeDisclaimer() {
//   // Hide the popup
//   document.getElementById('disclaimer-popup').style.display = 'none';
//   // Show the main content
//   document.getElementById('main-content').style.display = 'none';
//   // Allow scrolling
//   document.body.classList.remove('no-scroll');
// }




function closeDisclaimer() {
  localStorage.setItem('disclaimerAccepted', 'true'); // Save to localStorage
  document.getElementById('disclaimer-popup').style.display = 'none'; // Hide the popup
  document.getElementById('main-content').style.display = 'block'; // Show the main content
  document.body.classList.remove('no-scroll'); // Allow scrolling
}

// Check localStorage on page load
window.onload = function () {
  const disclaimerAccepted = localStorage.getItem('disclaimerAccepted');

  if (disclaimerAccepted === 'true') {
      // If the disclaimer is already accepted, show the main content
      // document.getElementById('main-content').style.display = 'none';
      // document.body.classList.remove('no-scroll');
  } else {
      // If not accepted, show the disclaimer
      document.getElementById('disclaimer-popup').style.display = 'flex';
     
  }
};

// contact us
const scriptURL = 'https://script.google.com/macros/s/AKfycbwZM3Zz4qc-ki6-QwRHWmn5ivm8bzcGOewPtOLdGA0u-cNQW0ZjrIjEcKSarVlNeQUB/exec';  // Replace with your script URL
const form = document.forms['submit-to-google-sheet'];
const successMessage = document.getElementById('success');  // Success message element

form.addEventListener('submit', e => {
    e.preventDefault(); // Prevent default form submission behavior

    // Show the success message immediately after the submit button is clicked
    successMessage.style.display = 'block';

    // Send form data to the Google Apps Script
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form) 
    })
    .then(response => response.json())  // Parse the JSON response
    .then(data => {
        console.log('Success!', data);

        if (data.result === 'success') {
            // If the result is 'success', hide the success message after 2 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
                // Reset the form (clear the input fields)
                form.reset();
            }, 2000); // Hides after 2 seconds
        } else {
            console.error('Error!', data.error);  // Log the error if any
        }
    })
   
});



    // blogs

    async function fetchMediumBlogs() {
      const blogContainer = document.getElementById('blog-container');
      blogContainer.innerHTML = '<p>Loading blogs...</p>';

      const dummyBlogImages = [
        './images/web1.jpeg',
        './images/web2.jpeg',
        './images/web3.jpeg',
        './images/web4.jpeg',
        './images/web5.jpeg',
        './images/web6.jpeg',
      ];

      const dummyAuthorImages = [
        './images/profile-img.png',
        './images/profile-img.png',
        './images/profile-img.png',
        './images/profile-img.png',
        './images/profile-img.png',
        './images/profile-img.png',
      ];

      try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/tag/web-development');
        const data = await response.json();

        if (data.items && data.items.length > 0) {
          blogContainer.innerHTML = '';

          data.items.slice(0, 6).forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('blog-card');

            // Use dummy images if no thumbnail is available
            const blogImageUrl = post.thumbnail || dummyBlogImages[index % dummyBlogImages.length];
            const authorImageUrl = dummyAuthorImages[index % dummyAuthorImages.length];

            postElement.innerHTML = `
              <img src="${blogImageUrl}" alt="Blog Image" class="blog-image">
              <div class="blog-content">
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-meta">
                  <img src="${authorImageUrl}" alt="Author">
                  ${post.author} • ${new Date(post.pubDate).toDateString()}
                </p>
                <a href="${post.link}" target="_blank" class="blog-link">Read more &rarr;</a>
              </div>
            `;

            blogContainer.appendChild(postElement);
          });
        } else {
          blogContainer.innerHTML = '<p>No blogs found.</p>';
        }
      } catch (error) {
        console.error('Error fetching Medium blogs:', error);
        blogContainer.innerHTML = '<p>Failed to load blogs. Please try again later.</p>';
      }
    }

    fetchMediumBlogs();