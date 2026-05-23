const chalk = require('chalk');

module.exports = {
  name: 'ready',
  async execute(client) {

    // Fetch the channel fresh instead of relying on cache
    const oniChan = await client.channels.fetch(client.config.ticketChannel).catch(() => null);

    if (!oniChan) {
      return console.log(chalk.red('[Tickety] Could not find ticketChannel. Check the ID in config.json.'));
    }

    async function sendTicketMSG() {
      const embed = new client.discord.MessageEmbed()
        .setColor('6d6ee8')
        .setAuthor({ name: 'Ticket', iconURL: client.user.avatarURL() })
        .setDescription('Click the button below to open a ticket.')
        .setFooter({ text: `${client.user.tag}`});

      const row = new client.discord.MessageActionRow()
        .addComponents(
          new client.discord.MessageButton()
            .setCustomId('open-ticket')
            .setLabel('Open a ticket')
            .setEmoji('✉️')
            .setStyle('PRIMARY'),
        );

      await oniChan.send({ embeds: [embed], components: [row] });
    }

    await oniChan.bulkDelete(100, true).catch(() => {});
    await sendTicketMSG();
    console.log(chalk.green('[Tickety v2]') + chalk.cyan(' Sent the ticket creation widget..'));
  },
};
