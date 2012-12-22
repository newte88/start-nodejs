#工作笔记


##技术知识点.
* 模板里面减少逻辑处理
* 跨域 Ajax 请求 - demo


## others
* 郑琼 - 13018119890206736X
* 银行卡号 - 6225880125035445

##Google 服务.
http://www.google.com/s2/favicons?domain=


##起始页.
不再使用的:
v3淘宝
v3书籍
v2淘宝

466 使用 v2 版本数据.

v3/v2.


##URI收集
+ <http://loadinggif.com/>
+ <http://club.excelhome.net/thread-511876-1-1.html>
+ <http://surda.cn/2010/08/excel-sum-function/>
+ <http://surda.cn/i/excel/>
+ <http://www.rlcg.net/pc/256/v.html?256-0-0>
+ <http://www.jquerytools.org/documentation/tabs/index.html>
+ <http://www.jquerytools.org/documentation/tabs/slideshow.html>
+ <http://www.jquerytools.org/demos/tabs/multiple.html>
+ <http://www.w3cplus.com/solution/tabs/tabs.html>
+ <https://github.com/JacksonTian/bagpipe>
+ <http://nodejs.org/api/>
+ <https://creative.adobe.com/apps>
+ <http://help.dottoro.com/>
+ <http://dean.edwards.name/weblog/>
+ <http://code.google.com/p/ie7-js/>
+ <http://www.youyur.com/home>
+ <http://www.w3cplus.com/solution/index/index.html>
+ <http://css-tricks.com/examples/ShapesOfCSS/>
+ <https://github.com/JacksonTian/modulelint>
+ <http://developer.yahoo.com/yql/>
+ <https://developer.mozilla.org/en-US/docs/Gecko_DOM_Reference>
+ <http://css-tricks.com/css-media-queries/>
+ <http://cn.opera.com/docs/specs/presto28/css/cssom/>
+ <http://www.w3.org/html/ig/zh/wiki/Cssom-view>
+ <https://developers.google.com/speed/libraries/devguide?hl=zh-CN#jquery>
+ <http://lea.verou.me/css3patterns/>
+ <http://html.adobe.com/edge/>
+ <http://jimpunk.net/Loading/?page_id=9>
+ <http://cdnjs.com/>
+ <http://google-styleguide.googlecode.com/svn/trunk/htmlcssguide.xml>
+ <http://kan.weibo.com/kan/3484025184801857>
+ <http://countdownjs.org/>
+ <https://github.com/stubbornella/oocss>
+ <http://wiki.csswg.org/test/format#requirement-flags>
+ <http://wiki.csswg.org/test/format#template-details>
+ <http://modernizr.com/>
+ <http://www.guidgen.com/>
+ <http://wufoo.com/>
+ <http://craig.is/killing/mice>
+ <http://www.adobe.com/cn/devnet/html5/articles/css3-regions.html>
+ <thunder://QUFlZDJrOi8vfGZpbGV8WyVEMyVCMCVENyVEMyVBNCVDRTZwYXJrLmNvbV0lMjAwODEwMTItMDk3LWNhcmliLS53bXZ8MTE4NTc5MzU2Nnw1NjE4RUQ2N0E3OURBREZEOTEyNEVGMDRENzY0QTdFMnwvWlo=>

##前端工程师要求
* DOM结构 —— 两个节点之间可能存在哪些关系以及如何在节点之间任意移动。
* DOM操作 ——如何添加、移除、移动、复制、创建和查找节点等。
* 事件 —— 如何使用事件，以及IE和标准DOM事件模型之间存在的差别。
* XMLHttpRequest —— 这是什么、怎样完整地执行一次GET请求、怎样检测错误。
* 严格模式与混杂模式 —— 如何触发这两种模式，区分它们有何意义。



##交流会总结.
* 站在巨人的肩上.
* 聚合资源 - 不同平台/**不同生态系统**.
* 为什么写出来的代码不容易测试.
* 成本 = 时间成本 + 技术成本 + 人力成本
* 不要从根本上推翻重新开始.
    1. 旧系统的 80% 是优秀的, 重新开始不一定比原来的好.
    2. 20% 是不好的, 一定可以超越; 但最后还会存在 80% 优秀, 20% 差.
* JavaScript 保留开关接口. 默认不执行. 
    就像 apache 保留很多功能, 但不一定都适用于各自的服务器.
* 形像工程要放在最后处理 - 界面并不是产品实用点, 尽管它不可或缺.
* 数据驱动产品, 技术驱动产品.
* 缓存策略, 需要站在全站级考虑.
* what + when + where + who + why




##PHP 代码.
###php 下载文件.
        function downloadFile($file){
            $file_name = $file;
            $mime = 'application/force-download';
            header('Pragma: public');   // required
            header('Expires: 0');       // no cache
            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
            header('Cache-Control: private',false);
            header('Content-Type: '.$mime);
            header('Content-Disposition: attachment; filename="'.basename($file_name).'"');
            header('Content-Transfer-Encoding: binary');
            header('Connection: close');
            readfile($file_name);       // push it out
            exit();
        }

        
        
        
