const API_KEY = `wsJnhdSQwleAWFyqVj1SYb7FesssTc0gzz5kAuYEdpO280nMgBGbSwLT`;
const gallery = document.querySelector(".images");
const downloadImgBtn = document.querySelector(".uil-import");
const DiscoverMoreBtn = document.querySelector(".discover-more");
const searchInput = document.querySelector(".search-box input");
const singleImageView = document.querySelector('.single-img-viewer')
const closeBtn = document.querySelector('.uil-times')

let currentPage = 1;
const perPage = 15;
let query = null;

const downloadImg = (img) => {
  fetch(img)
    .then((res) => res.blob())
    .then((blob) => {
      console.log(blob);
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Downloading Failed"));
};

const loadMoreImages = () => {
  currentPage++;
  let apiUrl = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiUrl = query
    ? `https://api.pexels.com/v1/search?query=${query}&page=${currentPage}&per_page=${perPage}`
    : apiUrl;

  getImages(apiUrl);
};

const showSingleImg = (img,name) =>
{
  singleImageView.querySelector('img').src=img
singleImageView.querySelector('.photographer').innerText = name  
downloadImgBtn.setAttribute('data-img',img)
singleImageView.classList.add('show')
}


const singleImgViewerClose = () =>
{
  singleImageView.classList.remove('show')
}




const appendImages = (images) => {
  gallery.innerHTML += images
    .map(
      (img) =>
        `
        <li class="card"  >
        <img onclick="showSingleImg('${img.src.large2x}', '${img.photographer}')" src=${img.src.large2x} alt="" />

    
      </li>
        `
    )
    .join("");
};

const SearchImgByQuery = (e) => {
  if (e.target.value === "") return (query = null);

  if (e.key === "Enter") {
    currentPage = 1;
    query = e.target.value;
    gallery.innerHTML = "";
    getImages(
      `https://api.pexels.com/v1/search?query=${query}&page=1&per_page=${perPage}`
    );
  }
};

const getImages = async (url) => {
  const res = await fetch(url, {
    headers: { Authorization: API_KEY },
  });
  const data = await res.json();
  // return data.photos;

  appendImages(data.photos);
  console.log(data.photos);
};

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);

// downloadImgBtn.addEventListener("click", (e) =>
//   downloadImg(e.target.dataset.img)
// );
DiscoverMoreBtn.addEventListener("click", loadMoreImages);
closeBtn.addEventListener("click", singleImgViewerClose);
searchInput.addEventListener("keyup", SearchImgByQuery);
