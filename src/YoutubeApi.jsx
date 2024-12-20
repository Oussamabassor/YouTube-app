import axios from 'axios';

const API_KEY = 'AIzaSyBGRO1Hg_HXn7vVxc6yH6YjWbKD3h0CA9g';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const fetchVideos = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/search`, {
            params: {
                part: 'snippet',
                q: query,
                key: API_KEY,
                type: 'video',
                maxResults: 5,
            },
        });
        return response.data.items;
    } catch (error) {
        console.error('Erreur lors de la récupération des vidéos:', error);
        return [];
    }
};