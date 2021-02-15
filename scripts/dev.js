const { spawn } = require("child_process");

function getSimpleTextId(text) {
  return text
    .split("")
    .map(c => c.charCodeAt(0))
    .reduce((sum, elem) => sum + elem, 0);
}

function log(tag, message) {
  const loggedDate = new Date();
  const colorCode = getSimpleTextId(
    tag.substring(
      0,
      (tag.indexOf(":") != -1 ? tag.indexOf(":") : tag.length)
    )
  ) % 5;
  const colorCodeText = `\u001b[3${colorCode + 1}m`
  const resetText = "\u001b[m"

  const tagText = `${tag.padStart(14, " ")}`;
  const timeText =
    `${loggedDate.getHours().toString().padStart(2, "0")}:` +
    `${loggedDate.getMinutes().toString().padStart(2, "0")}:` +
    `${loggedDate.getSeconds().toString().padStart(2, "0")}.` +
    `${loggedDate.getMilliseconds().toString().padStart(3, "0")}`;

  const header = `${tagText} | ${timeText}`

  const prettiedMessage = message
    .split("\n")
    .map((text, index) => `${" ".repeat(index == 0 ? "" : header.length )}${colorCodeText} | ${text}\n`)
    .reduce((sum, elem) => sum + elem, "")

  console.log(`${colorCodeText}${header}${prettiedMessage.substring(0, prettiedMessage.length - 1)}${resetText}`);
}

function spawnProcess(tag, app, args) {
  const process = spawn(app, args);
  let stdout = "", stderr = "";
  process.stdout.on(
    "data",
    (chunk) => {
      stdout += chunk.toString();
      if(chunk.toString().endsWith("\n")) {
        log(tag + ":OUT", stdout.replace("\n", ""));
        stdout = "";
      }
    }
  )
  process.stderr.on(
    "data",
    (chunk) => {
      stderr += chunk.toString();
      if(chunk.toString().endsWith("\n")) {
        log(tag + ":ERR", stderr.replace("\n", ""));
        stderr = "";
      }
    }
  )
  process.on("close", () => log(tag + ":SPW", "Closed!"));
}

log("Dev.js", "Starting TSM in watch mode.")
spawnProcess("TSM", "yarn", ["css:watch"]);
log("Dev.js", "Starting development server.");
spawnProcess("dev.Serv", "yarn", ["devServer"]);
setTimeout(() => {
  log("Dev.js", "Starting electron client.")
  spawnProcess("electron", "yarn", ["electron", "."]);
}, 5000);

