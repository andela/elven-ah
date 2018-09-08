import { } from 'dotenv/config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import NotificationController from '../controllers/NotificationController';

chai.should();
chai.use(chaiHttp);

describe('Notifications methods', () => {
  const channel = 'article-nothing-special-going-on-here';
  describe('subscribe method', () => {
    it('should should subscribe a user to a channel and return the channel and subscription', async () => {
      const data = await NotificationController.subscribe(channel, 3);
      data.should.be.a('object');
      data.should.have.property('subscription');
      data.should.have.nested.property('subscription.userId').eql(3);
      data.should.have.nested.property('subscription.channelId');
      data.should.have.property('channel');
      data.should.have.nested.property('channel.name').eql('article-nothing-special-going-on-here');
    });
  });
  describe('notifyReaders method', () => {
    it('should create a notification in the db and return it', async () => {
      const user = {
        userId: 2,
        channelId: 2,
        articleSlug: 'nothing-special-going-on-here',
        resourceId: 3,
      };
      const notification = await NotificationController.notifyReaders(channel, 'event', user);
      notification.should.be.a('object');
      notification.creator.should.eql(2);
      notification.channelId.should.be.eql(2);
      notification.resourceId.should.be.eql(3);
      notification.articleSlug.should.be.a('string');
    });
  });
  describe('notifyAuthor method', () => {
    it('should create a notification in the db and return it', async () => {
      const data = {
        userId: 2,
        articleSlug: 'nothing-special-going-on-here',
        username: 'Sweetheart',
        resourceId: 3,
      };
      const notification = await NotificationController.notifyAuthor('channel', data);
      notification.should.be.a('object');
      notification.creator.should.eql(2);
      notification.resourceId.should.be.eql(3);
    });
  });
  describe('notifyOnUpdate method', () => {
    it('should create a notification in the db and return it', async () => {
      const article = {
        userId: 2,
        articleSlug: 'nothing-special-going-on-here',
        resourceId: 3
      };
      const notification = await NotificationController.notifyOnUpdate('channel', article);
      notification.should.be.a('object');
      notification.creator.should.eql(2);
      notification.resourceId.should.be.eql(3);
    });
  });
  describe('unsubscribe method', () => {
    it('should delete a subscription from the database', async () => {
      const deleted = await NotificationController.unSubscribe(channel, 3);
      deleted.should.eql(1);
    });
  });
});
