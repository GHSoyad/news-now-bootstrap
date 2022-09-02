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
        <a onclick="loadNews('${category.category_id}')" class="nav-link">${category.category_name}</a>
        `
        categoryNav.appendChild(li);
    });
}

loadCategories();

const loadNews = async (categoryId) => {
    console.log(categoryId)
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    displayNews(data.data);
}

const displayNews = news => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    news.forEach(eachNews => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');

        newsDiv.innerHTML = `
        <div class="card">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${eachNews.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${eachNews.title}</h5>
                        <p class="card-text">${eachNews.details.slice(0, 180)}...</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsDiv);
    })


}