import{_ as s,c as i,o as e,a4 as a}from"./chunks/framework.DF40YQsC.js";const u=JSON.parse('{"title":"构建docker容器","description":"","frontmatter":{},"headers":[],"relativePath":"docker/在linux系统建立docker容器.md","filePath":"docker/在linux系统建立docker容器.md"}'),l={name:"docker/在linux系统建立docker容器.md"},p=a(`<h1 id="构建docker容器" tabindex="-1">构建docker容器 <a class="header-anchor" href="#构建docker容器" aria-label="Permalink to &quot;构建docker容器&quot;">​</a></h1><p>目的：将项目部署到目标（Linux）服务器的docker里</p><p>下面以一个项目文件夹的作为例子。这样可以更容易地明白怎么去一步一步地构建完成docker容器。这样才学习知识，去除其他繁杂的知识。直击本质！</p><p>以下内容会默认认为读者会Python编程语言和简单的shell命令。</p><p>shell命令是linux的命令</p><p>前提：我默认你的linux用户身份是<code>root</code>用户，不是的请切换到<code>root</code>用户在去使用下面的那些命令。如何切换？那就终端输入<code>su</code> 按下<code>Enter</code>键。输入密码。有些不需要输入密码。 不想切换那就在命令前加上<code>sudo</code> 记住<code>sudo</code>和如下命令要有空格分隔。</p><h2 id="安装docker" tabindex="-1">安装Docker <a class="header-anchor" href="#安装docker" aria-label="Permalink to &quot;安装Docker&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -y</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.io</span></span></code></pre></div><h2 id="查看docker版本" tabindex="-1">查看Docker版本 <a class="header-anchor" href="#查看docker版本" aria-label="Permalink to &quot;查看Docker版本&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --version</span></span></code></pre></div><p>这将显示安装的 Docker 版本信息。</p><h2 id="添加用户到docker用户组-可选" tabindex="-1">添加用户到Docker用户组（可选） <a class="header-anchor" href="#添加用户到docker用户组-可选" aria-label="Permalink to &quot;添加用户到Docker用户组（可选）&quot;">​</a></h2><p>可选的意思就是，想选就选，不想选也没事。</p><p>为了在不使用 sudo 的情况下运行 Docker 命令，你可以将当前用户添加到 Docker 用户组中。首先，运行以下命令将当前用户添加到 Docker 用户组：</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> usermod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -aG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $USER</span></span></code></pre></div><p>然后重新登陆服务器？，那就重新登陆呗。</p><h2 id="创建项目文件夹" tabindex="-1">创建项目文件夹 <a class="header-anchor" href="#创建项目文件夹" aria-label="Permalink to &quot;创建项目文件夹&quot;">​</a></h2><p>后面会在描述的语言上把文件夹写成目录。它们是一个意思。指的是一个东西。</p><p>假设我使用了是linux系统，我现在所在的目录是<code>/home</code>，我要在这里创建我的<code>demo</code>项目文件夹。代码框中的<code>#</code>后跟的文字为了让你阅读。让你有个清晰的思路跟着我走。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 我现在 在/home文件夹下</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo</span></span></code></pre></div><h2 id="创建项目里的文件" tabindex="-1">创建项目里的文件 <a class="header-anchor" href="#创建项目里的文件" aria-label="Permalink to &quot;创建项目里的文件&quot;">​</a></h2><p>先进入项目目录，然后创建<code>a.py</code>文件，也可以直接创建。二选一</p><p>第一个 （用了第一个，就不要用第二个）</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a.py</span></span></code></pre></div><p>第二个 （用了第二个，就不要用第一个）</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo/a.py</span></span></code></pre></div><h2 id="编辑文件" tabindex="-1">编辑文件 <a class="header-anchor" href="#编辑文件" aria-label="Permalink to &quot;编辑文件&quot;">​</a></h2><p>编辑文件的目的是往里面写一些内容。我就用简单的<code>print(&quot;hello&quot;)</code> 。 可以使用<code>vi</code>命令 或者<code>vim</code>命令 去编辑文件。 不会使用可以去找找 <code>linux系统下如何使用vim命令</code> ，我默认你的linux系统上有<code>vim</code></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> a.py</span></span></code></pre></div><p>上面这条命令会让我编辑<code>a.py</code>文件，我要按下键盘上的<code>i</code>键。然后输入<code>print(&quot;hhello&quot;)</code>。写完后按下<code>ESC</code>键，然后按下<code>Shift</code>+<code>：</code>键，输入<code>wq</code>后按下<code>Enter</code>键。</p><p>这样才是编辑a.py文件完成了。</p><h2 id="创建dockerfile文件" tabindex="-1">创建Dockerfile文件 <a class="header-anchor" href="#创建dockerfile文件" aria-label="Permalink to &quot;创建Dockerfile文件&quot;">​</a></h2><p>Dockerfile 是一个用于定义 Docker 镜像构建过程的脚本文件。它包含了一系列指令，每个指令在构建镜像时执行特定的操作。这些指令定义了基础镜像、工作目录、文件复制、依赖安装、环境变量设置以及容器启动时执行的命令等。</p><p>我不知道你看到上面的文字描述会不会明白<code>Dockerfile</code>文件是干什么的。它就是一个用于咱们生成镜像的文件。Docker规定了一些指令。我们用哪些指令就往这个<code>Dockerfile</code>文件里写。这里不介绍指令，防止读者脑子出现问题。</p><p>我们的目的是创建<code>Dockerfile</code>文件，那就用下面这条命令。(前提是你必须在项目目录里，也就是和a.py在一个目录里)</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">touch</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Dockerfile</span></span></code></pre></div><h2 id="编辑dockerfile文件" tabindex="-1">编辑Dockerfile文件 <a class="header-anchor" href="#编辑dockerfile文件" aria-label="Permalink to &quot;编辑Dockerfile文件&quot;">​</a></h2><p>我先写出来，然后再解释。</p><p>通过<code>vim</code>编辑文件</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">vim</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Dockerfile</span></span></code></pre></div><p>以下就是文件内容，<code>#</code>后面都是注释，那是给读者看的，不是给<code>Docker</code>的。Docker执行这个文件的时候也会忽略注释。</p><p>进入到<code>Dockerfile</code>文件，按键也是先<code>i </code>键，然后输入如下内容。</p><div class="language-docker vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">docker</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 使用官方的 Python 3.8 镜像作为基础镜像</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">FROM</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> python:3.8</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 设置工作目录为 /app</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">WORKDIR</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> /app</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 将当前目录的内容复制到工作目录</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">COPY</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> . /app</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 配置 pip 使用清华大学的镜像源并升级 pip 这条命令是给在中国服务器使用的，服务器在国外那就不要用这条命令。</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">RUN</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple \\</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &amp;&amp; pip install --upgrade pip</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 指定容器启动时运行的命令</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">CMD</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;python&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;a.py&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]</span></span></code></pre></div><p>这样我就编辑完<code>Dockerfile</code>文件了，写完后按下<code>ESC</code>键，然后按下<code>Shift</code>+<code>：</code>键，输入<code>wq</code>后按下<code>Enter</code>键。</p><h2 id="构建镜像" tabindex="-1">构建镜像 <a class="header-anchor" href="#构建镜像" aria-label="Permalink to &quot;构建镜像&quot;">​</a></h2><p><code>build</code> 是一个命令，用于根据 Dockerfile 构建一个新的 Docker 镜像</p><p><code>-t</code> 是 <code>--tag</code> 的简写形式，用于为新构建的镜像指定名称和标签。</p><p><code>demo</code> 是我给这个镜像起的名字</p><p><code>.</code>是当前目录的意思</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -t</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> .</span></span></code></pre></div><p>构建需要一些时间，这个例子也就几秒钟就能完成。构建完成镜像后，就是运行它。</p><h2 id="运行容器" tabindex="-1">运行容器 <a class="header-anchor" href="#运行容器" aria-label="Permalink to &quot;运行容器&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --rm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo</span></span></code></pre></div><p>将这个镜像运行起来，说法就变了，大家都说是容器。而不是说镜像。（人总是用一堆名词、术语来阻碍大家的理解）但我看来都是一个东西。</p><p>这条命令运行后，终端就会显示一个<code>hello</code>，这是<code>a.py</code>代码里的。</p><ul><li><p><code>docker run</code> 命令用于创建并运行一个新的 Docker 容器。</p></li><li><p><code>--rm</code> 选项告诉 Docker 在容器停止后自动删除容器。</p></li><li><p><code>demo</code> 是要运行的 Docker 镜像的名称。</p></li></ul><p>这个命令将创建一个新的 Docker 容器，使用 demo 镜像，并在容器中执行该镜像的默认命令。当容器停止运行时，由于使用了 <code>--rm</code> 选项，Docker 将自动删除该容器，而不会保留它在本地的容器列表中。</p><p>咱们中国人如果不明白镜像是什么意思，我默认你知道电脑的一些基础知识，镜像就认为是电脑本体，容器就认为是操作系统，Dockerfile就是配置文件。你的项目就是应用程序。只不过这些一系列的玩法（操作）玩的是一台虚拟（摸不到、能看到、能交互）的电脑。这就是本质！</p><p>我们还可以进入容器里面，容器就是装东西的一个物体（东西）。我们叫它容器（万物皆是容器）</p><p>命令是</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -it</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> demo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bash</span></span></code></pre></div><ul><li><p><code>docker run</code> 是用来创建并运行一个 Docker 容器的命令。</p><p>选项结合了两个选项：</p><ul><li><code>-i</code>，即交互式模式，允许你与容器的标准输入进行交互。</li><li><code>-t</code>，即分配一个伪终端（pseudo-TTY），使你能够与 Bash shell 进行交互。</li></ul></li><li><p><code>demo</code> 是要使用的 Docker 镜像的名称。</p></li><li><p><code>bash</code> 是要在容器中执行的命令，这会启动一个 Bash shell。</p></li></ul><p>所以，运行这个命令后，你将进入一个交互式的 Bash shell，并且你可以在其中执行命令。</p><h2 id="启动nginx容器" tabindex="-1">启动nginx容器 <a class="header-anchor" href="#启动nginx容器" aria-label="Permalink to &quot;启动nginx容器&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -d</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ip</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 80:80</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-nginx-container</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> my-nginx-image</span></span></code></pre></div><h2 id="结束" tabindex="-1">结束 <a class="header-anchor" href="#结束" aria-label="Permalink to &quot;结束&quot;">​</a></h2><p>这只是带你入门，让你通过这个例子明白我们怎么玩Docker。可以使用Docker部署一些简单的项目。这就是本文章的目的。Docker的深入内容请在互联网寻找或者隔壁基本知识。</p>`,67),h=[p];function t(n,o,d,c,k,r){return e(),i("div",null,h)}const F=s(l,[["render",t]]);export{u as __pageData,F as default};
