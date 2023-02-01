function getAccountId() {
  let login = prompt('Please enter your Username');
  if (login)
    login = login.toLowerCase();
  let jwtToken = document.getElementById('jwt_token').value;
  fetch(`https://api.streamelements.com/kappa/v2/channels/${login}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    }
  }).then(res => {
    if (!res.ok)
      console.log(`Non-OK-Response (getAccountId): ${res.status}`);
    return res.json();
  }).then(data => {
    if (data._id)
      document.getElementById('acc_id').value = data._id;
    document.getElementById('result').value = JSON.stringify(data, null, 2);
  }).catch(err => {
    console.log(`Error getting User Guid: ${err}`);
  });
}
async function say() {
  let guid = document.getElementById('acc_id').value;
  let jwtToken = document.getElementById('jwt_token').value;
  let textMessage = document.getElementById('message').value;
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
    if (!res.ok)
      console.log(`Non-OK-Response (say): ${res.status}`);
    return res.json();
  }).then(data => {
    document.getElementById('result').value = JSON.stringify(data, null, 2);
  }).catch(err => {
    console.log(`Error sending Twitch Message: ${err}`);
  });
}
