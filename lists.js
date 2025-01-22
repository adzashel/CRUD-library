// list
const category = [
    { list: "Fiction", link: "/fiction" },
    { list: "Philosophy", link: "/philosophy" },
    { list: "Biography", link: "/biography" },
    { list: "Self Improvement", link: "/self-improvement" },
    { list: "Manga", link: "/manga" },
  ];
  
  // author
  const authors = [{
    author: "Friedrich Nietzsche",
    link: "Friedrich Nietzsche",
  },{
    author: "Immanuel Kant",
    link: "Immanuel Kant",
  },
  {
    author: "Albert Camus",
    link: "Albert Camus",
  },{
    author: "Beby Chaesara",
    link: "Beby Chaesara",
  }, {
    author: "F.Scott Fitzgerald",
    link: "F.Scott Fitzgerald",
  }, {
    author: "Ayano Morio",
    link: "Ayano Morio",
  }
   
  ]


//functon to call the database
const filteredBooksByCategory = async (query, genre) => {
  try {
    const books = await User.find(query);
    return books.filter((book) => book.genre === genre);
  } catch (e) {
    console.error(e);
  }
};

// load more books
const itemsPerPage = 12;

const paginatedBooks = async (model , req ) => {
  const pagination =   req.query.page;
  let page = parseInt(pagination) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const lastIndex = startIndex + itemsPerPage;
 
  try {
    const booksData = await model.find();
    const pageData = booksData.slice(startIndex, lastIndex);
    const hasLoadPage = lastIndex < booksData.length;

    return { data : pageData , hasLoadPage , page}
  }catch(e) {
    console.error(e);
    return { data: [], hasLoadPage: false }
  }
}



export default  {
    category,
    authors,
    filteredBooksByCategory,
    paginatedBooks,
 };
