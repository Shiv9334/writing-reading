const http = require('http');
const fs = require('fs');
const file = fs.readFileSync('message.txt');

const server = http.createServer( (req, res) => {

    let method = req.method;
    const url = req.url;

    if(url === '/'){
        res.setHeader('Content-Type' , 'text/html');
        res.write('<html>');
        res.write('<head><title>this is my first server</title></head>');
        res.write('<body><form action ="/message" method ="POST"><input type="text" name="message"><button type ="submit">send</button></input></form></body')
        res.write('<h1>Welcome to my Node Js Project!</h1>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST'){
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            let parsebody = Buffer.concat(body).toString();
            let mes = parsebody.split( '=' )[1];
            fs.writeFileSync('message.txt', mes, (err) => {
                console.log(err);
            })
            res.statusCode = 302;
            res.setHeader = ('location', '/');
            return res.end();
        });
    }
});

server.listen(4000);