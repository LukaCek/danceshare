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
        if (data['success']) {
            alert('File uploaded successfully!');
            window.location.href = '/home';
        } else {
            alert('File upload failed!');
        }
    })
    .catch(error => {
        console.error('Error:', error); // Handle errors
        loader.style.display = 'none'; // Hide the loader in case of error
    });
});

