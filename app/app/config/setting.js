const devMode = __DEV__;
const baseUrl = devMode
  ? "http://192.168.1.92:3000/v1/"
  : "https://dev-api.reanlotheapp.com/v1/";

// hard: http://192.168.1.89:3000/v1/
// Mayur: http://192.168.1.85:8000/v1/

const BaseSetting = {
  name: "reanlo",
  displayName: "reanlo",
  appVersionCode: "1",
  // bugsnagApiKey: '',
  baseUrl,
  api: `${baseUrl}`,
  shareEndPoint: baseUrl,
  // socketURL: "http://192.168.2.111:2898/", // local ip
  // socketURL: 'http://3.129.72.74:3000//', // server domain
  timeOut: 30000,
  googleClientId:
    "588344325994-494a2p5a5fh3kanlcnndquj9re17o28s.apps.googleusercontent.com",
  azureClientId: "3f8740db-a677-42d6-9376-2dfd6ddf4a29",
  azureTenantId: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",
  redirectURI: "msauth://com.reanlo/Hb7K9ENlJuQs5cdccW5o86X%2B6lk%3D",
  firebaseServerKey:
    "AAAAiPwN92o:APA91bGLoSHhxZaSUNasdXGUif6cpB69bM1TDROqGCSKD9bsYnZXUndn0N9eMmKDzw1duv02XQfp7KI1prNJekQEsTwy_kEdYVDeYKpj2h6w3R5LG4LihSlQc7Qv24w1sJYqymeFy9B5",

  JS_Regex: {
    email_Regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    urlRegex: /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/,
    numberRegex: /[^0-9]/g,
    space: /\s+/g,
  },

  endpoints: {
    // login & registration
    login: "user/login",
    createUer: "user/add-user",
    socialSignUp: "user/social-signup",

    generateOtp: "user/generate-otp",
    verifyOtp: "user/verify-otp",
    resetPassword: "user/reset-password",

    // cms
    getCms: "cms/get",
    faq: "faq/list",
    createContactUs: "contact-us/create",

    // intro
    getIntroData: "admin/get-images",

    // genre data
    getGenre: "genre/get-list",
    getSubGenre: "genre/fav-genres",
    addFavGenre: "genre/add-fav-genre",

    //user
    updateProfile: "user/update-profile",
    checkUsername: "user/check-username",
    checkUsernameAfterLogin: "user/check-username-after-login",
    changePassword: "user/change-password",
    userDelete: "user/delete",
    changeNotificationStatus: "user/change-notification-status",
    userProfile: "user/get-user",
    logOut: "user/logout",

    // social acc
    addSocialAcc: "user/add-social-acc",
    removeSocialScc: "user/remove-social-acc",
    getSocialAcc: "user/get-social-acc",
    addRecommendation: "user/add-user-recommandation",
    getRecommendation: "user/get-user-recommandation",

    //reading goal
    addUserGoal: "user/add-user-goal",
    getReadCount: "shelf/readed-books",
    redingStatistic: "book/reding-statistic",
    ratingBookList: "book/rating-book-list",
    clubRequest: "book/club-request",

    //books
    getBooks: "book/get-books",
    addBook: "book/add-one",
    uploadCSV: "book/upload-csv",
    clubList: "author/club-post-list",
    clubCreatePost: "author/create-post",
    addClubLike: "author/club-post-like",
    addClubComment: "author/club-post-comment",
    updateBookDetails: "book/update-count",
    clubCommentList: "author/club-comment-list",

    //Author
    userFavAuthor: "author/user-fav-author-list",
    favAuthor: "author/list-fav-author",
    addFavAuthor: "author/add-one-fav-author",
    authorToFollowList: "user/authors-list",
    becomeAuthor: "author/create",
    authorGenre: "author/author-genre",
    authorBooks: "author/author-books",
    sendRequest: "author/send-request",

    // accounts to follow
    accToFollowList: "user/users-list",
    accFollow: "follow/user",
    updateScreen: "follow/update-screen",
    getFollowers: "follow/followers",
    getFollowing: "follow/followings",
    allUser: "user/list",
    getFollowerFollowing: "follow/follower-following",

    // dashboard
    createPostApi: "post/create",
    myPosts: "post/user-posts",
    report: "post/report",

    // home screen
    // feedList: "feed/list",
    feedList: "feed/feed-list",
    addLike: "post/add-like",
    addComment: "post/add-comment",
    getCommentList: "post/comment-list",
    deletePost: "post/delete-post",

    // notification
    notificationList: "notification/get-all",
    test: "notification/test-noti",
    readSingleNotification: "notification/read-single",
    singleRemove: "notification/remove",
    removeAll: "notification/remove-all",

    // other
    advertiseList: "advertise/list",

    // shelf & MyBooks
    shelfList: "shelf/list",
    allShelfBooks: "shelf/all",
    addShelf: "shelf/create",
    addBooksShelf: "shelf/add-book",
    deleteShelf: "shelf/delete",
    getShelfOne: "shelf/one",
    allBooks: "book/list",
    updateBookProgress: "shelf/update-book-progress",
    addRating: "book-ratings/add",
    ratingList: "book-ratings/list",
    popularShelf: "shelf/popular-shelf",
    similarBookList: "book/similar-list",
    seriesData: "book/series-data",
    shareUpdate: "feed/share",

    // tags
    addTag: "tag/create",
    tagsList: "tag/list",
    deleteTag: "tag/delete",
    bookTag: "tag/book-tag",
    popularTags: "tag/popular-tags",

    //discover
    discover: "discover/list",
    viewAll: "discover/view-all",
    addTrendingBook: "book/add-trending",
  },
};

export default BaseSetting;
