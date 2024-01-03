from django.db import models

from .user_model import User


class Subscription(models.Model):
    subscriber = models.ForeignKey(User)
    channel = models.ForeignKey(User)
    createAt = models.DateTimeField(add_auto_now=True)
    updateAt = models.DateTimeField(add_now=True)
    
    class Meta:
        db_table = 'Subscriptions'
        
    @classmethod
    def subscribeChannel(self, data):
        try:
            subscribe = Subscription.objects.create(subscriber = data.get('subscriber'),
                                                    channel = data.get('channel'))
            subscribe.save()
            return subscribe
        except Exception as e:
            return None
    
    @classmethod
    def getSubscriptionAndSubcriber(self, user):
        subscribers = []
        subscriptions = []
        subscriberObjects = Subscription.objects.filter(channel = user)
        subscriptionObjects = Subscription.objects.filter(subcriber = user)
        for subcriber in subscriberObjects:
            user = User.getUserById(subcriber.subscriber)
            subcriberDetail = {
                'id': user.id,
                'username': '@' + user.username,
                'avatar': user.avatar
            }
            subscribers.append(subcriberDetail)
            
        for subscription in subscriptionObjects:
            user = User.getUserById(subscription.channel)
            subscriptionDetail = {
                'id': user.id,
                'username': '@' + user.username,
                'avatar': user.avatar
            }
            subscriptions.append(subscriptionDetail)
            
            
        return {
            'subscribers_count': len(subscriberObjects),
            'subscribers': subscribers,
            'subscriptions_count': len(subscriptionObjects),
            'subscriptions': subscriptions
        }
        
    @classmethod
    def getSubscribers(self, user_id):
        pass
    
    @classmethod
    def getSubscriptions(self, user_id):
        pass