async function getAccountId() {
  let login = prompt('Please enter your Username');
  if (login)
    login = login.toLowerCase();
  let jwtToken = document.getElementById('jwt_token').value;
  await fetch(`https://api.streamelements.com/kappa/v2/channels/${login}`, {
	  headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  }).then(data => {
    if (data._id)
      return data._id;
    else
      return data;
  }).catch(err => {
    console.log(`Error getting User Guid: ${err}`);
  });
}
async function say() {
  let guid = document.getElementById('acc_id').value;
  let jwtToken = document.getElementById('jwt_token').value;
  await fetch(`https://api.streamelements.com/kappa/v2/bot/${guid}/say`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: textMessage
    })
  }).then(res => {
    return res.json();
  }).then(data => {
    return data;
  }).catch(err => {
    console.log(`Error sending Twitch Message: ${err}`);
  });
}
