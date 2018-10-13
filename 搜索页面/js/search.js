let $search=(function () {
    let  $searchOuter=$('.outer_lock');
    let $H=$searchOuter[0].offsetHeight;
    let $sideBottom=$('.sideBottom');
    $(window).scroll(function () {
        let T=$(window).scrollTop();
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
    });
    $sideBottom.on('click',function () {
        $('html , body').animate({scrollTop: 0},'slow');

    })

    return {
        init:function () {

        }
    }
})();

let $goodsSort=(function () {
        let $first_goods_wall=$(".first_goods_wall");
        let $commendKeys=$(".commendKeys ul");
        let $imgData=null;
        let $hotData=null;
        function ajax() {
            $.ajax({
                url:"data/search/imageData.json",
                method:'get',
                async:false,
                dataType:'json',
                success:function (n) {
                  $imgData=n;
                    bindHtml();


                }
            });
$.ajax({
    url:'data/search/hotData.json',
    method:'get',
    async:false,
    dataType:'json',
    success:function (n) {
        $hotData=n;

hotHtml()
    }
})
        }
        function hotHtml() {
            let hotStr=``;
            $.each($hotData,function () {
                hotStr+=`
                <li class="key">
                   
                    <i></i>
                    <a href="javascript:;">
                        ${this.title}
                    </a>
                </li>`
            });
            $commendKeys.html(hotStr);
        }

        function bindHtml() {
            let imgStr=``;
            $.each($imgData,function (index,item) {
                imgStr+=`<div class="goods_wall_item">
             <a href="javascript:;" class="likeLink">找相似</a>
             <a href="javascript:;" class="goods_img_box">
                 <img data-src="${this.src}" alt="">
             </a>
             <a href="javascript:;" class="goods_txt_detail">
                 <p class="title_txt f1">
                    ${this.detail}
                 </p>

                 <div class="goods_info f1 clear">
                     <b class="price_info">${this.nowPrice}</b>
                     <p class="or_price_info">
                         <span >${this.oldPrice}</span>
                     </p>
                     <span class="collect">
                        <img src="image/search/star.png" alt="">
                        ${this.collectStar}
                    </span>
                 </div>
             </a>
         </div>`;

            });

$first_goods_wall.html(imgStr);
 lazyImg();

        }


    function lazyImg() {
        $('.goods_img_box img').each(function (index) {
            let that = this;
            let newImg = new Image();
            let url= $(this).attr('data-src');
            newImg.src = url;
            $(newImg).load(function () {
                $(that).attr('src', this.src);
                newImg = null;
            })
        })
    }
    return{
        init:function () {
ajax()
        }
    }
})();
