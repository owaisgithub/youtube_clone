from django.db import models

from .user_model import User


class Subscription(models.Model):
    subscriber = models.ForeignKey(User, on_delete=models.CASCADE, related_name='subscriber')
    channel = models.ForeignKey(User, on_delete=models.CASCADE, related_name='channel')
    createAt = models.DateTimeField(auto_now_add=True)
    updateAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Subscriptions'
        
    @classmethod
    def subscribeChannel(self, subscriberId, channelId):
        try:
            subscribe = Subscription.objects.create(subscriber_id = subscriberId,
                                                    channel_id = channelId)
            subscribe.save()
            return subscribe
        except Exception as e:
            return None
    
    @classmethod
    def getSubscriptionAndSubcriber(self, userId):
        subscribers = []
        subscriptions = []
        subscriberObjects = Subscription.objects.filter(channel_id = userId)
        subscriptionObjects = Subscription.objects.filter(subscriber_id = userId)
        for subcriber in subscriberObjects:
            user = User.getUserById(subcriber.subscriber_id)
            subcriberDetail = {
                'id': user.id,
                'username': '@' + user.username,
                'avatar': user.avatar
            }
            subscribers.append(subcriberDetail)
            
        for subscription in subscriptionObjects:
            user = User.getUserById(subscription.channel_id)
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
    def getSubscribers(self, userId):
        subscribers = []
        subscriberObjects = Subscription.objects.filter(channel_id = userId)
        for subscriber in subscriberObjects:
            # user = User.getUserById(subcriber.subscriber_id)
            subcriberDetail = {
                'id': subscriber.subscriber.id,
                'username': '@' + subscriber.subscriberusername,
                'avatar': subscriber.subscriberavatar
            }
            subscribers.append(subcriberDetail)
            
        return {
            'subscribers_count': len(subscriberObjects),
            'subscribers': subscribers,
        }
        
    @classmethod
    def getSubscriberCount(self, channelId):
        return Subscription.objects.filter(channel_id = channelId).count()

    @classmethod
    def isSubscribed(self, channelId, userId):
        try:
            isSubscribed = Subscription.objects.get(channel_id = channelId, subscriber_id = userId)
            return True
        except Exception as e:
            return False
        # return Subscription.objects.get(channel_id = channelId, subscriber_id = userId)
    
    @classmethod
    def unsubscribeChannel(self, channelId, userId):
        try:
            unsubscribe = Subscription.objects.get(channel_id = channelId, subscriber_id = userId)
            unsubscribe.delete()
            return True
        except Exception as e:
            return False
    
    @classmethod
    def getSubscriptions(self, userId):
        subscriptions = []
        subscriptionObjects = Subscription.objects.filter(subscriber_id = userId)
        for subscription in subscriptionObjects:
            # user = User.getUserById(subscription.channel_id)
            subscriptionDetail = {
                'id': subscription.channel.id,
                'username': '@' + subscription.channel.username,
                'avatar': subscription.channel.avatar,
                'createdAt': subscription.channel.createdAt
            }
            subscriptions.append(subscriptionDetail)
            
        return {
           'subscriptions_count': len(subscriptionObjects),
           'subscriptions': subscriptions
        }