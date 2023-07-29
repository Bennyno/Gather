/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type SocialPostsCreateFormInputValues = {
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
export declare type SocialPostsCreateFormValidationValues = {
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
export declare type SocialPostsCreateFormOverridesProps = {
    SocialPostsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type SocialPostsCreateFormProps = React.PropsWithChildren<{
    overrides?: SocialPostsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SocialPostsCreateFormInputValues) => SocialPostsCreateFormInputValues;
    onSuccess?: (fields: SocialPostsCreateFormInputValues) => void;
    onError?: (fields: SocialPostsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SocialPostsCreateFormInputValues) => SocialPostsCreateFormInputValues;
    onValidate?: SocialPostsCreateFormValidationValues;
} & React.CSSProperties>;
export default function SocialPostsCreateForm(props: SocialPostsCreateFormProps): React.ReactElement;
