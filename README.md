<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Galactic Memories</title>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/styles.css"> <!-- Adjusted path -->
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            color: white;
            background: url('https://myastrology.com/wp-content/uploads/2023/06/planets-of-the-solar-system-1.jpg') no-repeat center center fixed; /* Space background image */
            background-size: cover;
        }

        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.7); /* Semi-transparent background for header */
            padding: 20px;
            text-align: center;
            z-index: 1000; /* Ensure header is above other content */
            transition: top 0.3s; /* Smooth transition for header */
        }

        nav ul {
            list-style: none;
            padding: 0;
        }

        nav ul li {
            display: inline;
            margin: 0 15px;
        }

        nav ul li a {
            color: #ffffff;
            text-decoration: none;
        }

        h1 {
            color: white; /* Change title color to white */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Text shadow for better readability */
        }

        .toggle-button {
            position: fixed;
            top: 20px;
            left: 20px;
            background-color: yellow; /* Yellow sun button */
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            z-index: 1001; /* Ensure button is above other content */
        }

        .black-box {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: black;
            color: white;
            text-align: center;
            padding: 10px;
            display: none; /* Initially hide the black box */
        }

        main {
            padding: 100px 20px 20px; /* Add padding to avoid content being hidden behind the fixed header */
        }

        p {
            margin: 20px 0; /* Add margin for better spacing */
        }

        h2 {
            margin-top: 40px; /* Add margin for section titles */
        }

        /* Additional styles for better layout */
        .feature {
            margin: 20px 0;
            padding: 15px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
        }

        .admin-prompt {
            display: none; /* Initially hide the admin prompt */
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            z-index: 1002; /* Ensure prompt is above other content */
        }

        .admin-prompt input {
            padding: 10px;
            margin-top: 10px;
            width: 100%;
        }

        .admin-prompt button {
            margin-top: 10px;
            padding: 10px;
            background-color: yellow;
            border: none;
            cursor: pointer;
        }

        /* Albums Section */
        .albums-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
            padding: 20px;
        }

        .album-item {
            background: rgba(0, 0, 0, 0.7);
            border-radius: 8px;
            overflow: hidden;
            position: relative; /* Required for overlay positioning */
        }

        .album-cover img {
            width: 100%;
            height: auto;
            display
                        display: block;
        }

        .album-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 1.2em;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .album-item:hover .album-overlay {
            opacity: 1;
        }
    </style>
</head>
<body>
    <button class="toggle-button" onclick="toggleBlackBox()">☀️</button> <!-- Yellow sun button -->
    
    <header id="header">
        <h1 id="title">Galactic Memories</h1>
        <nav>
            <ul>
                <li><a href="#" onclick="showSection('home')">Home</a></li>
                <li><a href="#" onclick="showSection('albums')">Albums</a></li>
                <li><a href="photos.html">Photos</a></li>
                <li><a href="account.html">Account</a></li>
                <li><a href="upload.html">Upload</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <!-- Home Section -->
        <section id="home" class="home-section">
            <h2>Description</h2>
            <p>Galactic Memories is an innovative web application designed to help users effortlessly create, manage, and share their photo albums. The platform serves as a digital scrapbook, allowing users to store and organize their cherished memories in a visually appealing and user-friendly environment.</p>
            <p>Upon entering the site, users are greeted with a stunning cosmic-themed background that sets the tone for a journey through their personal memories. The interface is clean and intuitive, making navigation simple for users of all ages.</p>
            <!-- Additional content can be added here -->
        </section>

        <!-- Albums Section -->
        <section id="albums" class="albums-grid" style="display: none;">
            <div class="album-item">
                <div class="album-cover">
                    <img src="https://source.unsplash.com/random/400x400/?galaxy" alt="Galaxies Album">
                    <div class="album-overlay"><span>42 photos</span></div>
                </div>
                <div class="album-info">
                    <h3>Galaxies</h3>
                    <p>A collection of spiral and elliptical galaxies</p>
                </div>
            </div>
            <div class="album-item">
                <div class="album-cover">
                    <img src="https://source.unsplash.com/random/400x400/?nebula" alt="Nebula Album">
                    <div class="album-overlay"><span>30 photos</span></div>
                </div>
                <div class="album-info">
                    <h3>Nebulae</h3>
                    <p>Beautiful images of various nebulae</p>
                </div>
            </div>
            <!-- Add more album items as needed -->
        </section>

        <div class="admin-prompt" id="adminPrompt">
            <h3>Admin Access</h3>
            <p>Please enter the admin password to access other users' galleries:</p>
            <input type="password" id="adminPassword" placeholder="Enter password">
            <button onclick="checkAdminPassword()">Submit</button>
            <button onclick="closeAdminPrompt()">Cancel</button>
        </div>

        <div class="black-box" id="blackBox">
            <p>Made by Daddy</p>
        </div>
    </main>

    <script>
        let lastScrollTop = 0;
        const header = document.getElementById("header");
        const blackBox = document.getElementById("blackBox");
        const adminPrompt = document.getElementById("adminPrompt");

        window.addEventListener("scroll", function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.top = "-100px"; // Hide header
                blackBox.style.display = "none"; // Hide black box
            } else {
                // Scrolling up
                header.style.top = "0"; // Show header
                if (blackBox.style.display === "block") {
                    blackBox.style.display = "block"; // Keep black box visible
                }
                       lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
        });

        function toggleBlackBox() {
            if (blackBox.style.display === "none" || blackBox.style.display === "") {
                blackBox.style.display = "block"; // Show black box
            } else {
                blackBox.style.display = "none"; // Hide black box
            }
        }

        blackBox.addEventListener("click", function() {
            adminPrompt.style.display = "block"; // Show admin prompt on black box click
        });

        function checkAdminPassword() {
            const password = document.getElementById("adminPassword").value;
            if (password === "admin123") {
                window.location.href = "https://galacticmemories.github.io/Galactic-Memories/user-galleries.html"; // Redirect to user galleries
            } else {
                alert("Incorrect password. Please try again.");
            }
        }

        function closeAdminPrompt() {
            adminPrompt.style.display = "none"; // Hide admin prompt
        }

        function showSection(section) {
            const homeSection = document.getElementById("home");
            const albumsSection = document.getElementById("albums");

            if (section === 'home') {
                homeSection.style.display = 'block';
                albumsSection.style.display = 'none';
            } else if (section === 'albums') {
                homeSection.style.display = 'none';
                albumsSection.style.display = 'grid'; // Use grid display for albums
            }
        }

        // Mobile prompt for gallery copy
        if (window.innerWidth <= 768) {
            alert("Please make a copy of your gallery for better accessibility on mobile devices.");
        }
    </script>
</body>
</html>
