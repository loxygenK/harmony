const __default_fetch = window.fetch;

window.fetch = async (input, init) => {
  if (input.toString().match(/^https:\/\/discord\.com\/api\/v[0-9]+\/gateway\/bot/)) {
    const data = {
      url: "wss://gateway.discord.gg",
      session_start_limit: {},
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return new Response(JSON.stringify(data), { headers });
  }

  return __default_fetch(input, init);
};
