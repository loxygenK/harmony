import "./fetchOverrider";
import * as Discord from "discord.js";

type Callback = (msg: Discord.Message) => void;

let isLoggedIn = false;
const callbacks: { [key: string]: Callback } = {};
const client: Discord.Client = new Discord.Client();

function handleMessage(msg: Discord.Message) {
  if(callbacks[msg.channel.id]) {
    callbacks[msg.channel.id](msg);
  }
}

export async function login(token: string): Promise<void> {
  if(isLoggedIn) {
    throw Error("Already logged in.");
  }
  client.on("message", (msg) => { handleMessage(msg) })
  await client.login(token);
  isLoggedIn = true;
}

export function onMessage(channelId: string, callback: Callback): void {
  if(callbacks[channelId]) {
    throw Error(`The callback for channel id ${channelId} is already registered.`);
  }
  callbacks[channelId] = callback;
}

export function removeHandler(channelId: string): void {
  if(!callbacks[channelId]) {
    throw Error(`The callback for channel id ${channelId} is not registered.`);
  }
  delete callbacks[channelId];
}
