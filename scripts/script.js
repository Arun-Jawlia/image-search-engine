const API_KEY = `wsJnhdSQwleAWFyqVj1SYb7FesssTc0gzz5kAuYEdpO280nMgBGbSwLT`;
let currentPage = 1;
const perPage = 15;
let searchInput = null;


const appendImages = (images)=>
{
    images.map(img=> 
        `
        `)
}








const getImages = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // return data.photos;

    appendImages(data.photos)
    // console.log(data.photos)
  } catch (err) {
    alert("Failed to load images");
  }
};




getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);
