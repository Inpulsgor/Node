const http = require('http');

const server = http.createServer((request, response) => {
	// HTTP method
	// path params & query
	// request body
	// header

	const method = request.method;
	const path = request.url;
	const header = request.headers;

	let body = '';

	request.on('data', bodyChunk => {
		body += bodyChunk.toString();
		console.log(`bodyChunk`, bodyChunk)
	})

	request.on('end', () => {
		//body received
		console.log("request", request);
	})
})

server.listen(80, () => {
	console.log('Listening port', 80);
})
