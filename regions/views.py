from django.http import Http404
from django.shortcuts import render

REGIONS = {
    "al-ahsa": "الأحساء",
    "taif": "الطائف",
    "al-qassim": "القصيم",
    "al-jouf": "الجوف",
    "abha": "أبها",
}


def home(request):
    return render(request, "regions/home.html")


def region_detail(request, slug):
    region_name = REGIONS.get(slug)

    if region_name is None:
        raise Http404("المنطقة غير موجودة")

    return render(
        request,
        "regions/region_detail.html",
        {"region_name": region_name},
    )


def our_roots(request):
    return render(request, "regions/our_roots.html")