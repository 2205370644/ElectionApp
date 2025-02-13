const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  // 创建一个新的 BrowserWindow 实例
  const win = new BrowserWindow({
    width: 1800,
    height: 1000,
    webPreferences: {
      // 设置预加载脚本
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  // 在开发环境下连接到 Vue Devtools
  if (process.env.NODE_ENV === 'development') {
    devtools.connect('localhost', 8098) // 连接到本地 Devtools 服务
  }

  // 默认打开调试工具
  win.webContents.openDevTools({ mode: 'bottom' })

  // 加载应用的 HTML 文件
  win.loadFile('index.html')
}
app.whenReady().then(() => { 
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  } 
})


// 当应用准备好时尝试加载 Vue Devtools 扩展
app.on('ready', () => {
 
})

// 当所有窗口关闭时退出应用，除非在 macOS 上
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})