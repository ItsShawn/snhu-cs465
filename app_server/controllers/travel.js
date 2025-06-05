const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const travel = async (req, res) => {
  await fetch(tripsEndpoint, options)
    .then(res => res.json())
    .then(json => {
      let message = null;
      if (!Array.isArray(json)) {
        message = "API lookup error";
        json = [];
      } else {
        if (!json.length) {
          message = "No trips exist in our database!";
        }
      }
      res.render('travel', { title: 'Travlr Getaways', trips: json, message });
    })
    .catch(err => res.status(500).send(err.message));
};

module.exports = {
  travel
};
