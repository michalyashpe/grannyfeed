$(function(){

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

//              effect:{enter:{transform:"scale("+(1+ Math.random()*2)+")",opacity:0},exit:{transform:"scale("+(Math.random()*2)+")",opacity:0}},

            // If your server allow directory listing you can use:
            // (however this doesn't work locally on your computer)

//            folderPath:"../imgaes/",

            // else:

            images:[
            	"https://googledrive.com/host/0B-vyvs8oIgKXQTlZbkl0R0lGOXM/brain.png",
                "http://images4.fanpop.com/image/photos/14700000/So-cute-puppies-14749028-1600-1200.jpg",
                "http://digntaswpp.com/wp-content/uploads/2013/10/Cute-Cat-Wallpaper-HD.jpg"
            ],

            onStart:function(){},
            onPause:function(){},
            onPlay:function(opt){},
            onChange:function(opt,idx){},
            onNext:function(opt){},
            onPrev:function(opt){}
        });

    });