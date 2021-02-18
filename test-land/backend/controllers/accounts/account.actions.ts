// @ts-nocheck
import { action } from '@pulsejs/wave';
import {
  AccountCollection as collection
} from './account.store';

interface AccountCreationPayload {
  username: string;
  email: string;
  password: string;
}

export const newAccount = action('account-create').function(async function (payload: AccountCreationPayload) {
  const match = await collection.match(payload, { mode: 'any' }); // check if any of the provided fields matches a db entry.
  if (match) {
    const matchedField = match.matches[0];
    console.log('someone tried to create a user with', payload, `but ${match.data.id} matched for the ${matchedField} field`);
    return {
      status: 'duplicate', // set the status; this is custom
      data: matchedField
    };
  }
}).rest({ method: 'POST', route: '/create' }); // assuming we are using a defined controller, this route will be accessible under /accounts/create

export const getAccount = actions('get-account').function(async function (payload: { id: string }) {
  const 
})