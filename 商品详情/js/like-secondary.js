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


