module.exports = () => {
  const now = new Date();
  
  return {
    // The ISO string is best practice for the datetime attribute so machines can read it
    timestamp: now.toISOString(),
    
    // A human-readable format for the actual text on your site
    displayTime: now.toLocaleString('en-US', { 
        timeZone: 'Asia/Jakarta', // Keeps it pinned to WIB
        dateStyle: 'medium', 
        timeStyle: 'short' 
    })
  };
};