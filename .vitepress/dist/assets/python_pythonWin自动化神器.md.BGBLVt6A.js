import{_ as o,c as d,o as i,a4 as a,l as t,a as e}from"./chunks/framework.DF40YQsC.js";const n="/assets/image-20240531175340191.D304ffbY.png",r="/assets/image-20240531175357601.CRwj--JI.png",s="/assets/image-20240531175436707.DgSxmOk_.png",p="/assets/image-20240531175520727.cX0opH5Y.png",v=JSON.parse('{"title":"pywinauto","description":"","frontmatter":{},"headers":[],"relativePath":"python/pythonWin自动化神器.md","filePath":"python/pythonWin自动化神器.md"}'),l={name:"python/pythonWin自动化神器.md"},c=a('<h1 id="pywinauto" tabindex="-1">pywinauto <a class="header-anchor" href="#pywinauto" aria-label="Permalink to &quot;pywinauto&quot;">​</a></h1><h2 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h2><p>它是一个自动化的Python模块，适合<code>windows</code>系统上的软件（GUI），可以通过<code>Pywinauto</code>遍历窗口（对话框）和窗口里的空间，可以控制鼠标和键盘输入，它能做的事情比<code>pysimplegui</code>更多</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">pip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> pywinauto</span></span></code></pre></div><p>官网文档：<a href="https://pywinauto.readthedoc.io/latest/" target="_blank" rel="noreferrer">https://pywinauto.readthedoc.io/latest/</a></p><h2 id="application" tabindex="-1">Application <a class="header-anchor" href="#application" aria-label="Permalink to &quot;Application&quot;">​</a></h2><p>要控制软件第一件事就是启动一个Windows文件，每一个软件（进程）都是一个Application对象。实例化Application对象的时候可以传入一个<code>backend</code>参数，可选值为win32(默认)和uia。</p><ul><li>win32对应的框架：MFC、VB6、VCL、简单的WinForms空间和大多数旧的遗留应用程序。</li><li>uia对应的框架：WinForms、WPF、商店应用程序、Qt5、浏览器</li></ul><p>如果无法知道要测试的软件使用的术语哪种框架，可以使用<code>Inspect(对应的uia)</code>和<code>Spy++(对应的win32)</code>看看，看哪个显示更全就选哪个。Inspect和Spy++需要自己安装一下。</p><p>下面是Application对象的主要方法</p><table><thead><tr><th>方法</th><th>常用参数</th><th>说明</th></tr></thead><tbody><tr><td>start()</td><td>cmd_line、timeout、retry_interval</td><td>通过cmd命令启动一个软件（进程）</td></tr><tr><td>connect()</td><td>process、handle、path、timeout</td><td>连接一个进程，一般使用进程号（任务管理器可以查询到）</td></tr><tr><td>top_window()</td><td>/</td><td>获取应用到顶层窗口</td></tr><tr><td>window()</td><td>title、title_re、class_name、best_match</td><td>获取单个窗口（WindowSpecification）</td></tr><tr><td>windows()</td><td>title、title_re、class_name</td><td>获得多个窗口(UIAWrapper)</td></tr><tr><td>is64bit()</td><td>/</td><td>是否64位应用</td></tr><tr><td>cpu_usage</td><td>interval</td><td>CPU占用率</td></tr><tr><td>wait_cpu_usage_lower()</td><td>threshold、timeout</td><td>等待CPU占率小于某个阀值</td></tr><tr><td>active()()</td><td>/</td><td>搜索返回一个激活窗口</td></tr><tr><td>kill()</td><td>Soft</td><td>结束进程</td></tr><tr><td>wait_for_process_exit()</td><td>timeout、retry_interval</td><td>等待进程结束</td></tr></tbody></table><h2 id="windowspecification" tabindex="-1">WindowSpecification <a class="header-anchor" href="#windowspecification" aria-label="Permalink to &quot;WindowSpecification&quot;">​</a></h2><p>获取窗口，一个窗口都是一个<code>WindowSpecification</code>对象，可以通过<code>Application</code>对象的window()方法获取，参数可以是title、classname或者best_match等。这都可以在inspect.exe上看到，不过需要注意的是inspect看到的Name其实对应的是window()的title参数。</p><table><thead><tr><th>方法</th><th>常用参数</th><th>说明</th></tr></thead><tbody><tr><td>Maximize()</td><td>/</td><td>最大化窗口</td></tr><tr><td>minimize()</td><td>/</td><td>最小化窗口</td></tr><tr><td>restore()</td><td>/</td><td>恢复窗口</td></tr><tr><td>close()</td><td>/</td><td>关闭窗口</td></tr><tr><td>get_show_state()</td><td>/</td><td>截取窗口状态，0正常1最大化2最小化</td></tr><tr><td>was_maximized()</td><td>/</td><td>当前是否最大化</td></tr><tr><td>draw_outline()</td><td>colour、thickness</td><td>给窗口画个框可以使用定位</td></tr><tr><td>print_control_identifiers()</td><td>/</td><td>打印所有子窗口和子元素(会打印对应的control_type)</td></tr><tr><td>child_window()</td><td>title、control_type</td><td>获取子窗口</td></tr><tr><td>exists()</td><td>timeout</td><td>窗口是否存在</td></tr><tr><td>wait()</td><td>wait_for、timeout</td><td>等待窗口变成某个状态(exists、visible、enabled、ready、active)</td></tr><tr><td>wait_not()</td><td>wait_for_not、timeout</td><td>等待窗口不处于某个状态(exists、visible、enabled、ready、active)</td></tr></tbody></table><h2 id="元素控件" tabindex="-1">元素控件 <a class="header-anchor" href="#元素控件" aria-label="Permalink to &quot;元素控件&quot;">​</a></h2><p>一个窗口里一般都会有各种各样的元素，比如说<strong>按钮</strong> （Button）、<strong>编辑栏</strong>（Edit）、<strong>树状视图</strong>（Tree View）、<strong>复选框</strong>（CheckBox）、<strong>对话框</strong>（Dialog）、<strong>工具栏</strong>（Toolbar）、<strong>状态栏</strong>（StatusBar）、<strong>列表框</strong>（ListBox）、<strong>窗格</strong>（Pane）、<strong>菜单</strong>（Menu）、<strong>菜单栏</strong>（MenuItem）、<strong>静态内容</strong>（Static）、<strong>工具提示</strong>（ToolTips）、<strong>列表控件</strong>（ListView）、<strong>单选框</strong>（RadioButton）、<strong>组合框</strong>（ComboBox）、<strong>选项卡控件</strong>（TabControl）、<strong>组框</strong> （GroupBox）、<strong>弹出菜单</strong>（PopupMenu）、<strong>头****部</strong>（Header）等。</p><p>因为控件类型太多了不能一个一个学习，但是它们都有一个 element_info的属性，访问之后会返回一个继承于ElementInfo的对象（UIAElementInfo或HwndElementInfo），比较重要的属性或方法如下</p><p><img src="'+n+'" alt="image-20240531175340191"></p><p>这些元素除了有element_info可以获取一些元素的主要信息，它们还都被包装成一个Wrapper，所以也可以学一下BaseWrapper的常用方法和属性。其实BaseWrapper的方法基本上都是对ElementInfo进一步包装，我只列出部分方法，如下表</p><p><img src="'+r+'" alt="image-20240531175357601"></p><p>说明一下，每个控件元素都有对应的Wrapper，所以上面的方法也不一定都用，需要根据实际情况进行测试区分。另外，比较有用的click_input()和type_keys()这两个方法分别用于操作鼠标和键盘（输入），下面我会单独拿出来说一下</p><h2 id="鼠标操作" tabindex="-1">鼠标操作 <a class="header-anchor" href="#鼠标操作" aria-label="Permalink to &quot;鼠标操作&quot;">​</a></h2><p>鼠标点击肯定离不开点击的位置，桌面就是一个坐标，左上角为坐标原点，往右是X轴正向，往下是Y轴正向。pywinauto提供了一个mouse模块用于鼠标操作，最核心的方法是_perform_click_input()，不过它是一个私有方法，我们调用的是基于它的封装方法，如下表</p><p><img src="'+s+'" alt="image-20240531175436707"></p><p>参数说明：</p><ul><li>参数button的默认值都是“left”，即鼠标左键，可选值有left、right、middle、move、wheel、x</li><li>参数coords的默认值都是元组(0, 0)，元组里的两个整数分别是X、Y轴的值</li><li>参数wheel_dist表示滚动的距离，大于0是向上滚动，小于0是向下滑动</li></ul><h2 id="键盘操作" tabindex="-1">键盘操作 <a class="header-anchor" href="#键盘操作" aria-label="Permalink to &quot;键盘操作&quot;">​</a></h2><p>键盘操作主要是按下键盘上的按键，相关方法在keyboard模块，最最主要的是send_keys()方法，第一个参数keys就是我们需要按下的按键，其他参数比如说with_spaces、with_tabs、with_newlines、turn_off_numlock、set_foreground、vk_packet，一看就知道作用，而且都是布尔值，此处不进行举例</p><p>pywinauto支持的完整的按键可以在官方文档查看，<a href="https://pywinauto.readthedocs.io/en/latest/code/pywinauto.keyboard.html" target="_blank" rel="noreferrer">https://pywinauto.readthedocs.io/en/latest/code/pywinauto.keyboard.html</a></p><p>下面我列举出的是一些比较常用的按键</p><p><img src="'+p+'" alt="image-20240531175520727"></p><p>说明：</p><ul><li>使用按键时需要搭配大括号，比如说按下回车键是 &#39;{ENTER}&#39; （是字符串）</li><li>在Windows平台默认是发送虚拟按键的，以VK_开头的按键，都是指虚拟按钮，如果不想使用虚拟按钮可以把VK_前缀去掉，把send_keys()的vk_packet参数改为False即可</li></ul><p>单个按键按下抬起还不够，往往需要组合键，这时候就需要修饰符了，在大括号里可以使用<code>down</code>、<code>up</code>控制按键什么时候按下和抬起，如果后面加上数字，表示按下多少次</p>',34),h=t("p",{VK_MENU:""},[e("当然，很多时候使用"),t("code",null,"down"),e("、"),t("code",null,"up"),e("修饰感觉不够简洁，所以pywinauto还提供了简化写法，使用+代替{VK_SHIFT}，使用^代替{VK_CONTROL}，使用%代替")],-1),_=t("p",null,"如果不想按下按钮，纯属想要输入纯字符串，那就需要取消转义了，注意修饰符和按钮的写法是不一样的",-1),u=[c,h,_];function g(m,w,y,b,f,k){return i(),d("div",null,u)}const P=o(l,[["render",g]]);export{v as __pageData,P as default};
