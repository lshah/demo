// function randomNumber(num) {
//   let el = document.getElementById('foo');
//   el.innerHTML = Math.floor(Math.random() * num);
// }
// randomNumber(5);

if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./serviceworkertest.js')
  .then(function(registration){
    console.log('Service Worker Registered');

  }).catch(function(err){
    console.log('Service Worker Registration failed', err);
  })
}

let imageRequest = new Request('https://lshah.github.io/images/abstract-art-1.jpg',{
  method: 'GET',
  mode: 'cors',
  // headers: new Headers({
  //   'Cache-Control': 'no-cache'
  // })
});

let img = document.getElementById('image');

fetch(imageRequest)
.then(response => response.blob())
.then(blob => {
  let imgURL = URL.createObjectURL(blob);
  console.log(imgURL)
  img.src = imgURL;
  img.alt = 'abstract-art';
})
.catch(error => console.error('Error', error))

// function downloadImage() {
//   fetch('https://lshah.github.io/images/art.jpg',
//     {mode: 'cors'})
//   .then(response => response.blob())
//   .then(blob => {
//         console.log(blob);
//         let imgURL = URL.createObjectURL(blob);
//         img1.src = imgURL;
//   });
// }
//
// downloadImage();
