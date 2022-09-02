const loadCategories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data.news_category);
}

const displayNews = categories => {
    const categoryNav = document.getElementById('category-nav');
    categories.forEach(category => {
        console.log(category)
        const li = document.createElement('li');
        li.classList.add('nav-item');
        li.innerHTML = `
        <a class="nav-link">${category.category_name}</a>
        `
        categoryNav.appendChild(li);
    });
}

loadCategories();