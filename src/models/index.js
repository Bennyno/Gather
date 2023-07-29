// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SocialPosts, Users, Message } = initSchema(schema);

export {
  SocialPosts,
  Users,
  Message
};