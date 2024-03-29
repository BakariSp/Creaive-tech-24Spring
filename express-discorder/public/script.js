document.addEventListener('DOMContentLoaded', (event) => {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');

    // Set the canvas size to the window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Resize the canvas when the window size changes
    window.addEventListener('resize', resizeCanvas);

    // Initial resize
    resizeCanvas();

    let imageData = []; // Array to hold data about the images

    // Function to fetch image URLs from the server
    function fetchImages() {
        fetch('/images')
          .then(response => response.json())
          .then(data => {
            if (Array.isArray(data.images)) {
              data.images.forEach(imageSrc => {
                url = imageSrc.url
                login = imageSrc.login
                loadImage(url, login); // Load and animate each image
              });
            } else {
              throw new Error('data.images is not an array');
            }
          })
          .catch(error => {
            console.error('Error fetching images:', error);
          });
      }
      
    

    // Function to create an image object and store its initial position and velocity
    function loadImage(src, login) {
        const img = new Image();
        // var login = '';
        img.src = src;
        img.onload = () => {
            const imageInfo = {
                img: img,
                login : login,
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 5, // Adjust speed as necessary
                vy: (Math.random() - 0.5) * 5
            };
            imageData.push(imageInfo);
            if (imageData.length === 1) {
                draw(); // Start the animation only if it's not already running
            }
        };
    }

    // Function to clear the canvas and redraw all images at their new positions
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        
    
        // First, draw lines between the centers of images
        ctx.beginPath(); // Begin a new path for the lines
        imageData.forEach((info, index) => {
            const scaleWidth = 50; // The scaled width
            const scaleHeight = (scaleWidth / info.img.naturalWidth) * info.img.naturalHeight; // The scaled height
    
            const centerX = info.x + scaleWidth / 2; // Calculate the center x of the current image
            const centerY = info.y + scaleHeight / 2; // Calculate the center y of the current image
    
            const nextInfo = imageData[(index + 1) % imageData.length]; // Get the next image (or loop back to the first)
            const nextScaleWidth = 50; // Next image scaled width
            const nextScaleHeight = (nextScaleWidth / nextInfo.img.naturalWidth) * nextInfo.img.naturalHeight; // Next image scaled height
    
            const nextCenterX = nextInfo.x + nextScaleWidth / 2; // Calculate the center x of the next image
            const nextCenterY = nextInfo.y + nextScaleHeight / 2; // Calculate the center y of the next image
    
            // Move to the center of the current image
            ctx.moveTo(centerX, centerY);
            // Draw a line to the center of the next image
            ctx.lineTo(nextCenterX, nextCenterY);
            // Draw login text below each image
            ctx.fillStyle = "white"; // Text color
            ctx.font = "14px Arial"; // Text size and font
            ctx.fillText(info.login, info.x, info.y + scaleHeight + 20); // Adjust positioning as needed
        });
        ctx.stroke(); // Stroke the path, drawing the lines
    
        // Then, draw the images at their updated positions
        imageData.forEach(info => {
            // Specify the desired width and height for scaling
            const scaleWidth = 50; // For example, scale to 50px width
            const scaleHeight = (scaleWidth / info.img.naturalWidth) * info.img.naturalHeight; // Scale height proportionally
    
            // Adjust position updates to account for scaled size
            if (info.x < 0 || info.x + scaleWidth > canvas.width) info.vx *= -1;
            if (info.y < 0 || info.y + scaleHeight > canvas.height) info.vy *= -1;
    
            // Update positions
            info.x += info.vx;
            info.y += info.vy;
    
            // Draw the image scaled to the width and height
            ctx.drawImage(info.img, info.x, info.y, scaleWidth, scaleHeight);
        });
    
        requestAnimationFrame(draw); // Keep animating
    }
    

    // Start the process
    fetchImages();
});
