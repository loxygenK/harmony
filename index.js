const {app, BrowserWindow} = require("electron");
const isDev = require("electron-is-dev");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  if (isDev) {
    console.log("[i] Developing mode - Loading from development server.");
    console.log("    Use `yarn dev` or `yarn devServer`.");
    win.loadURL("http://localhost:8080");
  } else {
    win.loadFile("dist/index.html");
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
})

