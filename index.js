

// file system
const fs = require('fs');

// Server
const http = require('http');

// Routing
const url = require('url');







// Project Data 

 const productTemplate = fs.readFileSync(`${__dirname}/templates/product-template.html` ,'utf-8' );


 const overViewTemplate = fs.readFileSync(`${__dirname}/templates/overview.html` ,'utf-8' );

 const productCard = fs.readFileSync(`${__dirname}/templates/product-card--template.html` ,'utf-8' );

 const productsDataJSON = fs.readFileSync(`${__dirname}/dev-data/data.json` ,'utf-8' );

// This an Array of products as Objects 
const productsDataJs = JSON.parse(productsDataJSON);
const productsIDs = productsDataJs.map(productObject => productObject.id ); 




const templateFiller = function(productId , templateToFille) {

  let notOrganic = ''; 


  if (productsDataJs[productId].organic === true) { 
    notOrganic = '';
  } else { 
    notOrganic = 'not-organic';
  };


const filledTemplate = templateToFille  .replaceAll('{#ProductId}', productsDataJs[productId].id)
                                             .replaceAll('{#ProductName}', productsDataJs[productId].productName)
                                             .replaceAll('{#ProductImage}', productsDataJs[productId].image)
                                             .replaceAll('{#ProductPrice}' , productsDataJs[productId].price)
                                             .replaceAll('{#ProductDescription}' , productsDataJs[productId].description)
                                             .replaceAll('{#not-organic}' , notOrganic)  
                                             ;

return filledTemplate;

}; 








// server 

const server = http.createServer((request , response) => {

    const requestedUrl = request.url; 
    const parsedURrl = url.parse(requestedUrl , true); 
    const requestedId = ((parsedURrl.query.id)*1);
    
      

    
     


    
   

    
    // Router 

    // Index Route
    if(requestedUrl === '/' || requestedUrl === '/overview' ) {

      
      
        response.writeHead(200, {

          'Content-Type': 'text/html' 
          
        }); 
  
       let productsCardsHTML = ''; 

     
    

       productsDataJs.forEach( (productObject, index) => {
         
        productsCardsHTML = productsCardsHTML + templateFiller(index,productCard); 
          
       });


       response.end(overViewTemplate.replace('{#ProductsCardsPlace}', productsCardsHTML));

    }


  // Products Routes
    else if ( parsedURrl.pathname === '/product'  ) {

     
      response.writeHead(200, {

            'Content-Type': 'text/html' 
            
          }); 
          
  
        
     if (productsIDs.includes(requestedId)) {

      response.end(templateFiller(requestedId,productTemplate));

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






