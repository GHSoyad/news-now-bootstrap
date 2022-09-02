const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayCategoryList(data.data.news_category);
}

const displayCategoryList = categories => {
    const categoryNav = document.getElementById('category-nav');
    categories.forEach(category => {
        // console.log(category)
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
    console.log(categoryId)
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayNews(data.data, categoryName);
}

const displayNews = (news, categoryName) => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    const newsFound = document.getElementById('news-found');
    newsFound.innerHTML = `${news.length} news found in category <span class="text-primary">${categoryName}</span>`
    newsFound.classList.remove('d-none');

    news.forEach(eachNews => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');

        newsDiv.innerHTML = `
        <div class="card bg-white">
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
                                <i class="fa-solid fa-eye me-2 fs-5"></i>
                                <p class="fw-bold d-inline-block mb-0">${eachNews.total_view ? eachNews.total_view : '0'}</p>
                            </div>
                            <div id="open-modal" class="text-primary">
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


}