var clientId = '696513917405-tatjerfs329qthdg79s2ngscikok4k63.apps.googleusercontent.com';
var apiKey = 'AIzaSyAE29U9mj4Wq_5iW3128Ig0irnqLdzcytE';
var scopes = 'https://www.googleapis.com/auth/drive.readonly';


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
	gapi.client.load('drive', 'v2', getFolderId);  
	
}


function getFolderId() {
	var folder_name = "grannyfeed-folder";
	var request = gapi.client.request({
	'path': "/drive/v2/files?q=title='"+ folder_name +"'",
	'method': 'GET',
	});
	request.execute(function(resp){
		var folder_id = resp.items[0].id
		gapi.client.load('drive', 'v2', getPics(folder_id));   
	});
	
}


function getPics(folder_id)
{
	var request = gapi.client.request({
		'path': "/drive/v2/files?q='"+ folder_id + "' in parents",
		'method': 'GET',
		'params': {'maxResults': '10'}
		});
	var images = [];
	request.execute(function(resp) {		  
		console.log(resp);
		for (i=0; i<resp.items.length; i++) {
			var titulo = resp.items[i].title;
			var fechaUpd = resp.items[i].modifiedDate;
			var userUpd = resp.items[i].lastModifyingUserName;
			var userEmbed = resp.items[i].embedLink;
			var userAltLink = resp.items[i].alternateLink;
			var selfLink = resp.items[i].selfLink;
			var alternateLink = resp.items[i].alternateLink;
			var file_id = resp.items[i].id;
			
			// var fileInfo = document.createElement('li');
			// fileInfo.appendChild(document.createTextNode('TITLE: ' + titulo + ' - LAST MODIF: ' + fechaUpd + ' - BY: ' + userUpd ));
			// document.getElementById('content').appendChild(fileInfo);
			url = "http://drive.google.com/uc?export=view&id="+ file_id;
			images.push(url);
			// var html = '<img src="' + url+ '"/>';
			// document.getElementById('content').insertAdjacentHTML('beforeend', html);
		}

		console.log(images);
		//  THIS IS FROM NAGARUT.JS. NEED TO LEARN HOW TO SEPERATE TO FUNCTION

		setTimeout(function(){
			$("#wrapper").CSSAnimate({marginLeft:-450, background:"rgba(255, 192, 0, 0.8)"},200);
			$("body").css({overflow:"hidden"});
		},3000);

		$("#wrapper").on("mouseenter",function(){
			$(this).CSSAnimate({marginLeft:0, background:"rgba(232, 232, 232, .9)"},200);
			$("body").css({overflow:"auto"});
		}).on("mouseleave",function(){
					$(this).CSSAnimate({marginLeft:-450, background:"rgba(255, 192, 0, 0.8)"},200);
					$("body").css({overflow:"hidden"});
				});
		$.mbBgndGallery.buildGallery({
			containment:"body",
			timer:2000,
			effTimer:2000,
			controls:"#controls",
			grayScale:false,
			shuffle:true,
			preserveWidth:false,
			effect:"blur",
			// thumbs:{folderPath:"thumbs/", placeholder:"#thumbnails"},

//			  effect:{enter:{transform:"scale("+(1+ Math.random()*2)+")",opacity:0},exit:{transform:"scale("+(Math.random()*2)+")",opacity:0}},

			// If your server allow directory listing you can use:
			// (however this doesn't work locally on your computer)

//			folderPath:"../imgaes/",

			// else:

			// images:[
			// 	// "https://googledrive.com/host/0B-vyvs8oIgKXQTlZbkl0R0lGOXM/brain.png",
			// 	"http://images4.fanpop.com/image/photos/14700000/So-cute-puppies-14749028-1600-1200.jpg",
			// 	"http://digntaswpp.com/wp-content/uploads/2013/10/Cute-Cat-Wallpaper-HD.jpg"
			// ],

			images: images,
			onStart:function(){},
			onPause:function(){},
			onPlay:function(opt){},
			onChange:function(opt,idx){},
			onNext:function(opt){},
			onPrev:function(opt){}
		});

		// END OF NAGARUT














	});	
}