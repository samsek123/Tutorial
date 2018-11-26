import { mainapi } from './config/';

export async function getconfig(pagename) {
  let myHeaders = new Headers(); // eslint-disable-line
  const config = await fetch(`${mainapi}?action=getpage&pagename=${pagename}`, {
    method: 'GET',
    headers: myHeaders,
  });

  let result = await config;
  result = await result.json();
  return result;
}

export async function checkvote(userid) {
  let myHeaders = new Headers(); // eslint-disable-line

  const votecheck = await fetch(`${mainapi}?action=votecheck&user_id=${userid}`, {
    method: 'GET',
    headers: myHeaders,
  });

  let result = await votecheck;
  result = await result.json();
  return result;
}

export async function checkform(userid) {
  let myHeaders = new Headers(); // eslint-disable-line

  const formcheck = await fetch(`${mainapi}?action=formget&user_id=${userid}`, {
    method: 'GET',
    headers: myHeaders,
  });

  let result = await formcheck;
  result = await result.json();
  return result;
}

export async function getimage() {
  let myHeaders = new Headers(); // eslint-disable-line

  const imagelist = await fetch(`${mainapi}?action=getimage`, {
    method: 'GET',
    headers: myHeaders,
  });

  let result = await imagelist;
  result = await result.json();
  return result;
}

export async function voteimage(data) {
  let myHeaders = new Headers(); // eslint-disable-line
  const body = JSON.stringify(data);
  const imageselect = await fetch(mainapi, {
    method: 'POST',
    headers: myHeaders,
    body,
  });
  let result = await imageselect;
  result = await result.json();
  return result;
}

export async function submitform(data) {
  let myHeaders = new Headers(); // eslint-disable-line
  const body = JSON.stringify(data);
  const submitresult = await fetch(mainapi, {
    method: 'POST',
    headers: myHeaders,
    body,
  });
  let result = await submitresult;
  result = await result.json();
  return result;
}
