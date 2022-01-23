

// file system
const fs = require('fs');

// Server
const http = require('http');

// Routing
const url = require('url');



// const textIn = fs.readFileSync('./txt/input.txt' ,'utf-8' );

// console.log(textIn);

// const textOut = `haha ben haha is a test ${textIn}  is date ${Date.now()}`;

// fs.writeFileSync('./txt/mehdiOutput.txt' , textOut);
// console.log('File was written');



//  Sync reading 
// const textSync = fs.readFile('./txt/inpute.txt' ,'utf-8' , (err, data) => {

// if (err) return console.log('error');

// console.log(data);

// }); 






// server 

const apiData = fs.readFileSync('./dev-data/data.json' ,'utf-8' );


const server = http.createServer((request , response) => {

    const requestedUrl = request.url; 

    // Router 
    if(requestedUrl === '/' || requestedUrl === '/overview' ) {

        response.end('Index');

    }  else if ( requestedUrl === '/article-One'  ) {

        response.end('Page of Article One');

    }  else if ( requestedUrl === '/API'  ) {

        response.writeHead(200, {

            'Content-Type': 'application/json', 
            
          });

          response.end(apiData);

    } else {


        response.writeHead(404, {

            'Content-Type': 'text/html', 
            'My-Own_header': 'Hi Hi Hiiii' 

          }); 
          
        response.end('<h1>Error 404 : page not found</h1> <h2>Error Subtitle : Hak ya Hak</h2>');

    }
    
} );


// Start server : 
server.listen(8000 , '127.0.0.1' , () => { console.log('Serever started and listening');
})
