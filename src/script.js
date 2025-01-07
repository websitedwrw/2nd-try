// Toggle the theme between light and dark mode 
const toggleTheme = () => {
  document.documentElement.classList.toggle('light-theme');
};

// Copy the server IP to the clipboard
const copyIP = () => {
  const ip = document.getElementById('server-ip').textContent;
  navigator.clipboard.writeText(ip).then(() => {
    alert('Server IP copied to clipboard!');
  });
};

// Show the selected section (Home, Keys, Ranks, Coins)
function showSection(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    section.style.display = section.id === sectionId ? 'block' : 'none';
  });
}

// Fetch Discord online status
async function fetchDiscordStatus() {
  const discordGuildID = 'reM7cUy4';  // Replace with your Discord guild ID (unique ID from the invite URL)
  const discordBotToken = 'YOUR_BOT_TOKEN';  // Replace with your Discord bot token
  const url = `https://discord.com/api/v10/guilds/${discordGuildID}/members?limit=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bot ${discordBotToken}`,
      },
    });

    const data = await response.json();
    if (data) {
      const onlineMembers = data.filter(member => member.presence && member.presence.status === 'online').length;
      document.getElementById('discord-online').textContent = `${onlineMembers} online members`;
    } else {
      console.error("No data received from Discord.");
      document.getElementById('discord-online').textContent = 'Error fetching status';
    }
  } catch (error) {
    console.error('Error fetching Discord status:', error);
    document.getElementById('discord-online').textContent = 'Error fetching status';
  }
}

// Fetch Minecraft online players count
async function fetchMinecraftPlayers() {
  const serverIP = 'play.shostasmp.xyz'; // Replace with your Minecraft server IP
  const url = `https://api.mcsrvstat.us/2/${serverIP}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.online && data.players) {
      document.getElementById('mc-online').textContent = `${data.players.online} players online`;
    } else {
      console.error("Minecraft server data is not available or the server is offline.");
      document.getElementById('mc-online').textContent = 'Server is offline';
    }
  } catch (error) {
    console.error('Error fetching Minecraft player status:', error);
    document.getElementById('mc-online').textContent = 'Error fetching status';
  }
}

// Initialize real-time data
function initRealTimeData() {
  fetchDiscordStatus();
  fetchMinecraftPlayers();
  setInterval(fetchDiscordStatus, 60000); // Update every 60 seconds
  setInterval(fetchMinecraftPlayers, 60000); // Update every 60 seconds
}

// Initial call to update counts immediately when the page loads
window.onload = initRealTimeData;
