from django.shortcuts import render
from django.http import HttpResponse
import json, urllib.request, filter_map


def index(request):
    return render(request, "index.html")

def APImapRequest(request):
    return HttpResponse(filter_map.get_usa_data('https://api.openaq.org/v1/latest?country=US&limit=10000'))
