

        const accessKey = "jyhN8uUszrbgtdSJ9gUKkNrcgz0KRRejhistUBZQpEU";
        const searchform = document.getElementById("search-form");
        const searchBox = document.getElementById("search-box");
        const searchResult = document.getElementById("search-result");
        const searchMoreBtn = document.getElementById("show-more-btn");
        let keyword = "";
        let page = 1;

        async function searchImages() {
            keyword = searchBox.value;
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();

                if (data.results && Array.isArray(data.results)) {
                    const results = data.results;

                    results.map((result) => {
                        const image = document.createElement("img");
                        image.src = result.urls.small;
                        const imageLink = document.createElement("a");
                        imageLink.href = result.links.html;
                        imageLink.target = "_blank";

                        imageLink.appendChild(image);
                        searchResult.appendChild(imageLink);
                    });
                } else {
                    console.error('Unexpected API response format:', data);
                }
            } catch (error) {
                console.error('Error fetching or processing data:', error);
            }
        }

        searchform.addEventListener("submit", (e) => {
            e.preventDefault();
            page = 1;
            searchResult.innerHTML = ""; // Clear previous results
            searchImages();
        });

        searchMoreBtn.addEventListener("click", () => {
            page++;
            searchImages();
        });
