/**
 * Created by 29120 on 2018/9/21.
 */
//let LIKE = (function () {
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
            let num = utils.getRandom(0, 74);
            ary.push(num);
            if (ary[length - 1] === num) {
                num = utils.getRandom(0, 74);
            }
            str += `<li>
                <div class="lis_top">
                <img class="img0" data-src="${data[num].img}" /*src="${data[num].img}"*/ alt="">
                
                <div class="hidden">找相似</div>
                </div>
                <a href="">
                <p class="content">${data[num].content}</p>
                <p class="Hot">热卖</p>
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
    let winH = utils.win('clientHeight');
    let imgs = document.getElementsByClassName('img0');
//var lazyImg = function (ele) {
    for (var i = 0; i < imgs.length; i++) {
        lazyImg(imgs[i]);
    }
    let Hots = document.getElementsByClassName('Hot');

    for (var i = 0; i < Hots.length; i++) {
        if ((i +1) % 5 == 0) {
            Hots[i].style.display = 'block';
        } else {
            Hots[i].style.display = 'none';
        }
    }
for (var i = 0; i < contents.length; i++) {
    if ((i +1) % 5 == 0) {
        contents[i].style.height = '20px';
    }
}

//var lazyImg=function (ele) {

    function lazyImg(ele) {
        let winT = utils.win('scrollTop');
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


    /*for (var i = 0; i < imgs.length; i++) {
     lazyImg(imgs[i]);

     }
     for (var i = 0; i < hots.length; i++) {
     if (i % 5 === 0) {
     hots[i].style = 'block';
     } else {
     hots[i].style = 'none';
     }
     };*/


//     return {
//         init: function () {
//             ajax();
//             bindHtml();
//             lazyImg()
//         }
//     }
// })();
// LIKE.init();







