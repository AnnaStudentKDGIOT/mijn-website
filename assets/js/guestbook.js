const POSTS_PER_PAGE = 5;
let posts = JSON.parse(localStorage.getItem("guestbookPosts")) || [];
let currentPage = 1;

// DOM Elements
const form = document.getElementById("guestbookForm");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const editIndexInput = document.getElementById("editIndex");
const messageBoard = document.getElementById("messageBoard");
const submitBtn = document.getElementById("submitBtn");
const sortSelect = document.getElementById("sortSelect");
const filterInput = document.getElementById("filterInput");
const pagination = document.getElementById("pagination");
const feedback = document.getElementById("feedback");

// Utility Functions
const savePosts = () => {
  localStorage.setItem("guestbookPosts", JSON.stringify(posts));
};

const safeText = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

const highlight = (text, term) => {
  if (!term) return safeText(text);
  const regex = new RegExp(`(${term})`, "gi");
  return safeText(text).replace(regex, `<mark>$1</mark>`);
};

const createPostElement = (post, filter = "") => {
  const div = document.createElement("div");
  div.className = "card mb-3";
  div.innerHTML = `
    <div class="card-body">
      <h5 class="card-title">${highlight(post.name, filter)}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${safeText(post.timestamp)}</h6>
      <p class="card-text">${safeText(post.message)}</p>
      <button class="btn btn-sm btn-warning me-2" onclick="editPost(${posts.indexOf(post)})">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="deletePost(${posts.indexOf(post)})">Delete</button>
    </div>
  `;
  return div;
};

// Render Posts
const renderPosts = () => {
  const sortOrder = sortSelect.value;
  const filter = filterInput.value.toLowerCase();

  let displayPosts = posts.filter(p => p.name.toLowerCase().includes(filter));
  if (sortOrder === "newest") displayPosts.reverse();

  const totalPages = Math.ceil(displayPosts.length / POSTS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = displayPosts.slice(start, start + POSTS_PER_PAGE);

  messageBoard.innerHTML = "";
  paginatedPosts.forEach(post => {
    const postElement = createPostElement(post, filter);
    messageBoard.appendChild(postElement);
  });

  // Pagination
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    li.className = "page-item" + (i === currentPage ? " active" : "");
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = i;
      renderPosts();
    });
    pagination.appendChild(li);
  }
};

// Event Listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();
  const editIndex = editIndexInput.value;

  if (name && message) {
    const timestamp = new Date().toLocaleString();

    if (editIndex === "") {
      posts.push({ name, message, timestamp });
    } else {
      posts[editIndex].name = name;
      posts[editIndex].message = message;
      posts[editIndex].timestamp = `${timestamp} (edited)`;
      editIndexInput.value = "";
      submitBtn.textContent = "Post Message";
    }

    savePosts();
    renderPosts();
    form.reset();

    // Show feedback
    feedback.classList.remove("d-none");
    feedback.textContent = editIndex === "" ? "Message posted successfully!" : "Message updated!";
    setTimeout(() => feedback.classList.add("d-none"), 3000);
  }
});

window.editPost = function(index) {
  if (confirm("Do you want to edit this post?")) {
    const post = posts[index];
    nameInput.value = post.name;
    messageInput.value = post.message;
    editIndexInput.value = index;
    submitBtn.textContent = "Update Message";
  }
};

window.deletePost = function(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
};

sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderPosts();
});

filterInput.addEventListener("input", () => {
  currentPage = 1;
  renderPosts();
});

// Init
renderPosts();
