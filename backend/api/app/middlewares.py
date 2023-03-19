def login_exempt(view):  # pylint: disable=C0103
    """
    Decorator for views which needs to be exempted from login
    """
    view.login_exempt = True
    return view

