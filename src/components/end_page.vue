<template>
    <v-container>
    <head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head>
    <body onload="rotate()">
    <img id="slide">
    <div class="bye"></div>
    </body>
    </v-container>
</template>
<script type="text/javascript">
    var img=new Array();
    img[0]=new Image(); img[0].src="../assets/Image/young_back.jpg";
    img[1]=new Image(); img[1].src="../assets/Image/young_front.jpg";
    var interval=1500;
    var n=0;
    var imgs = new Array("young_back.jpg","young_front.jpg");
    function rotate()
    {
    if(navigatorID.appName=="Netscape" && document.getElementById)
    {
    document.getElementById("slide").src=imgs[n];
    }
    else document.images.slide.src=imgs[n];
    (n==(imgs.length-1))?n=0:n++;
    setTimeout("rotate()",interval);
    }
</script>
<style>
    *{
        background-color: black;
    };
</style>