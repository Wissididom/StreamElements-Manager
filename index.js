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

async function getTwitchUser(id) {
	return new Promise((resolve, reject) => resolve(id)); // TODO: Mock until implementation
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

async function timeout() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let user = document.getElementById('timeoutuser').value.toLowerCase();
	let isId = user.startsWith('id:');
	if (isId) {
		user = getTwitchUser(user.substring('id:'.length));
	}
	let timeoutreason = document.getElementById('timeoutreason').value.trim();
	let textMessage = `/timeout ${user}`;
	if (timeoutreason != null && timeoutreason != '') textMessage += ` ${timeoutreason}`;
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
			console.log(`Non-OK-Response (timeout): ${res.status}`);
		return res.json();
	}).then(data => {
		document.getElementById('result').value = JSON.stringify(data, null, 2);
	}).catch(err => {
		console.log(`Error sending Twitch Message: ${err}`);
	});
}

async function ban() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let user = document.getElementById('banuser').value.toLowerCase();
	let isId = user.startsWith('id:');
	if (isId) {
		user = getTwitchUser(user.substring('id:'.length));
	}
	let banreason = document.getElementById('banreason').value.trim();
	let textMessage = `/ban ${user}`;
	if (banreason != null && banreason != '') textMessage += ` ${banreason}`;
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
			console.log(`Non-OK-Response (ban): ${res.status}`);
		return res.json();
	}).then(data => {
		document.getElementById('result').value = JSON.stringify(data, null, 2);
	}).catch(err => {
		console.log(`Error sending Twitch Message: ${err}`);
	});
}

async function unban() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let user = document.getElementById('unbanuser').value.toLowerCase();
	let isId = user.startsWith('id:');
	if (isId) {
		user = getTwitchUser(user.substring('id:'.length));
	}
	let textMessage = `/unban ${user}`;
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
			console.log(`Non-OK-Response (unban): ${res.status}`);
		return res.json();
	}).then(data => {
		document.getElementById('result').value = JSON.stringify(data, null, 2);
	}).catch(err => {
		console.log(`Error sending Twitch Message: ${err}`);
	});
}

async function del() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let messageid = document.getElementById('deleteid').value.trim();
	let textMessage = `/delete ${messageid}`;
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
			console.log(`Non-OK-Response (delete): ${res.status}`);
		return res.json();
	}).then(data => {
		document.getElementById('result').value = JSON.stringify(data, null, 2);
	}).catch(err => {
		console.log(`Error sending Twitch Message: ${err}`);
	});
}

async function clch() {
	let guid = document.getElementById('acc_id').value;
	let jwtToken = document.getElementById('jwt_token').value;
	let textMessage = '/clear';
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
			console.log(`Non-OK-Response (clear): ${res.status}`);
		return res.json();
	}).then(data => {
		document.getElementById('result').value = JSON.stringify(data, null, 2);
	}).catch(err => {
		console.log(`Error sending Twitch Message: ${err}`);
	});
}
