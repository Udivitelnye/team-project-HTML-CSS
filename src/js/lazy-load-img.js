// const imgArray = document.querySelectorAll('img[data-lazy]');
// const options = {
//   rootMargin: "100px",
// //   threshold: [0.5],
// };

// const imgLazyLoadCallback = (entries, observer) => {
//   entries.forEach(entry => {
//       if (entry.isIntersecting) {
//           console.log(`sdf`);
//           const image = entry.target;
//           const src = image.dataset.lazy;
//           image.src = src;
//           image.removeAttribute('data-lazy');

//           const tagPictureRef = image.parentNode;
//           const arraySourceTags = tagPictureRef.querySelectorAll('source');
//           arraySourceTags.forEach(source => {
//               source.srcset = source.dataset.lazy;
//               source.removeAttribute('data-lazy');
//           });

//         if (image.hasAttribute('data-gallery')) {
//             image.style.transform = 'scale(1)';
//         }


//       observer.unobserve(image);
//     }
//   });
// };

// const ioImgLazyLoad = new IntersectionObserver(imgLazyLoadCallback, options);
// imgArray.forEach(img => ioImgLazyLoad.observe(img));

/* ------------------------------------------ */
/* -------------------вспливання для картинки галереї--------------- */
const imgGalleryRef = document.querySelector('[data-gallery]');

const options = {
  rootMargin: "0px",
//   threshold: [0.5],
};

const imgGalleryCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const image = entry.target;
      image.style.transform = 'scale(1)';
      observer.unobserve(entry.target);
    }
  });
};

const ioImgGallery = new IntersectionObserver(imgGalleryCallback, options);
ioImgGallery.observe(imgGalleryRef);