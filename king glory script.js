toastLog("有问题联系 triplewang@qq.com");
var 当前版本 = 15;
var 云端版本;
var 脚本名称="手机刷金币";
var storage = storages.create(脚本名称);
var 使用说明 = "t.cn/EvkWM4n";
var 下载链接 = "https://www.lanzous.com/b381453/";
var 检测更新链接="https://sharechain.qq.com/38ac4fe308ce9de2ed3f402047d0599d";
var PHONE=手机信息();
var 分辨率="FBL:"+PHONE.height+"*"+PHONE.width;
var Save分辨率=new Array(PHONE.height,PHONE.width);
var 是否需要更新=0;
var 提示更新的文字="";
var 点击间隔时间=1000;
var saveRoad="/sdcard/007小强脚本/王者荣耀刷金币手机分辨率.txt";
///////  ui相关参数设置  //////////
//PHONE.width=300;
var uicankaol=(PHONE.height>PHONE.width?PHONE.width:PHONE.height);
var uiw =parseInt(uicankaol/2.15);
var uitexth =parseInt(uicankaol/3/9*2.2);
var uimargin =parseInt(uicankaol/3/9/3);
var uimarginlr =parseInt(uicankaol/3/9/3/2);
var uitextwl =parseInt((uiw-uimargin)/2);
var uitextw =parseInt((uiw-uimargin)/2);
uiw=2*uitextw+2*uimarginlr; //  修正奇数个像素
var uitextsize =parseInt(uicankaol/3/9*2*0.74);
var uibgcolor   ="#8B7D7B";
var uitextcolor ="#ffffff";
var uimovecolor ="#43c080";
//log(uicankaol+" "+uiw+" "+uitexth+" "+uimargin+" "+uimarginlr+" "+uitextw+" "+uitextsize);

设置脚本名字(脚本名称+" v"+当前版本);
log(脚本名称+" v"+当前版本);
log("遇到问题要仔细看说明书");
log("如果脚本测得分辨率不对，进入<"+saveRoad+">手动修改");
log("脚本测得手机型号："+PHONE.device);
var readStr=读取内置文本数据(saveRoad);
if(readStr==false){
    files.write(saveRoad, PHONE.height+"*"+PHONE.width);
    log("保存手机分辨率为"+PHONE.height+"*"+PHONE.width);
}else{
    Save分辨率=readStr.split("*");
    Save分辨率[0]=parseInt(Save分辨率[0]);
    Save分辨率[1]=parseInt(Save分辨率[1]);
    分辨率="FBL:"+Save分辨率[0]+"*"+Save分辨率[1];
    log("读TxT手机分辨率为"+Save分辨率[0]+"*"+Save分辨率[1]);
}
alert("脚本申明","    本脚本完全免费，花钱买的都属被骗~~\n"
        +"    运行脚本需要一定性能，推荐手机内存4G以上~~\n"
        +"    游戏脚本属于第三方，有封号风险，胆大上车~~\n"
        +"\n    --小强");
        
检测更新(当前版本,检测更新链接);
无界面UI("王者荣耀-手机刷金币", 使用说明);

if(是否需要更新==2){
    log("强制更新! v"+云端版本);
    alert("检测到更新 v"+云端版本,"强制更新！否则无法使用\n"
    +"更新链接：说明书页面或群公告\n"
    +"更新说明："+提示更新的文字);
    app.openUrl(下载链接);
    exit();
}else if(是否需要更新==1){
    log("测试更新~ v"+云端版本);
    alert("内测更新 v"+云端版本,"内测更新，没问题别更新\n"
    +"更新方法：说明书页面手动下载\n"
    +"更新说明："+提示更新的文字);
}


log("请开启无障碍权限 否则卡住");
auto.waitFor();
log("开启无障碍权限 通过");
//console.show();

if(!requestScreenCapture()){
    toastLog("请求截图失败");
    exit();
}


sleep(100);
var pointWindow = floaty.rawWindow(
    <frame >
        <text  text="点" textSize="18px" w="20px"h="20px" bg="#00FF00"/>
    </frame>
);
pointWindow.setPosition(0,0);
pointWindow.setTouchable(false);

sleep(100);
var window = floaty.window(
    <frame alpha="0.9"w="{{uiw}}px">
        <vertical >
            <horizontal > 
                <text id="action"   textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginRight="{{uimarginlr}}px"   h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uimovecolor}}" text="开始"    />
                <text id="time"     textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginLeft="{{uimarginlr}}px"    h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uibgcolor}}"   text="倒计时"   />
            </horizontal> 
            <text id="fblHeight"    textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginTop="{{uimargin}}px"       h="{{uitexth}}px" w="{{uiw}}px"bg="{{uibgcolor}}"       text="{{分辨率}}"/>
            <horizontal marginTop="{{uimargin}}px"> 
                <text id="game"    textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginRight="{{uimarginlr}}px"   h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uibgcolor}}"   text="进游戏"     />
                <text id="end"      textColor="{{uitextcolor}}"textSize="{{uitextsize}}px" gravity="center"marginLeft="{{uimarginlr}}px"    h="{{uitexth}}px" w="{{uitextw}}px"bg="{{uibgcolor}}"   text="结束"     />
            </horizontal> 
        </vertical>
    </frame>
);
window.setPosition( parseInt(uicankaol*0.20),parseInt(uicankaol*0.30) );

var selectTime=0;
    runtime=60*60;  
    runFlag=0; 

setInterval(() => {
    ui.run(() => {
        window.time.setText(时间字符串(runtime--));
    });
    if(runtime==0||runtime==-1){
        home();
        endFunc();
    }
}, 1000);


window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});

function isMainView(img){
    if(img.height==PHONE.height) return;
    var color=["#cead70","#9d60e5","#8db7e0"];//金币 钻石 点券
    var point= new Array();
    for(var i = 0; i < 3; i++){
        point[i] = images.findColor(img, color[i], {
            region: [PHONE.height*0.4, PHONE.width*0, PHONE.height*0.5, PHONE.width*0.08],//一小块区域
            threshold: 0//完全匹配
        });
        if(point[i]==null) {//有一个没找到就不找了
            return false;
        }
    }
    if(point[0].x<point[1].x && point[1].x<point[2].x){
        return true;
    }else{
        return false;
    }
}

function isJumpBlueView(img){ //蓝色
    if(img.height==PHONE.height) return;//防止竖屏点击造成错误
    var color=["#daecf9","#02bfff"];
    var point= new Array();
    point[0] = images.findColor(img, color[0], {
        region: [PHONE.height*0.85, PHONE.width*0, PHONE.height*0.15, PHONE.width*0.1],//右上角区域
        threshold: 6//匹配程度
    });
    if(point[0]==null) {//有一个没找到就不找了
        return false;
    }
    point[1] = images.findColor(img, color[1], {
        region: [PHONE.height*0.85, PHONE.width*0.80, PHONE.height*0.15, PHONE.width*0.2],//右下角区域
        threshold: 6//匹配程度
    });
    if(point[1]==null) {//有一个没找到就不找了
        return false;
    }
    点击屏幕(point[0].x,point[0].y);
    return true;
}

function isNextView(img){//下一步按钮
    if(img.height==PHONE.height) return;
    var color=["#24557f","#dbedfa"];//蓝色 黄色
    var point= new Array();
    for(var i = 0; i < 2; i++){
        point[i] = images.findColor(img, color[i], {
            region: [PHONE.height*0.6, PHONE.width*0.7, PHONE.height*0.2, PHONE.width*0.2],//一小块区域
            threshold: 6//匹配程度
        });
        if(point[i]==null) {//有一个没找到就不找了
            return false;
        }
    }
    if(point[0].y<point[1].y){
        点击屏幕(point[1].x,point[1].y);
        return true;
    }else{
        return false;
    }
}

function isChuangView(img){//闯关按钮
    if(img.height==PHONE.height) return;
    var color=["#826137","#ffffff"];//
    var point= new Array();
    for(var i = 0; i < 2; i++){
        point[i] = images.findColor(img, color[i], {
            region: [PHONE.height*0.6, PHONE.width*0.7, PHONE.height*0.2, PHONE.width*0.2],//一小块区域
            threshold: 6//匹配程度
        });
        if(point[i]==null) {//有一个没找到就不找了
            return false;
        }
    }
    if(point[0].y<point[1].y){
        点击屏幕(point[1].x,point[1].y)
        return true;
    }else{
        return false;
    }
}

function onClick() {
    if(runFlag==0){
        ui.run(() => {
            window.action.setText("暂停");
        });
        runFlag=1;
        启动循环点击线程();
    }else{
        runFlag=0;
        ui.run(() => {
            window.action.setText("开始");
        });
        pointWindow.setPosition(0,0);
        循环点击线程.interrupt(); 
    }
}

function 暂停刷图函数() {
    if(runFlag==1){
        runFlag=0;
        ui.run(() => {
            window.action.setText("开始");
        });
        pointWindow.setPosition(0,0);
        循环点击线程.interrupt();  
    }
}

window.fblHeight.click(() => {
    alert("分辨率修改说明","    此按钮已不能修改分辨率，请百度自己手机的分辨率；若和脚本测得不相同，请根据说明书(分辨率设置章节)自行修改。\n"
    +"    修改后可解决大部分华为、荣耀、vivo、oppo等手机不可用问题~~");
});

window.end.click(() => {
    try {
        循环点击线程.interrupt(); 
    } 
    catch (error) {
        log(error);
    }
    endFunc();//结束脚本
});

function endFunc() {
    floaty.closeAll();
    engines.stopAll();
    exit();
    log("脚本正常结束");
}


window.game.click(()=>{
    window.fblHeight.setText(分辨率);
    setClip("");
    try {
        app.launch("com.tencent.tmgp.sgame");
    } catch (e) {
        log("拉起app失败");
    }
});


var 循环点击线程;
function 启动循环点击线程() {
    循环点击线程 = threads.start(function() {
        while(1){
            img = captureScreen();
            sleep(1000);//最快1秒钟轮询一次
            if( isMainView(img) ){
                点击屏幕(PHONE.height*0.75,PHONE.width*0.724);//进冒险模式 比例缩放 
                点击屏幕(PHONE.height*0.55,PHONE.width*0.5);//4选1冒险模式 比例缩放
                点击屏幕(PHONE.height*0.55,PHONE.width*0.5);//3选1冒险模式 比例缩放
                img = captureScreen();
                if( isNextView(img) ){//下一步按钮
                    sleep(500);
                    img = captureScreen();
                }
                if( isChuangView(img) ){ //闯关按钮
                    sleep(500);
                    img = captureScreen();
                    sleep(5000);
                };
            }
            if( isJumpBlueView(img) ){//跳过按钮
                sleep(500);
                img = captureScreen();
            }
        }
    });
}
function 点击屏幕(x,y) {
    x=x+random(-3,3);
    y=y+random(-3,3);
    //log("x: "+x+"  y:"+y);
    sleep(点击间隔时间*0.5);
    //移动绿色‘点’的位置
    pointWindow.setPosition(x-10,y-10);
    sleep(10);
    click(x,y);
    sleep(点击间隔时间*0.5);
}

window.time.click(() => {
    var alltime=[30,60,90,120,150];
    if(selectTime==alltime.length) 
    selectTime=0;
    runtime=alltime[selectTime]*60;
    ui.run(() => {
        window.time.setText(时间字符串(runtime));
    });
    selectTime++;
});

function 检测更新(num,url){
    threads.start(function(){  
        var checkUpdateResult=0;
        try {
            var res = http.get(url);
            if(res.statusCode == 200){
                log("update start");
                var httpstr = res.body.string();
                var index = httpstr.indexOf("bbh");
                if(index>0){
                    云端版本 = parseInt(httpstr.substring(index+3,index+5),10);
                    提示更新的文字=httpstr.substring(index+5,index+25);
                    log("本机版本号:"+num+" 最新版本号:"+云端版本);
                    if(云端版本>num)  checkUpdateResult=1;
                    else            checkUpdateResult=-1;
                }else{
                    log("index:"+index);
                    log("检测更新出现问题 请尽快联系开发者");
                }
            }
        } catch (error) {
            log("检测更新失败，但不影响使用");
        }
        if(checkUpdateResult==1){
            if(云端版本%2==0){
                是否需要更新=2;
            }else{
                是否需要更新=1;
            }
        }else if(checkUpdateResult==-1){
            log("当前为最新版");
        }else{
            log("检测更新出现问题 请尽快联系开发者");
        }
        log("update end");
    });
}

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
function 手机信息() {
    return {
        id: device.getAndroidId(),
        sdk: device.sdkInt,
        height: device.height,
        width: device.width,
        device: device.device,
        model: device.brand + " " + device.product,
    };
}


function 无界面UI(name, url) {
    var sdk = device.sdkInt;
    var str = "";
    if (sdk < 24) str = "无法启动脚本\n安卓版本低于7.0\n具体情况请查看说明书";
    else str = "直接启动脚本";
    while (true) {
        var i = dialogs.select(name, "退出脚本", "查看说明书", str,"脚本无毒->附送源码");
        if (i == -1) {
            toast("不想用就选择退出脚本");
            continue;
        } else if (i == 1) {
            toast("说明说网页地址已复制到剪贴板");
            setClip(url);
            app.openUrl(url);
            exit();
        } else if (i == 2) {
            if (sdk >= 24) break;
            else {
                toast("说明说网页地址已复制到剪贴板");
                setClip(url);
                app.openUrl(url);
                exit();
            }
        }else if (i == 3) {
            app.openUrl("https://github.com/m986883511/KingGloryBrushCoins/blob/master/README.md");
            exit();
        } else if (i == 0) exit();  
    }
}

function 时间字符串(time) {
    var min=parseInt(time/60);
    var sec=parseInt(time%60);
    if(sec<10) sec="0"+sec;
    return ""+min+":"+sec;
}

function 设置脚本名字(name){
    try {
        ui.run(() => {
            app.getCurrentActivity().getSupportActionBar().setTitle(name);
        });
    } catch (error) {
        log("设置脚本名字错误");
        log(error);
    }
    sleep(100);
}

function 读取内置文本数据(dir){
    files.createWithDirs(dir);
    if(files.exists(dir)){
        var str=files.read(dir);
        if(str==""){
            return false;
        }else{
            return str;
        }
    }else{
        return false;
    }
}