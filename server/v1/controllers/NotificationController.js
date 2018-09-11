import Pusher from 'pusher';
import models from '../../models';
import pusherConfig from '../../config/pusher';

const { Channel, Subscription, Notification } = models;

const {
  appId, key, secret, cluster
} = pusherConfig;

// Instantiate pusher
const pusher = new Pusher({
  appId,
  key,
  secret,
  cluster,
  encrypted: true
});

/**
 * This class contains all the methods responsible for sending notifications to users when
 * an activity occurs in their article or an article they are following.
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class NotificationController {
  /**
  * Sends in-app notifications to all users following an article and saves a copy of
  * it to the database.
  * @param {string} channel the name of the channel to which the notification is broadcast
  * @param {string} event the type of event that triggered the notification
  * @param {object} data contains information about the user who triggered the event,
  * the article and other important info
  */
  static async notifyReaders(channel, event, data) {
    const {
      userId, channelId, resourceId, articleSlug
    } = data;
    const notification = await Notification.create({
      creator: userId,
      channelId,
      articleSlug,
      eventType: event,
      resourceId,
    });
    pusher.trigger(channel, 'notification', notification.dataValues);
    return notification.dataValues;
  }

  /**
  * Sends notifications to the author of the article and saves a copy of it to the database
  * @param {string} event the type of event that triggered the notification
  * @param {object} data contains information about the user who triggered the event,
  * the article and other important info
  */
  static async notifyAuthor(event, data) {
    const {
      userId, resourceId, slug: articleSlug, username
    } = data;
    const channelName = `user-${username}`;
    const channel = await Channel.findOne({
      where: [{ name: channelName }]
    });
    if (channel) {
      const notification = await Notification.create({
        creator: userId,
        channelId: channel.id,
        articleSlug,
        eventType: event,
        resourceId,
      });
      pusher.trigger(channelName, 'notification', notification.dataValues);
      return notification.dataValues;
    }
  }

  /**
  * Sends notifications to the followers of the article when the article or it's comment is
  * updated
  * @param {string} event the type of event that triggered the notification
  * @param {object} data contains information about the user who triggered the event,
  * the article and other important info
  */
  static async notifyOnUpdate(event, data) {
    const {
      userId, resourceId, articleSlug
    } = data;
    const channelName = `article-${articleSlug}`;
    const channel = await Channel.findOne({
      where: [{ name: channelName }]
    });
    const notification = await Notification.create({
      creator: userId,
      channelId: channel.id,
      articleSlug,
      eventType: event,
      resourceId,
    });
    pusher.trigger(channelName, 'notification', notification.dataValues);
    return notification.dataValues;
  }

  /**
  * Subscribes a user to a channel so that the user gets every notification broadcast
  * to that channel.
  * @param {string} channelName the name of the channel to which the notification is broadcast
  * @param {number} userId the id of the person to be subscribed
  * @return {object} an object containing the channel and subscription
  */
  static async subscribe(channelName, userId) {
    const [chan] = await Channel.findOrCreate({
      where: [{ name: channelName }],
      defaults: { name: channelName }
    });
    const { id: channelId } = chan.dataValues;
    const [sub, created] = await Subscription.findOrCreate({
      where: [{ userId }, { channelId }],
      defaults: { userId, channelId }
    });
    const channel = chan.dataValues;
    const subscription = sub.dataValues;
    subscription.created = created;
    return { channel, subscription };
  }

  /**
  * Unsubscribes a user from a channel so that the user no longer gets notifications
  * on that channel.
  * @param {string} channelName the name of the channel the user intends to unsubscribe from
  * @param {number} userId the id of the person to be unsubscribed
  * @return {boolean} true if the user is successfully unsubscribed
  */
  static async unSubscribe(channelName, userId) {
    const chan = await Channel.findOne({
      where: [{ name: channelName }]
    });
    const { id: channelId } = chan.dataValues;
    return Subscription.destroy({
      where: [{ userId }, { channelId }]
    });
  }

  /**
  * Unsubscribes a user from a channel so that the user no longer gets notifications
  * on that channel.
  * @param {string} channelName the name of the channel the user intends to unsubscribe from
  * @param {number} userId the id of the person to be unsubscribed
  * @return {boolean} true if the user is successfully unsubscribed
  */
  static filterNotifications(data, loggedInUser) {
    const isNew = (subscription, notification) => notification.createdAt >= subscription.createdAt;
    const user = data.dataValues;
    if (user.username !== loggedInUser) {
      user.subscriptions = undefined;
      return user;
    }
    const subscriptions = user.subscriptions.map((subscription) => {
      const sub = subscription.dataValues;
      const channel = sub.channel.dataValues;
      const not = channel.notifications
        .filter(notification => isNew(sub, notification));
      channel.notifications = not;
      sub.channel = channel;
      return sub;
    });
    user.subscriptions = subscriptions;
    return user;
  }
}
