let fourParts = (function () {
    let Like = document.getElementById('like');
    let List = document.getElementById('list');
    let uls = List.getElementsByTagName('ul');
    let contents = document.getElementsByClassName('content');
    let data = null;
    let minH = null;
    let choice = document.getElementById('choice');
    let wcc_fourParts=document.getElementById('fourParts');
    let wcc_main=document.getElementById('wcc_main');

    let wcc_main_top=offset(wcc_main).top;


    let stop = 0;

    function ajax() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'data/like.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
                data = JSON.parse(xhr.responseText)
            }
        };
        xhr.send();
    }

    ajax();

    function bindHtml() {
        let str = ``;
        let ary = [];
        data.forEach(function (item, index) {
            let num = Math.round(Math.random() * 74);
            ary.push(num);
            if (ary[length - 1] === num) {
                num = Math.round(Math.random() * 74)
            }
            str += `<li>
                <div class="lis_top">
                <img class="img0" data-src="${data[num].img}" /*src="${data[num].img}"*/ alt="">
                
                <!--<div class="hidden">找相似</div>-->
                </div>
                <a href="">
                <p class="content">${data[num].content}</p>
                <p class="hot">热卖</p>
                <div class="lis_bottom">
                <span>￥${data[num].price}</span>
                <del>${data[num].previous_price}</del>
                <div class="collect">
           <img src="img/img4/collect.png" alt=""><!--     --><p>${data[num].collect}</p></div>
                </div>
                </a>
            </li>`;
            //minH = uls.offsetHeight
        });
        List.innerHTML = str;
        minH = List.offsetHeight;
    };
    bindHtml();
    let winH = document.documentElement.clientHeight || document.body.clientHeight;
    let imgs = document.getElementsByClassName('img0');


    for (var i = 0; i < imgs.length; i++) {
        lazyImg(imgs[i]);
    }
    let hots = document.getElementsByClassName('hot');

    for (var i = 0; i < hots.length; i++) {
        if ((i + 1) % 5 == 0) {
            hots[i].style.display = 'block';
        } else {
            hots[i].style.display = 'none';
        }
    }
    for (var i = 0; i < contents.length; i++) {
        if ((i + 1) % 5 == 0) {
            contents[i].style.height = '20px';
        }
    }

    function lazyImg(ele) {
        let winT = document.documentElement.scrollTop || document.body.scrollTop;
        if (winT + winH > minH) {
            let newImg = new Image;
            // console.log(ele.getAttribute);
            let url = ele.getAttribute('data-src');
            newImg.src = url;
            newImg.onload = function () {
                ele.src = this.src;
                newImg = null;
                ele.load = true;
                ele.parentNode.style.background = 'none';

            }
        }
    }



    function offset (ele){
        let l = ele.offsetLeft;
        let t = ele.offsetTop;
        // 如果元素的父级有定位，那么元素距离body的偏移量就不真实
        let parent = ele.offsetParent;
        while(parent){// 直到parent为null【当parent上一次循环为body的时候】 ，才进不来这个循环
            t+=parent.offsetTop + parent.clientTop;
            l+=parent.offsetLeft + parent.clientLeft;
            // 需要不断的去跟新parent,让parent重新赋值，等于父级的父级参照物
            parent = parent.offsetParent
        }
        return {left:l,top:t}
    }
    function win(attr,value){
        // 判断第二个参数有没有传入，如果有传，证明我要是设置，如果没有传，只是来求这个值
        if(value == undefined){
            return document.documentElement[attr] || document.body[attr];
        }else{
            document.documentElement[attr]=value ;
            document.body[attr] = value;
        }

    }


    window.onscroll=function () {
       var winT=win('scrollTop');
        if(winT>=wcc_main_top){
            choice.style.position='fixed';
            /*choice.style.left=80+'px';*/
            choice.style.top=0;
            choice.style.zIndex=100;
            choice.style.marginTop=0;
            wcc_fourParts.style.marginTop=84+'px';

        }else{
            choice.style.position='';
            choice.style.marginTop=10+'px';
            wcc_fourParts.style.marginTop=25+'px';
        }
        let bok = false;
        if (bok) {
            clearInterval(fixedtop.timer)
        }
        bok = true;
        let winScroll = util.win('scrollTop');
        let winClient = util.win('clientHeight');
        if (winScroll >= winClient) {
            fixedtop.style.display = 'block';
        } else {
            fixedtop.style.display = 'none';
        }
    };

    function move() {
        let wcc_timer=setInterval(function () {
            var nowT=win('scrollTop');
            win('scrollTop',nowT+=5);
            window.addEventListener('mousewheel',function () {
              clearInterval(wcc_timer);
            },false);
           if(win('scrollTop')>=wcc_main_top){
               clearInterval(wcc_timer);
               win('scrollTop',wcc_main_top);
           }
        },)
        // wcc_main.style.display='none'


    }
let choiceItem = (function () {

    let items1 = choice.getElementsByClassName('choice-item');
    let aside = document.getElementById('aside');
    let items2 = aside.getElementsByClassName('choice-item');

    function link(items, i) {
        items[i].index = i;
        for (var j = 0; j < items.length; j++) {
            items[j].classList.remove('active');
        }
        items[i].classList.add('active');
    }

    for (let i = 0; i < items1.length; i++) {
        items1[i].index = i;
        items1[i].onclick = function () {
            for (var j = 0; j < items1.length; j++) {
                items1[j].classList.remove('active');
            }
            this.classList.add('active');
            List.style.display='block';
            link(items2, i);
            bindHtml();
            ajax();
            move();
            for (var n = 0; n < imgs.length; n++) {
                lazyImg(imgs[n]);
            }
        }
    }
    for (let k = 0; k < items2.length; k++) {

        items2[k].index = k;
        items2[k].onclick = function () {
            for (var j = 0; j < items2.length; j++) {
                items2[j].classList.remove('active');
            }
            this.classList.add('active');
            List.style.display='block';
            link(items1, k);
            bindHtml();
            ajax();
            move();
            for (var n = 0; n < imgs.length; n++) {
                lazyImg(imgs[n]);
            }

        }
    }
})();
})();
