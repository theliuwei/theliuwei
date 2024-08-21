# 用户上传图片转换成WebP格式

> 使用django开发web网站时，用户上传的图片都是`jpg`、`png`格式的。我想让它们在存储的时候是`webp`格式的。这样在传输给前端的时候可以减少很多时间。
> 

可以使用`Pillow`库来将用户上传的图片转换成`Webp`格式，Pillow是Python中一个流行的图像处理库，它可以用来打开、处理和保存各种图像格式。

以下是一个简单的示例代码，用于将用户上传的图片转换成`WebP`格式

```python
import io
from PIL import Image

def convert_to_webp(image):
	#打开文件
	img = Image.open(io.BytesIO(image))
	# 将图片转换成WebP格式
	webp_image = io.BytesIO()
	img.save(webp_image, 'webp')
	return webp_image.getvalue()
```

在上述代码中，我们首先使用Pillow库的Image模块打开用户上传的图片，然后将图片转换成WebP格式，并将转换后的结果保存到一个字节数组中，最后返回字节数组即可。你可以根据需要将该函数集成到你的Django应用程序中，以便在输出图片给前端时使用。

需要注意的是，由于WebP格式并不是所有浏览器都支持的，因此在输出图片给前端时，需要先检查客户端浏览器是否支持WebP格式，如果不支持，则应该输出其他格式的图片。可以使用Modernizr等工具来检测浏览器是否支持WebP格式。

> 请帮我把urls.py views.py models.py 都写清楚
> 

好的，下面是一个简单的Django应用程序的示例，包括urls.py、views.py和models.py：

## urls.py

python

Copy

```python
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('upload/', views.upload_image, name='upload_image'),
]

```

在上述代码中，我们定义了两个URL路由，一个是根路径''对应的视图函数是index，另一个是/upload/路径对应的视图函数是upload_image。

## views.py

python

Copy

```python
from django.shortcuts import render, redirect
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from .models import Image

def index(request):
    # 在数据库中获取所有图片
    images = Image.objects.all()
    context = {'images': images}
    return render(request, 'index.html', context)

def upload_image(request):
    if request.method == 'POST' and request.FILES['image']:
        # 获取上传的图片
        image = request.FILES['image']

        # 将图片转换成WebP格式
        webp_image = convert_to_webp(image.read())

        # 保存WebP图片到默认存储
        filename = default_storage.save('images/' + image.name + '.webp', ContentFile(webp_image))

        # 保存图片信息到数据库
        image_obj = Image(name=image.name, path=filename)
        image_obj.save()

        return redirect('index')

    return render(request, 'upload.html')

```

在上述代码中，我们定义了两个视图函数，一个是index函数，用于显示所有图片，另一个是upload_image函数，用于处理用户上传的图片。在upload_image函数中，我们首先获取上传的图片，然后使用上面提到的convert_to_webp函数将图片转换成WebP格式，接着将WebP图片保存到默认存储中，并将图片信息保存到数据库中。最后重定向到index视图。

## models.py

python

Copy

```python
from django.db import models

class Image(models.Model):
    name = models.CharField(max_length=255)
    path = models.CharField(max_length=255)

    def __str__(self):
        return self.name

```

在上述代码中，我们定义了一个Image模型，用于保存图片的名称和路径。在该模型中，我们定义了两个字段，一个是name字段，用于保存图片名称，另一个是path字段，用于保存图片的路径。同时，我们还定义了一个__str__方法，用于在控制台上显示图片的名称。

注意：上述代码仅仅是一个简单的示例，实际开发中需要根据实际需求进行修改和完善。

我需要再一个新的视图函数里去返回图片文件的地址

好的，你可以在一个新的视图函数中返回图片的地址，示例代码如下：

python

Copy

```python
from django.http import HttpResponse

def get_image(request, image_id):
    # 从数据库中获取图片信息
    image = Image.objects.get(id=image_id)

    # 返回图片的地址
    response = HttpResponse()
    response['X-Accel-Redirect'] = '/protected/' + image.path
    response['Content-Type'] = ''
    response['Content-Disposition'] = 'attachment; filename=' + image.name
    return response

```

在上述代码中，我们定义了一个名为get_image的视图函数，该函数的参数image_id用于指定需要获取的图片的id。首先，我们从数据库中获取指定id的图片信息，然后将图片的地址返回给客户端，其中使用了X-Accel-Redirect响应头来重定向到图片的地址。需要注意的是，返回图片的响应中Content-Type头应该为空，Content-Disposition头应该指定为attachment，这样可以让浏览器将图片作为附件下载。

需要注意的是，在上述代码中我们使用了X-Accel-Redirect响应头来重定向到图片的地址。这需要在Nginx等Web服务器中进行相应的配置，以确保Web服务器能够正确地处理该响应头。如果你不打算使用X-Accel-Redirect响应头，也可以使用Django内置的serve函数来返回图片，示例代码如下：

python

Copy

```python
from django.views.static import serve

def get_image(request, image_id):
    # 从数据库中获取图片信息
    image = Image.objects.get(id=image_id)

    # 返回图片
    return serve(request, image.path, document_root='/path/to/media/')

```

在上述代码中，我们使用Django内置的serve函数来返回图片，其中image.path表示图片的路径，document_root表示图片存储的根目录。需要注意的是，使用serve函数返回图片时，应该确保Web服务器能够正确地处理静态文件请求。

前端是vue！我只需要以json的形式将图片文件的地址返回给前端

好的，你可以在Django的视图函数中将图片的地址以JSON格式返回给Vue前端。示例代码如下：

python

Copy

```python
import json

def get_image(request, image_id):
    # 从数据库中获取图片信息
    image = Image.objects.get(id=image_id)

    # 构造JSON响应
    response_data = {'image_url': '/media/' + image.path}

    # 将JSON响应返回给前端
    return HttpResponse(json.dumps(response_data), content_type="application/json")

```

在上述代码中，我们首先从数据库中获取指定id的图片信息，然后构造一个包含图片地址的JSON响应。最后，我们使用Django的HttpResponse函数将JSON响应返回给前端。需要注意的是，我们在构造JSON响应时，将图片地址前面添加了'/media/'前缀，这是因为在Django中，媒体文件的URL是以/media/为前缀的。你需要根据实际情况修改该前缀。

这样的路径只是一部分的，并没有服务地址的路径

是的，你说得对。在返回给前端的图片URL中，需要包含完整的服务地址。你可以在Django的settings.py文件中配置MEDIA_URL和MEDIA_ROOT，以指定媒体文件的URL和存储路径。然后，在视图函数中，将媒体文件的URL和图片的路径拼接起来，以得到完整的图片URL。

具体来说，假设你的Django应用程序的服务地址为[http://example.com，MEDIA_URL为/media/，MEDIA_ROOT为/var/www/media/，图片的路径为images/1.webp，那么完整的图片URL应该为http://example.com/media/images/1.webp。你可以在视图函数中使用以下代码生成完整的图片URL：](http://example.xn--com%2Cmedia_url-uo1u/media/%EF%BC%8CMEDIA_ROOT%E4%B8%BA/var/www/media/%EF%BC%8C%E5%9B%BE%E7%89%87%E7%9A%84%E8%B7%AF%E5%BE%84%E4%B8%BAimages/1.webp%EF%BC%8C%E9%82%A3%E4%B9%88%E5%AE%8C%E6%95%B4%E7%9A%84%E5%9B%BE%E7%89%87URL%E5%BA%94%E8%AF%A5%E4%B8%BAhttp://example.com/media/images/1.webp%E3%80%82%E4%BD%A0%E5%8F%AF%E4%BB%A5%E5%9C%A8%E8%A7%86%E5%9B%BE%E5%87%BD%E6%95%B0%E4%B8%AD%E4%BD%BF%E7%94%A8%E4%BB%A5%E4%B8%8B%E4%BB%A3%E7%A0%81%E7%94%9F%E6%88%90%E5%AE%8C%E6%95%B4%E7%9A%84%E5%9B%BE%E7%89%87URL%EF%BC%9A)

python

Copy

```python
from django.conf import settings
import json

def get_image(request, image_id):
    # 从数据库中获取图片信息
    image = Image.objects.get(id=image_id)

    # 构造JSON响应
    response_data = {'image_url': settings.SITE_URL + settings.MEDIA_URL + image.path}

    # 将JSON响应返回给前端
    return HttpResponse(json.dumps(response_data), content_type="application/json")

```

在上述代码中，我们从Django的settings模块中获取SITE_URL和MEDIA_URL，然后将它们与图片的路径拼接起来，生成完整的图片URL。需要注意的是，SITE_URL是你的Django应用程序的服务地址，可以根据需要进行修改。

我需要再settings.py文件中去设置SITE_URL吗？

是的，如果你想在视图函数中使用完整的图片URL，你需要在Django的settings.py文件中配置SITE_URL。可以通过以下方式来配置SITE_URL：

python

Copy

```python
# settings.py
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# 设置SITE_URL
SITE_URL = 'http://example.com'

# 设置媒体文件的URL和存储路径
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

```

在上述代码中，我们首先定义了BASE_DIR变量，用于保存Django应用程序的根目录。然后，我们定义了SITE_URL变量，并将其设置为你的Django应用程序的服务地址。最后，我们设置了媒体文件的URL和存储路径，分别为MEDIA_URL和MEDIA_ROOT。

需要注意的是，SITE_URL应该是你的Django应用程序的服务地址，可以根据需要进行修改。如果你的Django应用程序运行在本地开发服务器上，则可以将SITE_URL设置为'http://localhost:8000'。如果你的Django应用程序运行在Nginx等Web服务器上，则应该将SITE_URL设置为你的Web服务器的地址。

