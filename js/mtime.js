$(function(){
    /*
     ** 顶部导航条
     */
    //左侧列表项的白色小三角形
    var $bar = $('.bar-left a');
    $bar.click(function () {
        $bar.removeClass('active');
        $(this).addClass('active');
    });


    /*
    **Banner广告图片轮播
     */
    // var $imgs = $('#banner img');           //获取所有图片
    // var $li = $('#banner-index li');       //获取底部所有小圆点按钮
    // var timer = null;                       //保存定时器序号
    // var i = 0;                              //保存图片下标值
    // function move(){
    //     timer = setTimeout(function(){
    //         $imgs.removeClass('active');
    //         $li.removeClass('active');
    //         i++;
    //         if(i == $imgs.length)
    //             i = 0;
    //         $imgs.eq(i).addClass('active');
    //         $li.eq(i).addClass('active');
    //         if(canMove)
    //             move();
    //     },3000)
    // }
    //move();                     //加载完页面，启动定时器
   // var canMove =true;          //标记变量，用来标记是否启用下次move
    // $('#banner').hover(function(){
    //     clearTimeout(timer);
    //     canMove=false;
    // },function(){
    //     canMove=true;
    //     move();
    // });

    // $('.banner-button').click(function(){
    //     $imgs.removeClass('active');
    //     $li.removeClass('active');
    //     if($(this).is('.picture-next')){
    //         i++;
    //         if (i == $imgs.length)
    //             i = 0;
    //     }else{
    //         i--;
    //         if(i < 0)
    //             i = 3;
    //     }
    //     $imgs.eq(i).addClass('active');
    //     $li.eq(i).addClass('active');
    // });

    //轮播方法
    /*
        参数是一个对象  { }
     */
    function slide(args) {
        /*
            option有需要指定默认值，如果args里面传了相同的值，那默认值就替换
            有些参数是必传的，有些是可选的
         */
        var option = {
            $el:args.$el,     //主选择器 '#slider' 必须唯一 必选参数
            $swiper:args.$swiper, //需要切换的对象  '.slider-item'   必选参数
            $swipe_dot:args.$swiper_dot,     //
            auto:args.auto?args.auto:false, //是否自动轮播
            delay:3000||args.delay,       //定时器的时长
        };
        var $swipe_items = $(option.$el).find(option.$swiper);  //所有切换的对象
        var $swipe_dot;        //所有小圆点按钮
        if(option.$swipe_dot){
            $swipe_dot = $(option.$swipe_dot);
        }

        var currentIndex = 0;  //当前切换的图片索引

        //切换的方法，需要切换第几张图
        function start(index) {
            //如果传过来的是index 等于图片数组的大小，说明切到最后一张了
            if(index==$swipe_items.length){
                currentIndex = 0;
            }
            //下面是具体的切换动作
            $($swipe_items).removeClass('active');
            $($swipe_dot).removeClass('active');
            $($swipe_items).eq(currentIndex).addClass('active');
            if($swipe_dot){
                $($swipe_dot).eq(currentIndex).addClass('active');
            }

        };
        //如果传的参数auto:true 就自动定时切换，定时时长也可以通过delay:3000传过来
        if(option.auto){
            setInterval(function () {
                start(++currentIndex)
            },option.delay)
        }
        //是否显示下面的小圆点 也是可以传值 过来的
        if($swipe_dot){
            //如果有小圆点，给加上点击事件，触发切换图片
            $($swipe_dot).click(function () {
               currentIndex = $(this).index()
               start(currentIndex);
            });
        }
        //两边的切换箭头  点击 切换 事件
        $('.banner-button').click(function(){
            if($(this).is('.picture-next')){
                start(++currentIndex)
            }else{
                start(--currentIndex)
            }
        });
    }

    /*调用slide方法，传的参数是一个对象
     {
         $el:'#banner',
         $swiper:'.slider-item',
         auto:true,
         $swiper_dot:'.dot'
     }
     */
    slide({
        $el:'#banner',
        $swiper:'.slider-item',
        auto:true,
        $swiper_dot:'.dot'
    })



    /*
     **最新的正在上映的电影，即将上映的电影，优惠活动
     */
    //顶部电影列表项切换，颜色的切换
    var $spans = $('.movie-lists span');
    $spans.mouseover(function () {
        $spans.removeClass('active');
        $(this).addClass('active');
    });

    //中间黑色按钮点击让电影列表项平移
    var $prevbtn = $('.movie-info-sale .prev-film-item');
    var $nextbtn = $('.movie-info-sale .next-film-item');
    var $filmlist = $('.film-select-all');
    $nextbtn.click(function(e){
        e.preventDefault();
        $filmlist.animate({marginLeft:-685},500,function(){
            $nextbtn.css('display','none');
            $prevbtn.css('display','block').click(function(e){
                e.preventDefault();
                $filmlist.animate({marginLeft:0, marginRight:-685},300,function(){
                    $prevbtn.css('display','none');
                    $nextbtn.css('display','block');
                })
            });
        });

    });



    /*
     **电影分类特色榜单，最新的各地区电影票房排行榜
     */
    //右侧地区电影票房排行榜
    var $lis = $('.movie-area li');
    var $uls = $('.movie-area-rank');
    $lis.mouseover(function(){
        var $this = $(this);
        $this.addClass('active').siblings().removeClass('active');
        var i = $lis.index($this);
        $uls.css('display','none');
        $uls.eq(i).css('display','block');
    });
});