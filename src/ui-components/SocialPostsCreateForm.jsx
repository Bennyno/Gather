/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { SocialPosts } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button
            size="small"
            variation="link"
            isDisabled={hasError}
            onClick={addItem}
          >
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function SocialPostsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    message: "",
    author: "",
    profilePic: "",
    postTime: "",
    postDate: "",
    sharesCount: "",
    likesCount: "",
    crosspostCount: "",
    likedBy: [],
  };
  const [message, setMessage] = React.useState(initialValues.message);
  const [author, setAuthor] = React.useState(initialValues.author);
  const [profilePic, setProfilePic] = React.useState(initialValues.profilePic);
  const [postTime, setPostTime] = React.useState(initialValues.postTime);
  const [postDate, setPostDate] = React.useState(initialValues.postDate);
  const [sharesCount, setSharesCount] = React.useState(
    initialValues.sharesCount
  );
  const [likesCount, setLikesCount] = React.useState(initialValues.likesCount);
  const [crosspostCount, setCrosspostCount] = React.useState(
    initialValues.crosspostCount
  );
  const [likedBy, setLikedBy] = React.useState(initialValues.likedBy);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setMessage(initialValues.message);
    setAuthor(initialValues.author);
    setProfilePic(initialValues.profilePic);
    setPostTime(initialValues.postTime);
    setPostDate(initialValues.postDate);
    setSharesCount(initialValues.sharesCount);
    setLikesCount(initialValues.likesCount);
    setCrosspostCount(initialValues.crosspostCount);
    setLikedBy(initialValues.likedBy);
    setCurrentLikedByValue("");
    setErrors({});
  };
  const [currentLikedByValue, setCurrentLikedByValue] = React.useState("");
  const likedByRef = React.createRef();
  const validations = {
    message: [],
    author: [],
    profilePic: [],
    postTime: [],
    postDate: [],
    sharesCount: [],
    likesCount: [],
    crosspostCount: [],
    likedBy: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          message,
          author,
          profilePic,
          postTime,
          postDate,
          sharesCount,
          likesCount,
          crosspostCount,
          likedBy,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(new SocialPosts(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "SocialPostsCreateForm")}
      {...rest}
    >
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message: value,
              author,
              profilePic,
              postTime,
              postDate,
              sharesCount,
              likesCount,
              crosspostCount,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
      ></TextField>
      <TextField
        label="Author"
        isRequired={false}
        isReadOnly={false}
        value={author}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              author: value,
              profilePic,
              postTime,
              postDate,
              sharesCount,
              likesCount,
              crosspostCount,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.author ?? value;
          }
          if (errors.author?.hasError) {
            runValidationTasks("author", value);
          }
          setAuthor(value);
        }}
        onBlur={() => runValidationTasks("author", author)}
        errorMessage={errors.author?.errorMessage}
        hasError={errors.author?.hasError}
        {...getOverrideProps(overrides, "author")}
      ></TextField>
      <TextField
        label="Profile pic"
        isRequired={false}
        isReadOnly={false}
        value={profilePic}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              author,
              profilePic: value,
              postTime,
              postDate,
              sharesCount,
              likesCount,
              crosspostCount,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.profilePic ?? value;
          }
          if (errors.profilePic?.hasError) {
            runValidationTasks("profilePic", value);
          }
          setProfilePic(value);
        }}
        onBlur={() => runValidationTasks("profilePic", profilePic)}
        errorMessage={errors.profilePic?.errorMessage}
        hasError={errors.profilePic?.hasError}
        {...getOverrideProps(overrides, "profilePic")}
      ></TextField>
      <TextField
        label="Post time"
        isRequired={false}
        isReadOnly={false}
        type="time"
        value={postTime}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              author,
              profilePic,
              postTime: value,
              postDate,
              sharesCount,
              likesCount,
              crosspostCount,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.postTime ?? value;
          }
          if (errors.postTime?.hasError) {
            runValidationTasks("postTime", value);
          }
          setPostTime(value);
        }}
        onBlur={() => runValidationTasks("postTime", postTime)}
        errorMessage={errors.postTime?.errorMessage}
        hasError={errors.postTime?.hasError}
        {...getOverrideProps(overrides, "postTime")}
      ></TextField>
      <TextField
        label="Post date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        value={postDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              message,
              author,
              profilePic,
              postTime,
              postDate: value,
              sharesCount,
              likesCount,
              crosspostCount,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.postDate ?? value;
          }
          if (errors.postDate?.hasError) {
            runValidationTasks("postDate", value);
          }
          setPostDate(value);
        }}
        onBlur={() => runValidationTasks("postDate", postDate)}
        errorMessage={errors.postDate?.errorMessage}
        hasError={errors.postDate?.hasError}
        {...getOverrideProps(overrides, "postDate")}
      ></TextField>
      <TextField
        label="Shares count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={sharesCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              message,
              author,
              profilePic,
              postTime,
              postDate,
              sharesCount: value,
              likesCount,
              crosspostCount,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.sharesCount ?? value;
          }
          if (errors.sharesCount?.hasError) {
            runValidationTasks("sharesCount", value);
          }
          setSharesCount(value);
        }}
        onBlur={() => runValidationTasks("sharesCount", sharesCount)}
        errorMessage={errors.sharesCount?.errorMessage}
        hasError={errors.sharesCount?.hasError}
        {...getOverrideProps(overrides, "sharesCount")}
      ></TextField>
      <TextField
        label="Likes count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={likesCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              message,
              author,
              profilePic,
              postTime,
              postDate,
              sharesCount,
              likesCount: value,
              crosspostCount,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.likesCount ?? value;
          }
          if (errors.likesCount?.hasError) {
            runValidationTasks("likesCount", value);
          }
          setLikesCount(value);
        }}
        onBlur={() => runValidationTasks("likesCount", likesCount)}
        errorMessage={errors.likesCount?.errorMessage}
        hasError={errors.likesCount?.hasError}
        {...getOverrideProps(overrides, "likesCount")}
      ></TextField>
      <TextField
        label="Crosspost count"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={crosspostCount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              message,
              author,
              profilePic,
              postTime,
              postDate,
              sharesCount,
              likesCount,
              crosspostCount: value,
              likedBy,
            };
            const result = onChange(modelFields);
            value = result?.crosspostCount ?? value;
          }
          if (errors.crosspostCount?.hasError) {
            runValidationTasks("crosspostCount", value);
          }
          setCrosspostCount(value);
        }}
        onBlur={() => runValidationTasks("crosspostCount", crosspostCount)}
        errorMessage={errors.crosspostCount?.errorMessage}
        hasError={errors.crosspostCount?.hasError}
        {...getOverrideProps(overrides, "crosspostCount")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              message,
              author,
              profilePic,
              postTime,
              postDate,
              sharesCount,
              likesCount,
              crosspostCount,
              likedBy: values,
            };
            const result = onChange(modelFields);
            values = result?.likedBy ?? values;
          }
          setLikedBy(values);
          setCurrentLikedByValue("");
        }}
        currentFieldValue={currentLikedByValue}
        label={"Liked by"}
        items={likedBy}
        hasError={errors?.likedBy?.hasError}
        errorMessage={errors?.likedBy?.errorMessage}
        setFieldValue={setCurrentLikedByValue}
        inputFieldRef={likedByRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Liked by"
          isRequired={false}
          isReadOnly={false}
          value={currentLikedByValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.likedBy?.hasError) {
              runValidationTasks("likedBy", value);
            }
            setCurrentLikedByValue(value);
          }}
          onBlur={() => runValidationTasks("likedBy", currentLikedByValue)}
          errorMessage={errors.likedBy?.errorMessage}
          hasError={errors.likedBy?.hasError}
          ref={likedByRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "likedBy")}
        ></TextField>
      </ArrayField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
