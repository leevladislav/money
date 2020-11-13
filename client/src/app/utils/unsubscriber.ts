import {Subscription} from 'rxjs';

export function unsubscribe(subscriptions: Subscription[]) {
  subscriptions.forEach(subscription => subscription.unsubscribe());
}
