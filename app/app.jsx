var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {hashHistory} = require('react-router');

var actions = require('actions');
var store = require('configureStore').configure();
import firebase, {firebaseRef} from 'app/firebase/';
import router from 'app/router/';
import * as utils from 'app/utils';

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    hashHistory.push('/todos');
        var todoRef = firebaseRef.child(`users/${user.uid}/todos`);

    store.subscribe(() => {
      todoRef.on('child_added', (snapshot) => {
        if (!utils.todoExistsInState(store.getState(), snapshot.val())) {
            console.log(store.getState());
            store.dispatch(actions.sendSnapshot(snapshot));
        }
      });
    });

  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
});

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
