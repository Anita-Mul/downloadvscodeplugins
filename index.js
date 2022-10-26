#!/usr/bin/env node
const download = require('download');
const { execSync } = require('child_process');
const path = require('path');

const plugins = require('./const');


async function downloadPlugin(name, url) {
  try {
    await download(url, 'dist', {
      filename: `${name}.vsix`,
    });
  
    execSync(`code --install-extension ${name}.vsix`, { cwd: path.join(process.cwd(), 'dist') }, (err, stdout, stderr) => {
      if(err) {
          console.error(`${name}.vsix 文件执行失败`);
          console.error(err);
          return;
      }
      console.log(`stdout: ${stdout}`);
    });
  } catch(error) {
    console.error(`${name}.vsix 插件下载失败`);
    console.error(error);
  }
}

function downloadPlugins() {
  try { 
    plugins.forEach(async element => {
      const { name, url } = element;
      await downloadPlugin(name, url);
    });
  } catch(err) {
    console.error(error);
  }
}

downloadPlugins();








