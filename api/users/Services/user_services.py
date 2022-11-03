from users.models import Account
import users.messages as messages
from users.serializers import AccountSerializer


class UserServices:
    """
    Class for managing all user services
    """
    @staticmethod
    def create_user(payload):

        res = {
            "success": False,
            "message": "Unable to create new user"
        }

        username = payload['username']
        password = payload['password']
        name = payload['name']
        email = payload['email']
        github_token = payload['github_token']

        try:
            query = Account.objects.create(
                name=name,
                username=username,
                password=password,
                email=email,
                github_token=github_token
            )
            query.save()
            res.update({
                "success": True,
                "message": "User created successfully"
            })
            return res

        except Exception as ex:
            return ex

    @staticmethod
    def get_user(payload):
        """
        Method for getting user details by Id
        """
        res = {
            "data": None,
            "message": messages.GET_USER_DETAIL_ERROR
        }
        username = payload["username"]

        try:
            query = Account.objects.filter(username=username)
            serializer = AccountSerializer(query, many=True)
            res.update({
                "data": serializer.data,
                "message": messages.GET_USER_DETAIL_SUCCESS
            })
            return res

        except Exception as ex:
            return ex

    @staticmethod
    def update_user(payload):
        """
        Method for update any user
        """
        res = {
            "success": False,
            "message": messages.UPDATE_USER_DETAIL_ERROR
        }

        username = payload['username']
        github_token = payload['github_token']
        try:
            query = Account.objects.filter(username=username).update(
                github_token=github_token
            )
            res.update({
                "success": True,
                "message": messages.UPDATE_USER_DETAIL_SUCCESS
            })
            return res
        except Exception as ex:
            return ex

    @staticmethod
    def delete_user(payload):
        """
        Method for update any user
        """
        res = {
            "success": False,
            "message": messages.DELETE_USER_DETAIL_ERROR
        }

        username = payload['username']

        try:
            query = Account.objects.delete(username=username)
            res.update({
                "success": True,
                "message": messages.DELETE_USER_DETAIL_SUCCESS
            })
            return res
        except Exception as ex:
            return ex
