const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoryList(data.data.news_category);
    } catch (error) {
        console.log(error);
    }
}

const displayCategoryList = categories => {
    const categoryNav = document.getElementById('category-nav');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <a onclick="loadNews('${category.category_id}', '${category.category_name}')" class="nav-link">${category.category_name}</a>
        `
        categoryNav.appendChild(li);
    });
}

loadCategories();

const loadNews = async (categoryId, categoryName) => {
    displayLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data, categoryName);
    } catch (error) {
        console.log(error);
    }
}

const displayNews = (news, categoryName) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const noNewsFound = document.getElementById('no-news-found-message');
    if (news.length === 0) {
        noNewsFound.classList.remove('d-none');
        noNewsFound.innerHTML = `<p>No News Found in ${categoryName}</p>`
    } else {
        noNewsFound.classList.add('d-none');
    }

    const newsFound = document.getElementById('news-found');
    newsFound.innerHTML = `${news.length} news found in category <span class="text-primary">${categoryName}</span>`
    newsFound.classList.remove('d-none');

    news = news.sort((a, b) => b.total_view - a.total_view);

    news.forEach(eachNews => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');

        newsDiv.innerHTML = `
        <div class="card bg-white h-100">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${eachNews.thumbnail_url}" class="img-fluid rounded w-100 h-100" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body h-100 d-flex flex-column justify-content-between">
                        <h5 class="card-title">${eachNews.title}</h5>
                        <p class="card-text">${eachNews.details.slice(0, 180)}...</p>
                        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div class="author-info d-flex">
                                <div>
                                   <img src="${eachNews.author.img}" class="img-fluid" alt="">
                                </div>
                                <div>
                                    <p class="fw-bold">${eachNews.author.name ? eachNews.author.name : 'No Author'}</p>
                                    <p>${eachNews.author.published_date ? eachNews.author.published_date : 'No publish date'}</p>
                                </div>
                            </div>
                            <div class="text-primary">
                                <i class="fa-solid fa-eye me-1 fs-5"></i>
                                <p class="fw-bold d-inline-block mb-0">${eachNews.total_view ? eachNews.total_view : '0'}</p>
                            </div>
                            <div onclick="openNewsModal('${eachNews._id}')" class="text-primary openModal" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
                                <i class="fa-solid fa-arrow-right fs-4"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsDiv);
    })
    displayLoader(false);
}

const openNewsModal = async (newsId) => {
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsModal(data.data[0]);
    } catch (error) {
        console.log(error);
    }
}

const displayNewsModal = news => {
    console.log(news)
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = news.title;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
    <div class="d-flex justify-content-between gap-2">
        <div>
            <p class="mb-1"><span class="fw-bold">Author:</span> ${news.author.name ? news.author.name : 'Anonymous'}</p>
            <p><span class="fw-bold">Date Published:</span> ${news.author.published_date ? news.author.published_date : 'Publish date not found'}</p>
        </div>
        <div>
            <p><span class="fw-bold">Total Views:</span> ${news.total_view ? news.total_view : 'No views'}</p>
        </div>
    </div>
    <p><span class="fw-bold">Description:</span> ${news.details ? news.details : 'Details not found'}</p>
    `
    const modalRating = document.getElementById('modal-rating');
    modalRating.innerHTML = `
    <p class="mb-0"><span class="fw-bold">Rating:</span> ${news.rating.number ? news.rating.number : 'No rating found'} <span class="badge bg-primary ms-2">${news.rating.badge ? news.rating.badge : 'No badge'}</span>
</p>
    `
}


const displayLoader = isTrue => {
    const newsLoader = document.getElementById('news-loader');
    if (isTrue) {
        newsLoader.classList.remove('d-none');
    } else {
        newsLoader.classList.add('d-none');
    }
}