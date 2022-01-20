// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default async function (req, res) {
	const pageSize = 6;

	const url = await fetch(
		`https://newsapi.org/v2/top-headlines?country=jp&page=${
			index + 1
		}&pageSize=3&&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY}`
	);

	const data = await url.json();

	// console.log(data);

	res.status(200).json({ data });
}
