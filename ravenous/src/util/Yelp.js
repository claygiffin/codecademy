const apiKey = 'W-L4q-huOjuBHjwkhCFTxL_sN5ElddhThtu2-trGeXAIPrHutwbnmhypF1r9NuFQ9ytvUMssUMZfUx8D50NNDRGyPcrxF3e-hbTdrKZs2g9vxm0IFcTEMF45DqsyW3Yx'
const CORS = 'https://cors-anywhere.herokuapp.com/'

const Yelp = {
  search(term, location, sortBy){
    console.log(`https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`);
    return fetch(`${CORS}https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.businesses){
        return jsonResponse.businesses.map(business => ({
            id: business.id,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count
          }));
      }
    })
  }
}

export default Yelp;