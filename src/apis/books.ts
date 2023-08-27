import { cookies } from 'next/headers';

async function getBooks() {
  const _token = cookies().get('token')?.value;

  const res = await fetch(`http://81.71.98.176:3000/book/list`, {
    cache: 'no-store',
    headers: {
      Authorization: 'Bearer ' + _token,
    },
  });
  return res.json();
}

async function getBookDetail(id: string) {
  const _token = cookies().get('token')?.value;
  const res = await fetch(`http://81.71.98.176:3000/book/getBookById?id=${id}`, {
    cache: 'no-store',
    headers: {
      Authorization: 'Bearer ' + _token,
    },
  });
  return res.json();
}

async function getData() {
  const _token = cookies().get('token')?.value;
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/book?token=${_token}`, {
      cache: 'no-store',
    });
    if (!res) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  } catch (error) {}
}

export { getBookDetail, getBooks, getData };
