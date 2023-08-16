async function getBooks() {
  const res = await fetch(`http://81.71.98.176:3000/book/list`);
  return res.json();
}

async function getBookDetail(id: string) {
  const res = await fetch(`http://81.71.98.176:3000/book/getBookById?id=${id}`);
  return res.json();
}

export { getBookDetail, getBooks };
