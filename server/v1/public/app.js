/* eslint-disable */

const baseURL = `${location.protocol}//${location.host}/api`;

const fetchData = (url, payload) => {
  const response = fetch(url, {
    method: payload.method,
    headers: {
      Accept: 'application/json',
      'Content-type': 'application/json',
      'x-access-token': payload.token,
    },
    body: payload.body,
  })
    .then(res => res.json());
  return response;
};

const getUserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const { token } = user;
  fetchData(`${baseURL}/user`, {
    method: 'GET',
    token,
  })
    .then((data) => {
      localStorage.setItem('subscriptions', JSON.stringify(data.user.subscriptions));
    });
};

// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

const pusher = new Pusher('b01744e6d2ede2eb4020', {
  cluster: 'mt1',
  encrypted: true
});
const subscriptions = JSON.parse(localStorage.getItem('subscriptions'));

subscriptions.map((subscription, index) => {
  const channel = {};
  channel[index] = pusher.subscribe(subscription.channel.name);
  channel[index].bind('notification', (data) => {
    window.alert(`A user just ${data.eventType} on your article with slug: ${data.articleSlug}`);
  });
});
