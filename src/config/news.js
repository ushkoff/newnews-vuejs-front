export default {
  //
  // News Confirmation logic
  //
  // If news have more than that number (and that) then it will be signed as confirmed
  minConfirmedNewsRating: process.env.VUE_APP_MIN_CONFIRMED_NEWS_RATING, 
  // if news have less than that number (and that) then it will be signed as wrong
  minWrongNewsRatingAbsValue: process.env.VUE_APP_MIN_WRONG_NEWS_RATING, 
  
  //
  // News settings
  //
  maxArticleTitle: process.env.VUE_APP_MAX_ARTICLE_TITLE, // max number of characters in the title
  maxArticleContent: process.env.VUE_APP_MAX_ARTICLE_CONTENT, //nax  number of characters in the article body
  maxArticleRefs: process.env.VUE_APP_MAX_ARTICLE_REFS, // max number of characters in the field of article references (links)
  articlesPerPage: process.env.VUE_APP_ARTICLES_PER_PAGE, // max number of news records per news page

  // Home page
  latestNewsNumberOnHomePage: 12, // for "Latest news" block
  randomCategoryNewsNumberOnHomePage: 5, // for "Randpm category & Category list" block

  // "Your news" settings
  yourNewsNumberOnAddNewsPage: 5, // for "Your news" block
  // yourConfirmedNewsNumberOnAddNewsPage: 5,
  interestingNewsNumberInSidebar: 5 // for "May be interesting" sidebar block
}
