const form = $('#search-form');
const searchField = $('#search-keyword');
const responseContainer = $('#response-container');
let searchedForText;

form.submit(function (e) {
  e.preventDefault();
  responseContainer.html('');
  searchedForText = searchField.val();
  getNews();
});

function getNews() {
  $.ajax({
    url:`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=45648ce845bb4678ba50c7ec3edb0ec7`
  }).done(addNews)
  .fail(handleError);
}

function handleError(){
  console.log('se ha presentado un error');
}

function addNews(news){
  const articles = news.response.docs;

  articles.forEach(function(article){
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = $('<li />').text(snippet);

    responseContainer.append(li);
  })
}
