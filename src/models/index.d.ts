import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly message?: string | null;
  readonly messageTime?: string | null;
  readonly messageDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyMessage = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Message, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly message?: string | null;
  readonly messageTime?: string | null;
  readonly messageDate?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Message = LazyLoading extends LazyLoadingDisabled ? EagerMessage : LazyMessage

export declare const Message: (new (init: ModelInit<Message>) => Message) & {
  copyOf(source: Message, mutator: (draft: MutableModel<Message>) => MutableModel<Message> | void): Message;
}

type EagerUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUsers = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Users, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly username?: string | null;
  readonly email?: string | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Users = LazyLoading extends LazyLoadingDisabled ? EagerUsers : LazyUsers

export declare const Users: (new (init: ModelInit<Users>) => Users) & {
  copyOf(source: Users, mutator: (draft: MutableModel<Users>) => MutableModel<Users> | void): Users;
}

type EagerSocialPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SocialPosts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly author?: string | null;
  readonly profilePic?: string | null;
  readonly postTime?: string | null;
  readonly postDate?: string | null;
  readonly sharesCount?: number | null;
  readonly likesCount?: number | null;
  readonly crosspostCount?: number | null;
  readonly likedBy: (string | null)[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazySocialPosts = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SocialPosts, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly message?: string | null;
  readonly author?: string | null;
  readonly profilePic?: string | null;
  readonly postTime?: string | null;
  readonly postDate?: string | null;
  readonly sharesCount?: number | null;
  readonly likesCount?: number | null;
  readonly crosspostCount?: number | null;
  readonly likedBy: (string | null)[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SocialPosts = LazyLoading extends LazyLoadingDisabled ? EagerSocialPosts : LazySocialPosts

export declare const SocialPosts: (new (init: ModelInit<SocialPosts>) => SocialPosts) & {
  copyOf(source: SocialPosts, mutator: (draft: MutableModel<SocialPosts>) => MutableModel<SocialPosts> | void): SocialPosts;
}