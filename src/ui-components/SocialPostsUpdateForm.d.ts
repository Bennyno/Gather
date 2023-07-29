/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { SocialPosts } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SocialPostsUpdateFormInputValues = {
    message?: string;
    author?: string;
    profilePic?: string;
    postTime?: string;
    postDate?: string;
    sharesCount?: number;
    likesCount?: number;
    crosspostCount?: number;
    likedBy?: string[];
};
export declare type SocialPostsUpdateFormValidationValues = {
    message?: ValidationFunction<string>;
    author?: ValidationFunction<string>;
    profilePic?: ValidationFunction<string>;
    postTime?: ValidationFunction<string>;
    postDate?: ValidationFunction<string>;
    sharesCount?: ValidationFunction<number>;
    likesCount?: ValidationFunction<number>;
    crosspostCount?: ValidationFunction<number>;
    likedBy?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SocialPostsUpdateFormOverridesProps = {
    SocialPostsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    author?: PrimitiveOverrideProps<TextFieldProps>;
    profilePic?: PrimitiveOverrideProps<TextFieldProps>;
    postTime?: PrimitiveOverrideProps<TextFieldProps>;
    postDate?: PrimitiveOverrideProps<TextFieldProps>;
    sharesCount?: PrimitiveOverrideProps<TextFieldProps>;
    likesCount?: PrimitiveOverrideProps<TextFieldProps>;
    crosspostCount?: PrimitiveOverrideProps<TextFieldProps>;
    likedBy?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SocialPostsUpdateFormProps = React.PropsWithChildren<{
    overrides?: SocialPostsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    socialPosts?: SocialPosts;
    onSubmit?: (fields: SocialPostsUpdateFormInputValues) => SocialPostsUpdateFormInputValues;
    onSuccess?: (fields: SocialPostsUpdateFormInputValues) => void;
    onError?: (fields: SocialPostsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SocialPostsUpdateFormInputValues) => SocialPostsUpdateFormInputValues;
    onValidate?: SocialPostsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function SocialPostsUpdateForm(props: SocialPostsUpdateFormProps): React.ReactElement;
