var $searchBox = (function () {


    return {
        init: function () {

        }
    }
})();

var $firstBanner = (function () {
    let $bannerData = null;
    let $indexPageData = null;
    let $swiper = $('#swiper');
    let $imgList = $('#swiper img');
    let $bannerStep = 0;
    let $bannerTimer = null;
    let $banner = $('#wcc_banner');
    let $focusTip = $('#first_focus');
    let $indexPage = $('#indexPage');
    let $goods_img = $('.goods_img');
    let $warp_left=$(".warp-left");
    let $wup=$("#wup");
    let changs=0;
    let chanr=0;
    let chans=0;
    let chany=0;



    function ajax() {
        $.ajax({
            url: 'data/banner.json',// 请求地址
            method: 'get', // 请求方式
            async: false, // 是否异步
            dataType: 'json', // 要求返回数据格式
            success: function (n) { // 成功执行方法
                $bannerData = n;
                bindHtml();

            }
        });
        $.ajax({
            url: 'data/indexPage.json',
            method: 'get',
            async: false,
            dataType: 'json',
            success: function (n) {
                $indexPageData = n;
                indexPageHtml();

            }
        })
    }

    function bindHtml() {
        var imgStr = ``, liStr = ``;
        $.each($bannerData, function (index, item) {
            imgStr += `<img data-src="${this.src}" alt="">`;
            liStr += `<li class="${index == 0 ? 'selected_focus' : ''}"><img src="${index == 0 ? 'img/image/index/swiper_button2.png' : ''}" alt=""></li>`
        });

        $swiper.html(imgStr);
        $focusTip.html(liStr);
        lazyImg();

    }

    function indexPageHtml() {
        let outIndexPageStr = ``,
            indexPageStr = ``,
            goods_imgStr = ``,
            goods_imgBoxStr = ``,
            aImg = ``,
            goods_info_top = ``,
            goods_info_details = ``,
            goods_info_top1 = ``,
            goods_info_top2 = ``,
            goods_info_details1 = ``,
            goods_info_details2 = ``,
            nb=null;
        $.each($indexPageData, function (index, item) {
            indexPageStr += ` <li class="list_leader">
                        <a href="../详细页面/second.html" class="row1">${item.name}</a>
                    </li>
`;
            $.each(item.property, function (index, item) {
                var Imgsrc="img/image/index/menu_H.png";
                changs++;
                nb=changs%4==0||changs%6==0? 'color':null;

                indexPageStr += `<li class="list_leader">
                        <a href="../详细页面/second.html" class="${nb}" alt="">${item}</a>
                        <i class="change">
                            <img src="${changs%4==0||changs%5==0?Imgsrc:null}" alt="">
                        </i>
                    </li>`;
            });



            goods_info_top += `<div class="goods_info_top">
                                    <span class="hot_sale">${item.little_name[0].name}</span>
                                    <span class="goods_info_more">更多＞</span>
                                </div>`;

            $.each(item.little_name[0].allNumber, function (index, item) {
                chanr++;
                goods_info_details += `<a href="../详细页面/second.html" class="${chanr%4==0||chanr%3==0? 'color' :null}" >${item}</a>`;

            });
            indexPageStr += `<div class="hidden_menu_box">
                        <div class="goods_info">
                            <div class="goods_info_txt">${goods_info_top} <div class="goods_info_detail">${goods_info_details}</div>`;
            goods_info_top1 += `<div class="goods_info_top">
                                    <span class="hot_sale">${item.little_name[1].name}</span>
                                    <span class="goods_info_more">更多＞</span>
                                </div>`;


            $.each(item.little_name[1].allNumber, function (index, item) {
                chany++;
                goods_info_details1 += `<a href="../详细页面/second.html" class="${chany%4==0||chany%5==0? 'color' :null}">${item}</a>`;

            });
            indexPageStr += `${goods_info_top1}<div class="goods_info_detail">${goods_info_details1}</div>`;


            goods_info_top2 += `<div class="goods_info_top">
                                    <span class="hot_sale">${item.little_name[2].name}</span>
                                    <span class="goods_info_more">更多＞</span>
                                </div>`;
            $.each(item.little_name[2].allNumber, function (index, item) {
                chans++;
                goods_info_details2 += `<a href="../详细页面/second.html" class="${chans%4==0||chans%6==0? 'color' :null}">${item}</a>`;

            });
            indexPageStr += `${goods_info_top2}<div class="goods_info_detail">${goods_info_details2}</div> </div>`;


            $.each(item.more, function (index, item) {
                goods_imgStr += `<li>
                                        <a href="../详细页面/second.html">
                                            <div class="img_box">
                                                <img src="${item.src}" alt="">
                                            </div>
                                            <div>
                                                <span>${item.alt}</span>
                                            </div>
                                        </a>
                                    </li>`;

            });

            goods_imgBoxStr = `<div class="goods_img">
                                <h3>/猜你喜欢/</h3>
                                <ul>
                                   ${goods_imgStr}
                                </ul>
                            </div>`;
            $goods_img.html(goods_imgBoxStr);
            indexPageStr += `${goods_imgBoxStr}
                              </div>
                    </div>
                </ul>`;

            indexPageStr = `<ul class="menu_list clear">${indexPageStr}`;
            outIndexPageStr += `${indexPageStr}`;
            indexPageStr = ``,
                goods_imgStr = ``,
                goods_imgBoxStr = ``,
                aImg = ``,
                goods_info_top = ``,
                goods_info_details = ``,
                goods_info_top1 = ``,
                goods_info_top2 = ``,
                goods_info_details1 = ``,
                goods_info_details2 = ``
        });


        $indexPage.html(outIndexPageStr);


    }


    //给主导航随机变化字体颜色

    function lazyImg() {
        $('#swiper img').each(function (index) {
            let that = this;
            let newImg = new Image();
            let url = $(this).attr('data-src')
            newImg.src = url;
            $(newImg).load(function () {
                $(that).attr('src', this.src);
                newImg = null;
                index === 0 ? $(that).fadeIn(500) : null;
            })
        })
    }

    function auto() {
        $bannerTimer = setInterval(autoMove, 2000);
    }

    function autoMove() {
        // 0 1 2 3 4
        $bannerStep++; // 1 2 3 4 5
        if ($bannerStep >= $bannerData.length) {
            $bannerStep = 0
        }


        $('.swiper img').eq($bannerStep).fadeIn(1000).siblings().fadeOut();
        $banner.css({'background': $bannerData[$bannerStep].backgroundColor});
        $('#first_focus li').eq($bannerStep).addClass('selected_focus').siblings().removeClass('selected_focus');

        $('#first_focus li img').eq($bannerStep).attr('src', 'img/image/index/swiper_button2.png');
    }

    function hover() {
        $swiper.hover(function () {
            clearInterval($bannerTimer);
        }, function () {
            $bannerTimer = setInterval(autoMove, 2000)
        });
        $('#first_focus li').hover(function () {
            clearInterval($bannerTimer)
            $bannerStep = $(this).index() - 1;
            autoMove()
        });
    }

    function show(){
        $warp_left.on('mouseenter',function(){
            $indexPage.addClass('show');


            $(window).scroll(function(){
                if($wup.css("display")=='none'){
                    $indexPage.removeClass("show");


                }
            })
        })

        $indexPage.on('mouseleave',function(){
            $indexPage.removeClass("show");

        })


    }



    return {
        init: function () {
            ajax();
            auto();
            hover();
            show();
        }
    }

})();
var secondParts=(function () {
    let active = document.getElementById('active');
    /*let uls = active.getElementsByTagName('ul');
     let lis = active.getElementsByTagName('li');
     let imgs = active.getElementsByTagName('img');*/
    let littleLeft=document.getElementsByClassName('littleLeft')[0];
    let littleRight=document.getElementsByClassName('littleRight')[0];
    let data=null;
    let step =0;
    let rightSide=document.getElementsByClassName('rightSide')[0];
    let isClick = true;
    let xhr = new XMLHttpRequest();
    xhr.open('get','data/secondParts.json',false);
    xhr.onreadystatechange = function () {
        if(xhr.readyState===4&&xhr.status===200){
            data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
    console.log(data);

    function bindHtml(data) {
        let ulsStr = ``;
        for(var i=0;i<data.length;i++){
            ulsStr+=`<ul>
                     <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[i].img1}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[i].title1}</h3></a>
                                <span class="left">￥${data[i].price1}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[i].img2}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[i].title2}</h3></a>
                                <span class="left">￥${data[i].price2}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[i].img3}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[i].title3}</h3></a>
                                <span class="left">￥${data[i].price3}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[i].img4}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[i].title4}</h3></a>
                                <span class="left">￥${data[i].price4}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                    </ul>`;
        };
        ulsStr+=`<ul>
                     <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[0].img1}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[0].title1}</h3></a>
                                <span class="left">￥${data[0].price1}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[0].img2}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[0].title2}</h3></a>
                                <span class="left">￥${data[0].price2}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[0].img3}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[0].title3}</h3></a>
                                <span class="left">￥${data[0].price3}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                        <li>
                            <a href="../商品详情/like-secondary.html">
                                <img src="img/Image/${data[0].img4}" alt="">
                            </a>
                            <div class="describe">
                                <a href="../商品详情/like-secondary.html"><h3>${data[0].title4}</h3></a>
                                <span class="left">￥${data[0].price4}</span>
                                <span class="right"><del>￥90.00</del></span>
                            </div>
                        </li>
                    </ul>`;
        active.innerHTML = ulsStr;
        utils.css(active,'width',960*(data.length+1));
    }
    bindHtml(data);

    timer = setInterval(autoMove,2500);
    function autoMove() {
        if(step>=data.length){
            step=0;
            utils.css(active,'left',0)
        }
        step++;
        animate(active,{left:step*-960},300,function () {
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
            if(step<=0){
                step=data.length;
                utils.css(active,'left',-960*step);
            }
            step--;
            animate(active,{left:step*-960},300,function () {
                isClick=true;

            });}
    };


})();
var threeParts=(function () {
    let classPhotoTop = document.getElementById('classPhotoTop');
    let classMany = document.getElementById('classMany');
    let wheel = classMany.getElementsByClassName('wheel')[0];
    let topBtnL = document.getElementsByClassName('topBtnL')[0];
    let topBtnR = document.getElementsByClassName('topBtnR')[0];

    let step = 0;
    let data = null;
    let isClick = true;

    let xhr = new XMLHttpRequest();
    xhr.open('get', 'data/threeParts.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();

    function bindHtml(data) {
        let ulsStr = ``;
        data.forEach(function (item, index) {
            ulsStr += ` <li>
                        <a href="../商品详情/like-secondary.html" class="show">
                            <img src="img/Image/${item.img }" alt="">
                            <p class="title">${item.title}</p>
                            <p class="money">￥${item.price}</p>
                        </a>
                    </li>`;
        });
        for (var i = 0; i < 4; i++) {
            ulsStr += ` <li>
                        <a href="../商品详情/like-secondary.html" class="show">
                            <img src="img/Image/${data[i].img }" alt="">
                            <p class="title">${data[i].title}</p>
                            <p class="money">￥${data[i].price}</p>
                        </a>
                    </li>`;
        }
        wheel.innerHTML = ulsStr;
        utils.css(classMany, 'width', 960 * (data.length / 4 + 1));
    }
    bindHtml(data);

    classPhotoTop.timer= setInterval(autoMove, 2500);
    function autoMove() {
        if (step >= (data.length / 4)) {
            step = 0;
            utils.css(classMany, 'left', 0)
        }
        step++;
        animate(classMany, {left: step * -960}, 300, function () {
            isClick = true;
        });
    }

    classPhotoTop.onmouseover = function () {
        clearInterval(this.timer);
    };

    classPhotoTop.onmouseout = function () {
        this.timer = setInterval(autoMove, 2500);
    };

    topBtnR.onclick = function () {
        if(isClick){
            isClick=false;
            autoMove();
        }
    };
    topBtnL.onclick = function () {
        if (isClick) {
            isClick = false;
            if (step <= 0) {
                step = data.length / 4;
                utils.css(classMany, 'left', -960 * step);
            }
            step--;
            animate(classMany, {left: step * -960}, 300, function () {
                isClick = true;
            });
        }
    };

})();
var fourParts = (function () {
    let Like = document.getElementById('like');
    let List = document.getElementById('list');
    let uls = List.getElementsByTagName('ul');
    let contents=document.getElementsByClassName('content');
    let data = null;
    let minH = null;
    let stop = 0;
    //var ajax = function () {
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
    console.log(data);
//var bindHtml = function (n) {
    function bindHtml(n) {
        let str = ``;
        let ary = [];
        data.forEach(function (item, index) {
            let num = Math.round(Math.random()*74);
            ary.push(num);
            if (ary[length - 1] === num) {
                num = Math.round(Math.random()*74)
            }
            str += `<li>
                <div class="lis_top" onclick="window.location.href = '../商品详情/like-secondary.html'">
                <img class="img0" data-src="${data[num].img}" /*src="${data[num].img}"*/ alt="">
                
                <div class="hidden">找相似</div>
                </div>
                <a href="../商品详情/like-secondary.html">
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
    let winH = document.documentElement.clientHeight || document.body.clientHeight
    let imgs = document.getElementsByClassName('img0');
//var lazyImg = function (ele) {
    for (var i = 0; i < imgs.length; i++) {
        lazyImg(imgs[i]);
    }
    let hots = document.getElementsByClassName('hot');

    for (var i = 0; i < hots.length; i++) {
        if ((i +1) % 5 == 0) {
            hots[i].style.display = 'block';
        } else {
            hots[i].style.display = 'none';
        }
    }
    for (var i = 0; i < contents.length; i++) {
        if ((i +1) % 5 == 0) {
            contents[i].style.height = '20px';
        }
    }

//var lazyImg=function (ele) {

    function lazyImg(ele) {
        let winT = document.documentElement.scrollTop || document.body.scrollTop;
        if (winT + winH > minH) {
            let newImg = new Image;
            // console.log(ele.getAttribute);
            let url = ele.getAttribute('data-src');
            //console.log(ele);
            newImg.src = url;
            newImg.onload = function () {
                ele.src = this.src;
                newImg = null;
                ele.load = true;
                ele.parentNode.style.background = 'none';

            }
        }
    }



})();
var banner = (function (j) {
    let f1 = 'mainContent' + j
    let mainContent = document.getElementById(f1);
    let f2 = 'leftBanner' + j
    let macroplate = document.getElementById('macroplate' + j);
    let leftBanner = document.getElementById(f2);
    let f3 = 'banners' + j
    let banner = document.getElementById(f3);
    let imgs = document.getElementsByTagName('img');
    let f4 = 'middleBanner' + j
    let middleBanner = document.getElementById(f4);
    let f5 = 'xintian' + j
    let xintian = document.getElementById(f5);
    let f6 = 'Swiper' + j
    console.log(f6);
    let Swiper = document.getElementById(f6);
    console.log(middleBanner);
    let lis = middleBanner.getElementsByTagName('li');
    let f7 = 'rightBanner' + j
    let rightBanner = document.getElementById(f7);
    let f8 = 'random' + j
    let random = document.getElementById(f8);
    let f9 = 'spans' + j
    let spans = document.getElementById(f9);
    console.log(spans);
    let liss = random.getElementsByTagName('li');
    let rightr = null;
    let centen = null;
    let leftr = null;
    let data = null;
    let times = null;
    let timer = null;
    let step = 0;
    let stop = 0;
    let dd = 1;

    function bindHtml(left, central) {
        let imgStr = ``;
        let imgItr = ``;
        let data1 = left;
        let data2 = central;
        console.log(rightr);
        centen = central;
        leftr = left;
        /* let data1=data[0][0];
         let data2=data[0][2];*/
        console.log(data2);
        for (var i = 0; i < data1.length; i++) {
            imgStr += ` <a href="../商品详情/like-secondary.html" class="clearfix"><img src="${data1[i].src}" alt=""></a>`
        }
        imgStr += ` <a href="../商品详情/like-secondary.html" class="clearfix"><img src="${data1[0].src}" alt=""></a>`;
        banner.innerHTML = imgStr;
        utils.css(banner, 'width', 230 * (data1.length + 1));


        for (var j = 0; j < data2.length; j += 6) {
            imgItr += `<div class="Swiper" id="Swiper">
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[j].src}" alt="">
                     <p>${data2[j].title}</p>
                     <span>￥${data2[j].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[j + 1].src}" alt="">
                     <p>${data2[j + 1].title}</p>
                     <span>￥${data2[j + 1].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[j + 2].src}" alt="">
                     <p>${data2[j + 2].title}</p>
                     <span>￥${data2[j + 2].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[j + 3].src}" alt="">
                     <p>${data2[j + 3].title}</p>
                     <span>￥${data2[j + 3].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[j + 4].src}" alt="">
                     <p>${data2[j + 4].title}</p>
                     <span>￥${data2[j + 4].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[j + 5].src}" alt="">
                     <p>${data2[j + 5].title}</p>
                     <span>￥${data2[j + 5].price}</span>
                 </a>
               </div>`;
            dd++;
        }
        imgItr += `<div class="Swiper" id="Swiper">
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[0].src}" alt="">
                     <p>${data2[0].title}</p>
                     <span>￥${data2[0].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[1].src}" alt="">
                     <p>${data2[1].title}</p>
                     <span>￥${data2[1].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[2].src}" alt="">
                     <p>${data2[2].title}</p>
                     <span>￥${data2[2].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[3].src}" alt="">
                     <p>${data2[3].title}</p>
                     <span>￥${data2[3].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[4].src}" alt="">
                     <p>${data2[4].title}</p>
                     <span>￥${data2[4].price}</span>
                 </a>
                 <a href="../商品详情/like-secondary.html">
                     <img src="${data2[5].src}" alt="">
                     <p>${data2[5].title}</p>
                     <span>￥${data2[5].price}</span>
                 </a>`;

        xintian.innerHTML = imgItr;
        utils.css(xintian, 'width', 630 * dd);
    }


    function auto(left) {
        times = setInterval(autoMoves.bind(null, left), 4000);
        timer = setInterval(autoMove, 5000);

    }

    function autoMove() {
        var data1 = leftr;
        /*var data1=data[0][0];*/
        if (step >= leftr.length) {
            step = 0;
            banner.style.left = 0;
        }
        step++;
        banner.style.left = step * -230 + 'px';
    }

    function autoMoves(right) {
        var data2 = right;
        rightr = right;
        /*var data2=data[0][1];*/
        if (stop >= dd - 1) {
            stop = 0;
            xintian.style.left = 0;
        }
        stop++;
        animate(xintian, {left: stop * -630}, 300)
        focusTip()
    }

    //小圆点滚动
    function focusTip() {
        for (var i = 0; i < lis.length; i++) {
            if (stop === i) {
                lis[i].classList.add('selected')
            } else {
                lis[i].classList.remove('selected')
            }
            if (stop === dd - 1) {
                lis[0].classList.add('selected')
            }
        }
    }

//滑入停止滑入继续
    function mousemove(right) {
        middleBanner.onmousemove = function () {
            clearInterval(times);
        };
        middleBanner.onmouseout = function () {
            times = setInterval(autoMoves.bind(null, right), 4000);
        };
    }

    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            stop = i - 1;
            autoMoves( rightr)
        }

    }
    spans.onclick = function () {
        random.innerHTML = null;
        mock(centen)
    }
    function mock(centen) {
        let ary = [];
        for (var l = 0; l < 4; l++) {
            let data3 = centen;
            let num = Math.round(Math.random() * 19);
            if (ary.includes(num)) {
                l--;
            } else {
                ary.push(num);
                random.innerHTML += `<li>
            <a href="../商品详情/like-secondary.html">
                <img src="${data3[num].src}" alt="">
              <div>  
                <p>${data3[num].title}</p>
                <span>${data3[num].price}</span>
            </div>
            </a></li>`
            }
        }
    }

    document.onvisibilitychange = function () {
        if (document.visibilityState == "hidden") {
            clearInterval(times);
            clearInterval(timer)
        } else {
            times = setInterval(autoMoves.bind(null, rightr), 4000);
            timer = setInterval(autoMove, 4000);
        }
    };

    return {
        init: function (j, location, left, right, centen) {

            bindHtml(left, centen);
            auto(left);
            autoMove(left);
            autoMoves(right);
            mousemove(right);
            mock(centen)
        }
    }
});
var  multiterm=(function () {
    $searchBox.init();
    $firstBanner.init();

    function banners() {
        var data=null;

        let xhr=new XMLHttpRequest();
        xhr.open('get','data/mainContent.json',false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState==4&&/^2\d{2}$/.test(xhr.status)){
                data=JSON.parse(xhr.responseText);

            }
        };
        xhr.send();

        for(var w=0;w<6;w++){
            var data1=data[w][0];
            var data2=data[w][1];
            var data3=data[w][2];
            banner(w).init(w,'data/mainContent.json',data1,data2,data3);

        }
    }
    banners()


    function jshiq() {
        let countDown = document.getElementById('countDown');
        let countHour = countDown.getElementsByClassName('countHour')[0];
        let countMinute = countDown.getElementsByClassName('countMinute')[0];
        let countSecond = countDown.getElementsByClassName('countSecond')[0];
        function checkTime(i) {
            if(i<10){
                i='0'+i;
            }
            return i;
        }
        setInterval(function () {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();
            timeStr = `${year}-${month}-${day} 24:00:00`;
        },1000);
        function lastTime() {
            let nowTime = new Date().getTime();
            let target = new Date(timeStr) - nowTime;
            let hour = Math.floor(target%(1000*60*60*24)/(1000*60*60));
            let minute = Math.floor(target%(1000*60*60*24)%(1000*60*60)/(1000*60));
            let second = Math.floor(target%(1000*60*60*24)%(1000*60*60)%(1000*60)/1000);
            hour=checkTime(hour);
            minute=checkTime(minute);
            second=checkTime(second);
            countHour.innerHTML=`${hour}`;
            countMinute.innerHTML=`${minute}`;
            countSecond.innerHTML=`${second}`;
        }
        setInterval(()=> {
            lastTime(timeStr);
        },1000);
    }
jshiq();

})();

