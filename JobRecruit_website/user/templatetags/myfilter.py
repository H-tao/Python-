from django import template

register = template.Library()
@register.filter('get_range')
def get_range(value):
    return range(2, value+1)


# from django.template.defaulttags import register
# @register.filter('get_range')
# def get_range(value):
#     return range(1, value+1)
