var GoodsSku=document.getElementById("J_GoodsSku");
var imgs=GoodsSku.getElementsByClassName("img");
var Size=GoodsSku.getElementsByClassName("num");
var GoodsImg=document.getElementById("J_GoodsImg");
var BigImg=document.getElementById("J_BigImg");
var UL=document.getElementById("tabbar-list");
var lis=UL.getElementsByTagName("li");
var DIV=document.getElementById("panel-box");
var divs=DIV.getElementsByClassName('module-panel');
var side=document.getElementsByClassName("extranav-bd");
/*console.log(lis);
console.log(divs);*/
for(var i=0;i<imgs.length;i++){
    imgs[i].onclick=function () {
        BigImg=imgs[i]
    }
}
for(var i=0;i<lis.length;i++){
    lis[i].index=i;
    lis[i].onclick=function () {
        for(var j=0;j<lis.length;j++){
            lis[j].classList.remove('selected');
            divs[j].classList.remove('ui-none');
        }
        this.classList.add('selected');
        divs[this.index].classList.add('ui-none')
    };
    if(i===0){

    }
}

let $search=(function () {
    let  $searchOuter=$('.outer_lock');
    let $H=$searchOuter[0].offsetHeight;
    let $sideBottom=$('.sideBottom');
    let $header=$('header');
    window.onscroll=function () {
        let T=window.scrollY;
        console.log(T);
        console.log(1);
        if(T>0){
            $sideBottom.css({display:'block'})
        }
        if(T>=$H){
            $searchOuter.addClass('outer').removeClass('outer_lock');
        }else{
            $searchOuter.addClass('outer_lock').removeClass('outer')
        }
        if(T<=2){
            $sideBottom.css({display:"none"});
        }
    };
    $sideBottom.on('click',function () {
        $('html , body').animate({scrollTop: 0},'slow');

    });

    return {
        init:function () {

        }
    }
})();
