#Markdown 练习#

    这里是 script 代码, 并不执行.
    <script type="text/javascript">
        alert( 'test' );
    </script>

下面 `JavaScript` 会直接执行. 
<script type="text/javascript">
    if ( !window.console ) {
        window.console = {
            log: function () {}
        };
    }

    console.log( 'log' );
</script>

在行尾添加两个空格, 然后回车, 最后结果为 `<br />`  
**注意编辑器, 自动会把末尾的空格删除掉.**   
测试段落. 哈哈.   
test end!

使用 `html` 标签.

Just the `markdown` library.

        npm intsall markdown.

Also install `md2html` to `/user/local/bin` (or whereever)

        npm install -g markdown

> 引用, 是使用 `>` 符号.  
> 北京傲游天下科技有限公司 
> 这里再使用 `<b></b>`, 会原样显示.  
>   test the world.


    <div>test</div>
    1987\.baidu.com.
    console.log( 'test' );
    /JavaScript/.test( 'javascript' );


*from Beijing*

8:44 下午 星期六, 十二月 15, 2012

<img src="/images/desk.jpg" width="400px" /></img>

<!-- Markdown 注释同 HTML 标签 -->
<!-- ![desk](/images/desk.jpg) -->

可以直接在行内写代码, 仅需要使用 \` 包括即可. 比如: `console.log( 'test' );`

<button>what can i do for you ?</button>

-------------------------------------------------


#使用 Sublime Text 2 编辑 Markdown#

一. **安装**

1. 下载 [Sublime Text 2](http://www.sublimetext.com/)
2. 安装


二. **安装 Package Control**

1. 按 Ctrl + \` 打开 console
2. 粘贴代码到 Console 并回车
3. 重启 Sublime Text 2

		**import urllib2,os;
        pf='Package Control.sublime-package';
        ipp=sublime.installed_packages_path();
        os.makedirs(ipp) if not os.path.exists(ipp) else None;
        open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())**


三. **安装 Markdown Preview**

1. 按 Ctrl + shift + P
2. 输入 pci 后回车( Package Contrl: install Package)
3. 稍等...^_^
4. 输入 Mackdown Preview 回车.


四. **编辑**

1. 按 Ctrl + N 新建一个文档.
2. 按 Ctrl + shift + p
3. 使用Markdown语法编辑文档
4. 语法高亮，输入ssm 后回车(Set Syntax: Markdown)


五、**在浏览器预览Markdown文档**

1. 按Ctrl + Shift + P
2. 输入mp 后回车(Markdown Preview: current file in browser)
3. 此时就可以在浏览器里看到刚才编辑的文档了


[@redky]: http://weibo.com/redky
[466.com]: http://466.com/


End!

