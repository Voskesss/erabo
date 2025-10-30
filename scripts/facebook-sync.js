const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

// Facebook Graph API
const FACEBOOK_PAGE_ID = process.env.FACEBOOK_PAGE_ID || '100051374655898';
const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN;

// Categorisatie op basis van keywords
function categorizePost(message) {
  const text = message.toLowerCase();
  
  if (text.includes('badkamer') || text.includes('toilet') || text.includes('douche') || text.includes('wastafel') || text.includes('sanitair')) {
    return 'Sanitair';
  }
  if (text.includes('elektra') || text.includes('groepenkast') || text.includes('zekering') || text.includes('verlichting') || text.includes('stopcontact')) {
    return 'Electra';
  }
  if (text.includes('overkapping') || text.includes('terras') || text.includes('buiten') || text.includes('tuin')) {
    return 'Buitenwerk';
  }
  if (text.includes('keuken') || text.includes('renovatie') || text.includes('verbouwing') || text.includes('wand') || text.includes('plafond')) {
    return 'Renovatie';
  }
  
  return 'Renovatie'; // fallback
}

// Haal Facebook posts op
async function fetchFacebookPosts() {
  try {
    const url = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=message,full_picture,created_time,attachments{media_type,media,subattachments}&limit=20&access_token=${FACEBOOK_ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error('Facebook API error:', data.error);
      return [];
    }
    
    return data.data || [];
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    return [];
  }
}

// Converteer Facebook posts naar projecten
function convertPostsToProjects(posts) {
  return posts
    .filter(post => post.message && post.message.trim().length > 0) // Alleen posts met tekst
    .map((post, index) => {
      const images = [];
      
      // Hoofdafbeelding
      if (post.full_picture) {
        images.push(post.full_picture);
      }
      
      // Extra afbeeldingen uit attachments
      if (post.attachments && post.attachments.data) {
        post.attachments.data.forEach(attachment => {
          if (attachment.media && attachment.media.source) {
            images.push(attachment.media.source);
          }
          if (attachment.subattachments && attachment.subattachments.data) {
            attachment.subattachments.data.forEach(sub => {
              if (sub.media && sub.media.source) {
                images.push(sub.media.source);
              }
            });
          }
        });
      }
      
      return {
        id: `facebook-${post.id}`,
        title: post.message.split('\n')[0].substring(0, 100), // Eerste regel, max 100 karakters
        description: post.message,
        category: categorizePost(post.message),
        images: images,
        date: new Date(post.created_time).toISOString().split('T')[0],
        featured: index < 3, // Eerste 3 posts zijn uitgelicht
        source: 'facebook',
        facebookId: post.id
      };
    });
}

// Main functie
async function main() {
  console.log('Starting Facebook sync...');
  
  try {
    // Haal Facebook posts op
    const posts = await fetchFacebookPosts();
    console.log(`Found ${posts.length} Facebook posts`);
    
    // Converteer naar projecten
    const facebookProjects = convertPostsToProjects(posts);
    console.log(`Converted ${facebookProjects.length} posts to projects`);
    
    // Lees bestaande projecten (als backup)
    const projectsFile = path.join(__dirname, '../data/projects.json');
    let existingProjects = [];
    
    if (fs.existsSync(projectsFile)) {
      const existingData = JSON.parse(fs.readFileSync(projectsFile, 'utf8'));
      existingProjects = existingData.projects.filter(p => p.source !== 'facebook');
      console.log(`Kept ${existingProjects.length} existing non-Facebook projects`);
    }
    
    // Combineer: Facebook projecten eerst, daarna bestaande
    const allProjects = [...facebookProjects, ...existingProjects];
    
    // Schrijf naar projects.json
    const output = {
      projects: allProjects,
      lastSync: new Date().toISOString(),
      facebookCount: facebookProjects.length
    };
    
    fs.writeFileSync(projectsFile, JSON.stringify(output, null, 2));
    console.log(`Updated projects.json with ${allProjects.length} total projects`);
    
  } catch (error) {
    console.error('Error during Facebook sync:', error);
    process.exit(1);
  }
}

// Run main
main();
