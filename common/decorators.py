from django.http import HttpResponseBadRequest


def ajax_required(f):
    def wrap(request, *args, **kwargs):
        #if not request.is_ajax():
        # This method is removed in django 4.0.
        # If you are writing your own AJAX detection method, request.is_ajax() can be reproduced exactly as request.headers.get('x-requested-with') == 'XMLHttpRequest'.
        # https://docs.djangoproject.com/en/3.2/releases/3.1/
        if not request.headers.get('x-requested-with') == 'XMLHttpRequest':
            return HttpResponseBadRequest()
        return f(request, *args, **kwargs)

    wrap.__doc__ = f.__doc__
    wrap.__name__ = f.__name__
    return wrap
