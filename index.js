

// file system
const fs = require('fs');

// Server
const http = require('http');

// Routing
const url = require('url');







// Project Data 

 const productTemplate = fs.readFileSync(`${__dirname}/templates/product-template.html` ,'utf-8' );

 const productsDataJSON = fs.readFileSync(`${__dirname}/dev-data/data.json` ,'utf-8' );

// This an Array of products as Objects 
const productsDataJs = JSON.parse(productsDataJSON);
const productsIDs = productsDataJs.map(productObject => productObject.id ); 




const templateFiller = function(productId) {

  let notOrganic = ''; 


  if (productsDataJs[productId].organic === true) { 
    notOrganic = '';
  } else { 
    notOrganic = 'not-organic';
  };


const filledProductTemplate = productTemplate
                                             .replaceAll('{#ProductImage}', productsDataJs[productId].image)
                                             .replaceAll('{#ProductPrice}' , productsDataJs[productId].price)
                                             .replaceAll('{#ProductDescription}' , productsDataJs[productId].description)
                                             .replaceAll('{#not-organic}' , notOrganic)  
                                             ;

return filledProductTemplate;

}; 








// server 

const server = http.createServer((request , response) => {

    const requestedUrl = request.url; 
    const parsedURrl = url.parse(requestedUrl , true); 
    const requestedId = ((parsedURrl.query.id)*1);
    
      

    
     


    
   

    
    // Router 

    // Index Route
    if(requestedUrl === '/' || requestedUrl === '/overview' ) {

        response.end('Index');

        

    }


  // Products Routes
    else if ( parsedURrl.pathname === '/product'  ) {

     
      response.writeHead(200, {

            'Content-Type': 'text/html' 
            
          }); 
          
  
        
     if (productsIDs.includes(requestedId)) {

      response.end(templateFiller(requestedId));

      } else {


        response.end('<h1> Product Not found </h1>');
     

      }
          
        

    }
// FIN - Products Routes


// Not Found Route
    else {


        response.writeHead(404, {

            'Content-Type': 'text/html' 
            
          }); 
          
        response.end('Not Found');

    }
    

  
    
} );


// Start server : 
server.listen(8000 , '127.0.0.1' , () => { console.log('Server started and listening');
});






