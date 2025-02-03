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
    image : "https://i.pinimg.com/736x/3c/17/7d/3c177d6f67f54de1fac25ecc51c2f25a.jpg"
  },{
    author: "Immanuel Kant",
    link: "Immanuel Kant",
    image : "https://i.pinimg.com/736x/5a/2a/56/5a2a56950b1b4291eeef5d9c5aa69b0d.jpg"
  },
  {
    author: "Albert Camus",
    link: "Albert Camus",
    image : "https://i.pinimg.com/236x/f4/bd/7d/f4bd7d559473aad41816615e84fc89b6.jpg"
  },{
    author: "Beby Chaesara",
    link: "Beby Chaesara",
    image : "https://i.pinimg.com/236x/ff/b4/06/ffb406638074abc11396555ffa177cdb.jpg"
  }, {
    author: "F.Scott Fitzgerald",
    link: "F.Scott Fitzgerald",
    image : "https://i.pinimg.com/736x/a8/72/cb/a872cb2105099994c79fc02bf984ede9.jpg"
  }, {
    author: "Ayano Morio",
    link: "Ayano Morio",
        image : "https://i.pinimg.com/736x/0a/2f/68/0a2f68448ab64c7fb67e75ef410de163.jpg"
  }
  ]

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
    paginatedBooks,
 };
