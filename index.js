const http = require('http');
const fs = require('fs');
const file = fs.readFileSync('message.txt');

const server = http.createServer( (req, res) => {

    let method = req.method;
    const url = req.url;

    if(url === '/'){

        fs.readFile('message.txt', 'utf-8', (err,data) => {
            if(err){
                console.log(err);
            }
            res.setHeader('Content-Type' , 'text/html');
            res.write('<html>');
            res.write('<head><title>this is my first server</title></head>');
            res.write(`<body>${data}</body>`)
            res.write('<body><form action ="/message" method ="POST"><input type="text" name="message"><button type ="submit">send</button></input></form></body')
            res.write('</html>');
            return res.end();
        })
    }

    else if(url === '/message' && method === 'POST'){
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        })
        req.on('end', () => {
            let parsebody = Buffer.concat(body).toString();
            let mes = parsebody.split( '=' )[1];
            fs.writeFile('message.txt', mes, (err) => {
                if(err){
                console.log(err);
                }
            })
            res.statusCode = 302;
            res.setHeader = ('location', '/');
            return res.end();
        });
    }
});

server.listen(7000);