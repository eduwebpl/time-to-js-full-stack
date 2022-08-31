import http from 'http'

const { PORT = 3000 } = process.env

const server = http.createServer((req, res) => {

	console.log(req.url)
	console.log(req.method)
	console.log(req.headers)

	res.writeHead(200, {'Content-Type': 'application/json'})
	res.write(JSON.stringify({ hello: 'World' }))
	res.end()
})

server.listen(PORT)
server.on('listening', () => {
	console.log(`Server is listening on http://localhost:${PORT}/`)
})
