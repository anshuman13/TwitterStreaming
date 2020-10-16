const express = require('express');
const needle = require('needle');
const router = express.Router();
require('dotenv').config()

const token = process.env.BEARER_TOKEN;  
const trendURL = 'https://api.twitter.com/1.1/trends/place.json?id=';

router.get('/:id', async function(req, res, next) {
    try {
      let data = await getTrends(req.params.id);
      res.send(data);
    } catch (error) {
      return next(error);
    }
  });

async function getTrends(queryId) {

    let params = {
        id: Number(queryId), 
    }
    const res = await needle('get', trendURL, params, { headers: {
        "authorization": `Bearer ${token}`
    }});
    if(res.body && res.body[0]) {
        let trends = res.body[0].trends;
        let result = trends.map(trend => ({ name: trend.name, volume: trend.tweet_volume }));
        return result;
    } else {
        throw new Error ('Unsuccessful request');
    }
}
module.exports = router;
