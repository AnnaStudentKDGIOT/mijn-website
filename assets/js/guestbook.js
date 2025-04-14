const POSTS_PER_PAGE = 5;
let posts = JSON.parse(localStorage.getItem("guestbookPosts")) || [];
let currentPage = 1;

const form = document.getElementById("guestbookForm");
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const editIndexInput = document.getElementById("editIndex");
const messageBoard = document.getElementById("messageBoard");
const submitBtn = document.getElementById("submitBtn");
const sortSelect = document.getElementById("sortSelect");
const filterInput = document.getElementById("filterInput");
const pagination = document.getElementById("pagination");

function savePosts() {
  localStorage.setItem("guestbookPosts", JSON.stringify(posts));
}

function renderPosts() {
  const sortOrder = sortSelect.value;
  const filter = filterInput.value.toLowerCase();

  let displayPosts = posts.filter(p =>
    p.name.toLowerCase().includes(filter)
  );

  if (sortOrder === "newest") {
    displayPosts.reverse();
  }

  const totalPages = Math.ceil(displayPosts.length / POSTS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = displayPosts.slice(start, start + POSTS_PER_PAGE);

  // Clear and render posts
  messageBoard.innerHTML = "";
  paginatedPosts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "forum-post";
    div.innerHTML = `
      <h5>${post.name}</h5>
      <div class="timestamp">${post.timestamp}</div>
      <p>${post.message}</p>
      <button class="btn btn-sm btn-warning" onclick="editPost(${posts.indexOf(post)})">Edit</button>
      <button class="btn btn-sm btn-danger" onclick="deletePost(${posts.indexOf(post)})">Delete</button>
    `;
    messageBoard.appendChild(div);
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
}

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
  }
});

window.editPost = function(index) {
  const post = posts[index];
  nameInput.value = post.name;
  messageInput.value = post.message;
  editIndexInput.value = index;
  submitBtn.textContent = "Update Message";
};

window.deletePost = function(index) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
  }
};

// Filters & Sorters
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