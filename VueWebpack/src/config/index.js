/* eslint-disable */

const mode = process.env.NODE_ENV;

let foldername = '/ust_valentine/';
const mainapi = 'http://clients.atwemine.cn/ust_valentine/api/main_api.php';

if(mode === 'development'){
  foldername = '/';
}

export { foldername, mainapi };
