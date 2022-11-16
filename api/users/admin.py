from django.contrib import admin
from .models import OtherUserDetails
# from django.contrib.auth.admin import UserAdmin


# class AccountAdmin(UserAdmin):
#     list_display = ('id','name','email','username','date_joined','last_login','is_admin','is_staff','github_token','password')
#     search_fields =('email','username')
#     readonly_fields = ('id','date_joined','last_login')

#     filter_horizontal = ()
#     list_filter = ()

admin.site.register(OtherUserDetails)
