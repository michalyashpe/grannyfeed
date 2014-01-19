var clientId = '696513917405-tatjerfs329qthdg79s2ngscikok4k63.apps.googleusercontent.com';
var apiKey = 'AIzaSyAE29U9mj4Wq_5iW3128Ig0irnqLdzcytE';
var scopes = 'https://www.googleapis.com/auth/drive';


function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth,1);
}

function checkAuth() {
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},handleAuthResult);
}

function handleAuthResult(authResult) {
	var authorizeButton = document.getElementById('authorize-button');

	if (authResult && !authResult.error) {
		authorizeButton.style.visibility = 'hidden';
		makeApiCall();
	}  
	else {
		authorizeButton.style.visibility = '';
		authorizeButton.onclick = handleAuthClick;
	}
}

function handleAuthClick(event) {
	gapi.auth.authorize({client_id: clientId, scope: [scopes], immediate: false}, handleAuthResult);
	return false;
}

function makeApiCall() {  
	gapi.client.load('drive', 'v2', makeRequest);   
}

function makeRequest()
{
	// var request = gapi.client.drive.files.list({'maxResults': 5 });
	var folder_id = '0B-vyvs8oIgKXelNOdnNFOHZoVTQ'
	var request = gapi.client.request({
		'path': "/drive/v2/files?q='"+ folder_id + "' in parents",
		'method': 'GET',
		'params': {'maxResults': '10'}
		});
	
	request.execute(function(resp) {		  
		for (i=0; i<resp.items.length; i++) {
			var titulo = resp.items[i].title;
			var fechaUpd = resp.items[i].modifiedDate;
			var userUpd = resp.items[i].lastModifyingUserName;
			var userEmbed = resp.items[i].embedLink;
			var userAltLink = resp.items[i].alternateLink;
			var selfLink = resp.items[i].selfLink;
			var alternateLink = resp.items[i].alternateLink;
			console.log(resp);
			var link = "https://googledrive.com/host/" + folder_id +"/" + titulo;

			var fileInfo = document.createElement('li');
			fileInfo.appendChild(document.createTextNode('TITLE: ' + titulo + ' - LAST MODIF: ' + fechaUpd + ' - BY: ' + userUpd ));
			document.getElementById('content').appendChild(fileInfo);
			// document.getElementById('content').insertAdjacentHTML('beforeend', '<img width="100" src="'+ link + '"/>');

			var html = '<iframe src="http://docs.google.com/gview?url="'+alternateLink+'"&embedded=true" style="width:600px; height:500px;" frameborder="0"></iframe>';
			document.getElementById('content').insertAdjacentHTML('beforeend', html);
		}
	});	
}