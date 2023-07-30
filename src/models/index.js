// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Message, Users, SocialPosts } = initSchema(schema);

export {
  Message,
  Users,
  SocialPosts
};