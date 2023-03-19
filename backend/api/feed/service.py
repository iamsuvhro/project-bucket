from datetime import date
from feed.models import FeedCard
from django.contrib.auth.models import User
from users.serializers import AccountSerializer

class FeedCardService:
    """
    Class for feed card actions
    """
    def create_card(payload):
        """
        Method for creating card
        """
        res = {
            'message':'Error occur while creating card',
            'success': False,
        }
        try:
            project_title = payload['projectTitle']
            project_drescriptions = payload['projectDetails']
            repository = payload['repo']
            card_created = date.today()
            user = User.objects.get(id=payload['user_id'])

            query = FeedCard(project_title=project_title,
                            project_drescriptions=project_drescriptions,
                            repository=repository,
                            card_created=card_created,
                            user=user
                            )
            
            query.save()

            res.update({
                'message':'Card created successfully',
                'success': True
            })

            return res
        
        except Exception as ex:
            return res


