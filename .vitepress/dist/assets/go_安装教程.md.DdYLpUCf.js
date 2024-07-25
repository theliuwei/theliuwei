import{_ as s,c as i,o as a,a4 as l}from"./chunks/framework.DF40YQsC.js";const u=JSON.parse('{"title":"安装","description":"","frontmatter":{},"headers":[],"relativePath":"go/安装教程.md","filePath":"go/安装教程.md"}'),e={name:"go/安装教程.md"},n=l(`<h1 id="安装" tabindex="-1">安装 <a class="header-anchor" href="#安装" aria-label="Permalink to &quot;安装&quot;">​</a></h1><p>网址：<a href="https://studygolang.com/dl" target="_blank" rel="noreferrer">https://studygolang.com/dl</a></p><p>按照自己平台去下载安装包</p><h3 id="linux-安装步骤" tabindex="-1">linux 安装步骤： <a class="header-anchor" href="#linux-安装步骤" aria-label="Permalink to &quot;linux 安装步骤：&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local/go</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> &amp;&amp; </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -C</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /usr/local</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -xzf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go1.14.3.linux-amd64.tar.gz</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PATH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$PATH:/usr/local/go/bin</span></span></code></pre></div><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> version</span></span></code></pre></div><h2 id="windows-安装" tabindex="-1">windows 安装 <a class="header-anchor" href="#windows-安装" aria-label="Permalink to &quot;windows 安装&quot;">​</a></h2><p>下载地址:<code>https://golang.google.cn/dl/</code>,这里提供了不少平台的go版本，根据自己的平台选择下载。</p><p>这里注意：安装路径选择一个比较好找的路径，例如：<code>C:\\go</code>,其他安装都选择“下一步”即可。</p><p>安装完成后，把<code>C:\\go\\bin</code>目录添加到环境变量，然后就可以使用go了，打开命令行终端输入如下内容获取go版本信息。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>go version</span></span></code></pre></div><h2 id="linux安装" tabindex="-1">Linux安装 <a class="header-anchor" href="#linux安装" aria-label="Permalink to &quot;Linux安装&quot;">​</a></h2><h3 id="设置go环境变量" tabindex="-1">设置GO环境变量 <a class="header-anchor" href="#设置go环境变量" aria-label="Permalink to &quot;设置GO环境变量&quot;">​</a></h3><p>在linux系统下一半通过<code>$HOME/.bashrc</code>配置自定义环境变量，根据不同发型版本也可能是文件<code>$HOME/.profile</code>，然后使用gedit或者vi来编辑文件内容。</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> GOROOT</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$HOME/go</span></span></code></pre></div><p>为了确保相关文件在系统文件的任何地方都能够被调用</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> PATH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$PATH:$GOROOT/bin</span></span></code></pre></div><p>在开发项目时，需要一个环境变量来保存工作目录</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> GOPATH</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$HOME/Applications/Go</span></span></code></pre></div><p>$GOPATH 可以包含多个工作目录，取决于你的个人情况。如果你设置了多个工作目录，那么当你在之后使用 go get（远程包安装命令）时远程包将会被安装在第一个目录下。</p><p>在完成这些设置后，你需要在终端输入指令 source .bashrc 以使这些环境变量生效。然后重启终端，输入 go env 和 env 来检查环境变量是否设置正确。</p><h3 id="安装-c工具" tabindex="-1">安装 c工具 <a class="header-anchor" href="#安装-c工具" aria-label="Permalink to &quot;安装 c工具&quot;">​</a></h3><p>Go的工具链是C语言编写的，因此在安装GO之前需要安装C工具，如果系统是ubuntu。可以在终端输入如下指令</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> bison</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ed</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gawk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> gcc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> libc6-dev</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> make</span></span></code></pre></div><h3 id="获得go源代码" tabindex="-1">获得go源代码 <a class="header-anchor" href="#获得go源代码" aria-label="Permalink to &quot;获得go源代码&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">wget</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://storage.googleapis.com/golang/go</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">versio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.src.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">tar</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -zxvf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">versio</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">n</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.src.tar.gz</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mv</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> go</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $GOROOT</span></span></code></pre></div><h3 id="构建go" tabindex="-1">构建go <a class="header-anchor" href="#构建go" aria-label="Permalink to &quot;构建go&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $GOROOT</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">/src</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">./all.bash</span></span></code></pre></div><h3 id="测试安装" tabindex="-1">测试安装 <a class="header-anchor" href="#测试安装" aria-label="Permalink to &quot;测试安装&quot;">​</a></h3><p>使用编辑器来编写如下内容，保存文件名<code>hello_go.go</code></p><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">	println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;hello go&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>执行命令<code>go run hello_go.go</code> 将会打印 <code>hello go</code></p><h2 id="macos-安装" tabindex="-1">macos 安装 <a class="header-anchor" href="#macos-安装" aria-label="Permalink to &quot;macos 安装&quot;">​</a></h2><p>要记住的变量</p><p>GOROOT 是 Go 开发包的安装目录，默认可以设置在/usr/local/go</p><p>export PATH=$PATH:$GOROOT/bin:$GOBIN</p><p>GOPATH 是一个路径，用来存放开发中需要用到的代码包</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>vim /etc/profile</span></span>
<span class="line"><span></span></span>
<span class="line"><span>export GOROOT=/usr/local/go</span></span>
<span class="line"><span>export PATH=$PATH:$GOROOT/bin:$GOBIN</span></span>
<span class="line"><span>export GOPATH=/home/用户名字/go</span></span></code></pre></div><h2 id="编写脚本" tabindex="-1">编写脚本 <a class="header-anchor" href="#编写脚本" aria-label="Permalink to &quot;编写脚本&quot;">​</a></h2><div class="language-go vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">go</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">package</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">fmt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">func</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> main</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(){</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  fmt.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Println</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Hello World&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><h2 id="启动脚本" tabindex="-1">启动脚本 <a class="header-anchor" href="#启动脚本" aria-label="Permalink to &quot;启动脚本&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main.go</span></span></code></pre></div><h2 id="打包脚本" tabindex="-1">打包脚本 <a class="header-anchor" href="#打包脚本" aria-label="Permalink to &quot;打包脚本&quot;">​</a></h2><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">go</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> build</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> main.go</span></span></code></pre></div><p>打包脚本会生成名称是 main 的可执行文件。可是使用<code>./main</code>去执行文件</p><ul><li>Go 是以<code>包</code>为管理单位，每个 Go 源文件必须先声明所属的包，通过 package 声明。</li><li><code>main</code>包是 Go 语言程序的入口包</li><li>一个 Go 语言程序只能右一个<code>main</code>包</li><li>如果一个程序没有<code>main</code>包，那么编译时将会出错，无法生成可执行文件。</li><li><code>main函数</code>，Go 语言程序的入口函数，是程序启动后运行的第一个函数。<code>main函数</code>只能声明在<code>main</code>包中，不能声明在其他包中，并且一个<code>main</code>包中也必须有且仅有一个<code>main函数</code>。</li><li><code>go run</code>命令将编译和执行指令合二为一，会在编译之后立即执行 Go 语言程序，但是不会生成可执行文件。一般在测试时候使用。</li><li>go build 命令用来编译程序，它可以将程序代码和相关以来编译成一个可执行文件，上线时只上线可执行文件就可以了。</li></ul><h2 id="go文件夹解析" tabindex="-1">go文件夹解析 <a class="header-anchor" href="#go文件夹解析" aria-label="Permalink to &quot;go文件夹解析&quot;">​</a></h2><ul><li><strong>api</strong>: 这个文件夹通常用于存放 API 相关的代码文件，例如 HTTP API 或者 gRPC API 的定义文件。</li><li><strong>bin</strong>: 这个文件夹一般用于存放编译生成的可执行文件，例如你的 Go 程序的可执行文件（例如 <code>go.exe</code>、<code>gofmt.exe</code> 等）。</li><li><strong>doc</strong>: 这个文件夹通常用于存放文档文件，可能包括项目的说明文档、设计文档、使用手册等。</li><li><strong>lib</strong>: 这个文件夹一般用于存放项目的库文件，可以是你自己写的一些库代码，也可以是第三方的依赖库。</li><li><strong>misc</strong>: 这个文件夹通常用于存放一些杂项的文件，可能是一些脚本文件、配置文件等。</li><li><strong>pkg</strong>: 这个文件夹通常用于存放编译生成的包文件，即其他 Go 程序可以导入和使用的包。</li><li><strong>src</strong>: 这个文件夹通常用于存放项目的源代码文件，是主要的代码目录。</li><li><strong>test</strong>: 这个文件夹通常用于存放项目的测试代码，包括单元测试、集成测试等。</li><li><strong>AUTHORS</strong>: 这个文件可能是用于记录项目的作者信息，包括项目的贡献者等。</li></ul>`,49),t=[n];function h(p,o,k,d,r,g){return a(),i("div",null,t)}const F=s(e,[["render",h]]);export{u as __pageData,F as default};
