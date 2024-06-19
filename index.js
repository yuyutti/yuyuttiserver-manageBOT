const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
require('dotenv').config();

const TOKEN = process.env.TOKEN
const GuildId = process.env.GuildId

const sendChannel = process.env.sendChannel
const sendAdminChannel = process.env.sendAdminChannel

client.on("guildMemberAdd", member =>{
    if(member.guild.id === GuildId){
        client.channels.cache.get(sendChannel).send(`<@${member.user.id}>`+"が**ゆゆっちとゆかいな仲間たち²【公式】**に参加しました。")
        client.channels.cache.get(sendAdminChannel).send(`<@${member.user.id}>`+"が**ゆゆっちとゆかいな仲間たち²【公式】**に参加しました。")
    }
});

client.on("guildMemberRemove", member =>{
    if(member.guild.id === GuildId){
        client.channels.cache.get(sendAdminChannel).send(member.user.username+"が**ゆゆっちとゆかいな仲間たち²【公式】**を去っていきました")
    }
});

client.on('voiceStateUpdate', (oldState, newState) => {
    const New_username = newState.member.user.username
    const Old_username = oldState.member.user.username
    const New_voiceChannel = newState.channel;
    const Old_voiceChannel = oldState.channel;
    const SendChannel = client.channels.cache.get('888478811556020224')
    
    if (New_voiceChannel === Old_voiceChannel) return;

    New_voiceChannel ? SendChannel.send(`**${New_username}**が**${New_voiceChannel.name}**に参加しました。`) : null;
    Old_voiceChannel ? SendChannel.send(`**${Old_username}**が**${Old_voiceChannel.name}**から退出しました。`) : null;
});

client.login(TOKEN);




