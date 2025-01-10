const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/api/medium-feed', async (req, res) => {
    try {
        const mediumUsername = 'swapna_jtbb1';
        const response = await axios.get(`https://medium.com/feed/@${mediumUsername}`);
        const $ = cheerio.load(response.data, { xmlMode: true });
        
        const posts = [];
        $('item').each((i, item) => {
            posts.push({
                title: $(item).find('title').text(),
                link: $(item).find('link').text(),
                pubDate: $(item).find('pubDate').text(),
                description: $(item).find('description').text()
            });
        });
        
        res.json(posts);
    } catch (error) {
        console.error('Error fetching Medium posts:', error);
        res.status(500).json({ error: 'Failed to fetch Medium posts' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});