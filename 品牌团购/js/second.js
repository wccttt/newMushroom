let active = document.getElementById('active');
let littleLeft=document.getElementsByClassName('littleLeft')[0];
let littleRight=document.getElementsByClassName('littleRight')[0];
let second=null;
let stop =0;
let rightSide=document.getElementsByClassName('rightSide')[0];
let isClick = true;

let xhr = new XMLHttpRequest();
xhr.open('get','data/second.json',false);
xhr.onreadystatechange = function () {
    if(xhr.readyState===4&&xhr.status===200){
        second=JSON.parse(xhr.responseText);
    }
};
xhr.send();
console.log(second);


function bindHtml(second) {
    let ulsStr = ``;
    for(var i=0;i<second.length;i++){
        ulsStr+=`<ul>
                     <li>
                            <a href="javascript:;">
                                <img src="img/${second[i].img1}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[i].title1}</h3></a>
                                <span class="left">￥${second[i].price1}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="img/${second[i].img2}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[i].title2}</h3></a>
                                <span class="left">￥${second[i].price2}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="img/${second[i].img3}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[i].title3}</h3></a>
                                <span class="left">￥${second[i].price3}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="img/${second[i].img4}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[i].title4}</h3></a>
                                <span class="left">￥${second[i].price4}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                    </ul>`;
    };
    ulsStr+=`<ul>
                     <li>
                            <a href="javascript:;">
                                <img src="img/${second[0].img1}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[0].title1}</h3></a>
                                <span class="left">￥${second[0].price1}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="img/${second[0].img2}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[0].title2}</h3></a>
                                <span class="left">￥${second[0].price2}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="img/${second[0].img3}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[0].title3}</h3></a>
                                <span class="left">￥${second[0].price3}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <img src="img/${second[0].img4}" alt="">
                            </a>
                            <div class="describe">
                                <a href=""><h3>${second[0].title4}</h3></a>
                                <span class="left">￥${second[0].price4}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                    </ul>`;
    active.innerHTML = ulsStr;
    utils.css(active,'width',960*(second.length+1));
}
bindHtml(second);

timer = setInterval(autoMove,2500);
function autoMove() {
    if(stop>=second.length){
        stop=0;
        utils.css(active,'left',0)
    }
    stop++;
    animate(active,{left:stop*-960},300,function () {
        isClick=true;
    });
}

rightSide.onmouseover =function () {
    clearInterval(timer);
};

rightSide.onmouseout = function () {
    timer = setInterval(autoMove,2500);
};

littleRight.onclick=function(){
    if(isClick){
        isClick=false;
        autoMove();
    }
};
littleLeft.onclick=function(){
    if(isClick){
        isClick=false;
    if(stop<=0){
        stop=second.length;
        utils.css(active,'left',-960*stop);
    }
        stop--;
    animate(active,{left:stop*-960},300,function () {
        isClick=true;

    });}
};

