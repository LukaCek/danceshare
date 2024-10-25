document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var loader = document.getElementById('loader'); // Get the loader element
    loader.style.display = 'block'; // Show the loader

    let formData = new FormData(this); // Create FormData object

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Handle the response data
        loader.style.display = 'none'; // Hide the loader when file is uploaded

        if (data.error) {
            alert(data.error); // Display error message if any
        } else {
            alert('Video uploaded successfully!'); // Display success message
        }
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
        loader.style.display = 'none'; // Hide the loader in case of error
    });
    
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (e) => {
      const percent = (e.loaded / e.total) * 100;
      console.log(`Uploaded: ${percent}%`);
      progressBar.style.width = `${percent}%`;
      progressBar.textContent = `${percent}%`;

      // add progress bar
    });
    xhr.open('POST', '/upload', true);
    xhr.send(formData);
});

