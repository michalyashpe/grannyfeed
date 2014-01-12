var clientId = '*********.apps.googleusercontent.com';
var apiKey = '##########';
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

    var request = gapi.client.request({
        'path': '/drive/v2/files',
        'method': 'GET',
        'params': {'maxResults': '1'}
        });
    
    request.execute(function(resp) {          
        for (i=0; i<resp.items.length; i++) {
            var titulo = resp.items[i].title;
            var fechaUpd = resp.items[i].modifiedDate;
            var userUpd = resp.items[i].lastModifyingUserName;
            var userEmbed = resp.items[i].embedLink;
            var userAltLink = resp.items[i].alternateLink;

            var fileInfo = document.createElement('li');
            fileInfo.appendChild(document.createTextNode('TITLE: ' + titulo + ' - LAST MODIF: ' + fechaUpd + ' - BY: ' + userUpd ));                
            document.getElementById('content').appendChild(fileInfo);
        }
    });    
}