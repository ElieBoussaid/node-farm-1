




 // Function that fills HTML templates 

module.exportes = function(productId , templateToFille) {

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


// FIN - Function that fills HTML templates 


