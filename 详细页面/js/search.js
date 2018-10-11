let $search=(function () {
let  $searchOuter=$('.outer_lock');
let $H=$searchOuter[0].offsetHeight;
    window.onscroll=function () {
    let T=window.scrollY;

    if(T>=$H){
        $searchOuter.addClass('outer').removeClass('outer_lock');
    }else{
        $searchOuter.addClass('outer_lock').removeClass('outer')
    }
};

return {
    init:function () {
        
    }
}
})();

let $goodsSort=(function () {



    return{
        init:function () {

        }
    }
})();

