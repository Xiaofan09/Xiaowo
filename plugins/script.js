import { promises } from 'fs';
import { join } from 'path';
import axios from 'axios'; 

let handler = async function (m, { conn, __dirname }) {
  const githubRepoURL = 'https://atom.bio/essaouidi_yassine';

  try {
  
    const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);

    if (response.status === 200) {
      const repoData = response.data;

      // Format the repository information with emojis
      const formattedInfo = `
📂 Repository Name: ${repoData.name}
📝 Description: ${repoData.description}
👤 Owner: ${repoData.owner.login}
⭐ Stars: ${repoData.stargazers_count}
🍴 Forks: ${repoData.forks_count}
🌐 URL: ${repoData.html_url}
      `.trim();

      // Send the formatted information as a message
      await conn.relayMessage(m.chat,  {
        requestPaymentMessage: {
          currencyCodeIso4217: 'INR',
          amount1000: 69000,
          requestFrom: m.sender,
          noteMessage: {
          extendedTextMessage: {
          text: formattedInfo,
          contextInfo: {
          externalAdReply: {
          showAdAttribution: true
          }}}}}}, {})
    } else {
      // Handle the case where the API request fails
      await conn.reply(m.chat, 'لا تتعذب يا حبيبي 😂 ألامر فقط لصاحب بوت 🤖🙂', m);
    }
  } catch (error) {
    console.error(error);
    await conn.reply(m.chat, 'حدث خطأ أثناء جلب معلومات هذا الأمر يشتغل مع صاحب بوت فقط 😹😂', m);
  }
};

handler.help = ['script'];
handler.tags = ['main'];
handler.command = ['sc', 'repo', 'script'];

export default handler;
