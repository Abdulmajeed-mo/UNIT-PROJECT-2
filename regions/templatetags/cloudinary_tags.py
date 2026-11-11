from pathlib import PurePosixPath
from urllib.parse import quote

from django import template
from django.conf import settings

register = template.Library()


@register.filter
def cloudinary_image(image_path):
    if not image_path:
        return ""

    filename = PurePosixPath(str(image_path).replace("\\", "/")).name
    base_url = settings.CLOUDINARY_IMAGE_URL.rstrip("/")

    return f"{base_url}/{quote(filename)}"