# 自动生成OpenAPI3.0

## drf-spectacular

`drf-spectacular`是一个`django rest framework`的库，它能够自动生成`openapi3.0`的接口文档。并提供`Swagger ui`洁面。以下是它的功能：

1. 自动生成OpenAPI3.0规范：它能够从drf的序列化器、视图和视图集等组件中自动提取信息，生成完整的OpenAPI规范文档。
2. Swagger UI集成：它提供Sagger UI的集成，允许开发者和最终用户通过一个交互式的Web界面来浏览和测试API。
3. 灵活性和定制化：它允许开发者通过etend_schema装饰器等机制来定制API文档，以满足特定需求。
4. 认证支持：它支持DRF等原生认证类，并且可以容易地扩展以支持自定义认证方式。
5. 多版本支持：它支持OpenAPI3.1，允许更高级的规范特性。
6. 国际化支持：它支持国际化（i18n)，可以生成多语言的API文档。
7. 请求/响应/参数示例：它支持为API文档添加示例，帮助用户理解如何使用API。
8. 从docstrings提取描述：它能够从Python的文档字符串中提取描述信息，以丰富API文档的内容。
9. 扩展规范：支持在info、operations、parameters、components、security schemes中添加x-*扩展规范。
10. **合理的命名**：提供基于路径的 `operation_id` 命名策略，使得操作 ID 更加清晰易懂4。
11. **独立的 UI 安装**：对于无法直接访问互联网的环境，`drf-spectacular` 提供了 `drf-spectacular-sidecar` 包，以便离线环境中使用 Swagger UI 或 Redoc4。
12. **支持多种 DRF 特性**：包括对 `django-polymorphic`、`djangorestframework-jwt`、`dj-rest-auth` 等的支持4。
13. **Pydantic 支持**：对 Pydantic（版本 >=2.0）的支持，允许使用 Pydantic 模型作为 DRF 序列化器4。

### 安装

```shell
pip install drf-spectacular
```

### 添加到INSTALLED_APPS

在你的django项目的`settings.py`文件中，将`drf-spectacular`添加到`INSTALLED_APPS`列表中。

```python
INSTALLED_APPS = [
	"drf_spectacular"
]
```

### 配置DRF默认schema类

在`settings.py`中，设置DRF的`DEFAULT_SCHEMA_CLASS`为`drf_spectacular.openapi.AutoSchema`

```
REST_FRAMEWORK = {
"DEFAULT_SCHEMA_CLASS":"drf_spectacular.openapi.AutoSchema"
}
```

### 配置drf-spectacular

你可以设置一些额外的配置，比如API的标题、版本等。

```
SPECTACULAR_SETTINGS = {
"TITLE":"My API",
"DESCRIPTION":"My API Description",
"VERSIon":"1.0.0"
}
```

### 添加URL配置

在你的`urls.py`文件中，添加`drf-spectacular`提供的视图以访问自动生成的API文档

```python
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView, SpectacularRedocView
from django.urls import path
urlpatterns = [
	path('api/schema/', SpectacularAPIView.as_view(), name="schema"),
	path("api/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
  path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
]
```

1. **访问文档**： 完成以上步骤后，启动你的 Django 项目，并在浏览器中访问 `/api/schema/` 路径查看 OpenAPI 规范，或者 `/api/swagger-ui/` 和 `/api/redoc/` 来查看 Swagger UI 和 Redoc 文档。
2. **自定义文档**： 如果需要对文档进行自定义，可以使用 `extend_schema` 装饰器来添加额外的信息，如响应示例、扩展字段等。
3. **离线环境**： 对于无法访问互联网的环境，可以使用 `drf-spectacular-sidecar` 来获取 Swagger UI 或 Redoc 的静态文件。
4. **查看文档**： 访问 `/api/swagger-ui/` 或 `/api/redoc/` 可以查看和测试 API 文档。