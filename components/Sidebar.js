import { useState, useEffect } from "react";
import { Storage, DataStore, Auth } from "aws-amplify";
import { Flex, Text, View, Icon, Divider, Image } from "@aws-amplify/ui-react";
import { Users } from "@/models";
import Settings from "./Settings";
import { useRouter } from "next/navigation";
import { LuMessagesSquare } from "react-icons/lu";
import { IoHomeOutline } from "react-icons/io5";
import { LiaThListSolid } from "react-icons/lia";
import { SiTheconversation } from "react-icons/si";
import styles from "../src/styles/sidebar.module.css";

const Sidebar = () => {
  const router = useRouter();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [imageKeys, setImageKeys] = useState(null);
  const [image, setImage] = useState(null);
  const [fileUpoad, setFileUpload] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      const authUser = await Auth.currentAuthenticatedUser();
      const authEmail = authUser.attributes.email;
      const original = await DataStore.query(Users);

      if (authUser) {
        original.map((item) => {
          if (authEmail === item.email) {
            setImage(item.image);
          }
        });
      }
      const { results } = await Storage.list("", { level: "private" });

      const sortedResults = results.sort(
        (a, b) => a.lastModified - b.lastModified
      );

      setImageKeys(results);
      const s3Images = await Promise.all(
        sortedResults.map(
          async (image) => await Storage.get(image.key, { level: "private" })
        )
      );
      const s3Image = s3Images[s3Images.length - 1];
      setImage(s3Image);
      setFileUpload(true);

      DataStore.observe(Users).subscribe((user) => {
        if (user.opType === "UPDATE") {
          fetchImages();
        }
      });
    };

    fetchImages();
  }, [fileUpoad]);

  const openSettings = () => {
    setSettingsOpen(!settingsOpen);
  };

  useEffect(() => {
    const getNames = async () => {
      const dbUsers = await DataStore.query(Users);
      const authUser = await Auth.currentAuthenticatedUser();
      if (authUser) {
        const authEmail = authUser.attributes.email;
        setEmail(authEmail);

        const dbEmail = dbUsers.map((item) => {
          if (authEmail === item.email) {
            setUsername(item.username);
          }
        });
      }

      DataStore.observe(Users).subscribe((user) => {
        if (user.opType === "UPDATE") {
          getNames();
        }
      });
    };
    getNames();
  }, []);

  const goHome = () => {
    router.push("/home");
  };

  return (
    <View>
      <Flex
        gap="16px"
        direction="column"
        width="385px"
        height="100vh"
        justifyContent="flex-start"
        alignItems="flex-start"
        position="fixed"
        backgroundColor="black"
        border="solid white 1px"
      >
        <Flex
          gap="16px"
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          grow="1"
          shrink="1"
          basis="0"
          alignSelf="stretch"
          position="relative"
          padding="0px 32px 0px 32px"
        >
          <Image
            height="160px"
            display="block"
            alignSelf="stretch"
            marginBottom="-50px"
            shrink="0"
            position="relative"
            objectFit="cover"
            src="/logo.png"
          />

          <Flex
            gap="16px"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
          >
            <Flex
              gap="16px"
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              className={styles.sidebarOption}
              onClick={() => router.push("/feed")}
            >
              <Flex
                width="24px"
                height="24px"
                overflow="hidden"
                shrink="0"
                position="relative"
                onClick={goHome}
              >
                <IoHomeOutline />
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="20px"
                fontWeight="400"
                color="white"
                lineHeight="24px"
                textAlign="left"
                display="block"
                letterSpacing="0.01px"
                shrink="0"
                position="relative"
                whiteSpace="pre-wrap"
              >
                Home
              </Text>
            </Flex>
            <Flex
              gap="16px"
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              shrink="0"
              position="relative"
              className={styles.sidebarOption}
              onClick={() => router.push("/discussions")}
            >
              <Flex
                width="24px"
                height="24px"
                overflow="hidden"
                shrink="0"
                position="relative"
              >
                <SiTheconversation />
              </Flex>
              <Text
                fontFamily="Inter"
                fontSize="20px"
                fontWeight="400"
                color="white"
                lineHeight="24px"
                textAlign="left"
                display="block"
                letterSpacing="0.01px"
                shrink="0"
                position="relative"
                whiteSpace="pre-wrap"
              >
                Discussions
              </Text>
            </Flex>
          </Flex>
          <Flex
            gap="16px"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            shrink="0"
            position="relative"
          >
            <Flex
              gap="16px"
              direction="column"
              justifyContent="flex-start"
              alignItems="flex-start"
              shrink="0"
              position="relative"
            >
              <Flex
                gap="16px"
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                shrink="0"
                position="relative"
                className={styles.sidebarOption}
              >
                <Flex
                  width="24px"
                  height="24px"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                >
                  <LuMessagesSquare />
                </Flex>
                <Text
                  fontFamily="Inter"
                  fontSize="20px"
                  fontWeight="400"
                  color="white"
                  lineHeight="24px"
                  textAlign="left"
                  display="block"
                  letterSpacing="0.01px"
                  shrink="0"
                  position="relative"
                  whiteSpace="pre-wrap"
                >
                  Messages
                </Text>
              </Flex>
              <Flex
                gap="16px"
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                shrink="0"
                position="relative"
                className={styles.sidebarOption}
              >
                <Flex
                  width="24px"
                  height="24px"
                  overflow="hidden"
                  shrink="0"
                  position="relative"
                >
                  <LiaThListSolid />
                </Flex>
                <Text
                  fontFamily="Inter"
                  fontSize="20px"
                  fontWeight="400"
                  color="white"
                  lineHeight="24px"
                  textAlign="left"
                  display="block"
                  letterSpacing="0.01px"
                  shrink="0"
                  position="relative"
                  whiteSpace="pre-wrap"
                >
                  Lists
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          gap="16px"
          direction="column"
          height="81px"
          justifyContent="flex-end"
          alignItems="flex-start"
          shrink="0"
          position="relative"
          marginBottom="5%"
        >
          <Divider
            width="385px"
            height="1px"
            shrink="0"
            size="small"
            orientation="horizontal"
          />
          {settingsOpen ? <Settings /> : null}
          <Flex
            gap="129px"
            direction="row"
            width="385px"
            justifyContent="flex-start"
            alignItems="center"
            shrink="0"
            position="relative"
            padding="0px 32px 0px 32px"
          >
            <Flex
              gap="16px"
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              grow="1"
              shrink="1"
              basis="0"
              position="relative"
            >
              <Image
                width="65px"
                height="65px"
                display="block"
                shrink="0"
                position="relative"
                borderRadius="40px"
                backgroundColor="rgba(196,196,196,1)"
                src={image}
              />
              <Flex
                gap="0"
                direction="column"
                width="100px"
                justifyContent="flex-start"
                alignItems="flex-start"
                shrink="0"
                position="relative"
              >
                <Text
                  fontFamily="Inter"
                  fontSize="16px"
                  fontWeight="600"
                  color="white"
                  lineHeight="24px"
                  textAlign="left"
                  display="block"
                  letterSpacing="0.01px"
                  shrink="0"
                  alignSelf="stretch"
                  position="relative"
                  whiteSpace="pre-wrap"
                >
                  {username}
                </Text>
                <Text
                  fontFamily="Inter"
                  fontSize="14px"
                  fontWeight="600"
                  color="white"
                  lineHeight="24px"
                  textAlign="left"
                  display="block"
                  shrink="0"
                  alignSelf="stretch"
                  position="relative"
                  whiteSpace="pre-wrap"
                >
                  {email}
                </Text>
              </Flex>
            </Flex>
            <Flex
              width="24px"
              height="24px"
              overflow="hidden"
              shrink="0"
              position="relative"
              className={styles.sidebarOption}
              onClick={openSettings}
            >
              <Icon
                width="19.45px"
                height="20px"
                viewBox={{ minX: 0, minY: 0, width: 19.4541015625, height: 20 }}
                paths={[
                  {
                    d: "M 17.159332275390625 10.979999542236328 C 17.199332274496555 10.659999549388885 17.229331970214844 10.340000003576279 17.229331970214844 10 C 17.229331970214844 9.659999996423721 17.199332274496555 9.340000450611115 17.159332275390625 9.020000457763672 L 19.269332885742188 7.369999885559082 C 19.459332883358 7.2199998795986176 19.509331814944744 6.949999541044235 19.389331817626953 6.729999542236328 L 17.389331817626953 3.2699999809265137 C 17.299331814050674 3.1099999845027924 17.129331290721893 3.0199999809265137 16.949331283569336 3.0199999809265137 C 16.88933128491044 3.0199999809265137 16.82933120802045 3.030000191181898 16.77933120727539 3.0500001907348633 L 14.289331436157227 4.050000190734863 C 13.769331455230713 3.650000184774399 13.20933187007904 3.320000171661377 12.599331855773926 3.070000171661377 L 12.219331741333008 0.4200000762939453 C 12.18933174200356 0.18000008165836334 11.979331970214844 0 11.729331970214844 0 L 7.7293314933776855 0 C 7.4793314933776855 0 7.269331721588969 0.18000008165836334 7.2393317222595215 0.4200000762939453 L 6.8593316078186035 3.070000171661377 C 6.249331593513489 3.320000171661377 5.689331531524658 3.660000205039978 5.1693315505981445 4.050000190734863 L 2.6793315410614014 3.0500001907348633 C 2.619331542402506 3.030000191181898 2.559331711381674 3.0199999809265137 2.4993317127227783 3.0199999809265137 C 2.329331710934639 3.0199999809265137 2.159331887960434 3.1099999845027924 2.0693318843841553 3.2699999809265137 L 0.0693315640091896 6.729999542236328 C -0.06066843122243881 6.949999541044235 -0.0006683021783828735 7.2199998795986176 0.18933169543743134 7.369999885559082 L 2.2993319034576416 9.020000457763672 C 2.2593319043517113 9.340000450611115 2.2293317317962646 9.669999986886978 2.2293317317962646 10 C 2.2293317317962646 10.330000013113022 2.2593319043517113 10.659999549388885 2.2993319034576416 10.979999542236328 L 0.18933169543743134 12.630000114440918 C -0.0006683021783828735 12.780000120401382 -0.05066843330860138 13.050000458955765 0.0693315640091896 13.270000457763672 L 2.0693318843841553 16.729999542236328 C 2.159331887960434 16.88999953866005 2.329331934452057 16.979999542236328 2.5093319416046143 16.979999542236328 C 2.5693319402635098 16.979999542236328 2.6293315403163433 16.97000076249242 2.6793315410614014 16.950000762939453 L 5.1693315505981445 15.950000762939453 C 5.689331531524658 16.350000768899918 6.249331593513489 16.68000030517578 6.8593316078186035 16.93000030517578 L 7.2393317222595215 19.579999923706055 C 7.269331721588969 19.819999918341637 7.4793314933776855 20 7.7293314933776855 20 L 11.729331970214844 20 C 11.979331970214844 20 12.18933174200356 19.819999918341637 12.219331741333008 19.579999923706055 L 12.599331855773926 16.93000030517578 C 13.20933187007904 16.68000030517578 13.769331455230713 16.34000074863434 14.289331436157227 15.950000762939453 L 16.77933120727539 16.950000762939453 C 16.839331205934286 16.97000076249242 16.899331513792276 16.979999542236328 16.959331512451172 16.979999542236328 C 17.12933151423931 16.979999542236328 17.299331814050674 16.88999953866005 17.389331817626953 16.729999542236328 L 19.389331817626953 13.270000457763672 C 19.509331814944744 13.050000458955765 19.459332883358 12.780000120401382 19.269332885742188 12.630000114440918 L 17.159332275390625 10.979999542236328 L 17.159332275390625 10.979999542236328 Z M 15.179332733154297 9.270000457763672 C 15.219332732260227 9.580000460147858 15.229331970214844 9.790000006556511 15.229331970214844 10 C 15.229331970214844 10.209999993443489 15.209332732483745 10.4299995303154 15.179332733154297 10.729999542236328 L 15.039331436157227 11.859999656677246 L 15.929332733154297 12.5600004196167 L 17.00933265686035 13.399999618530273 L 16.3093318939209 14.610000610351562 L 15.039331436157227 14.100000381469727 L 13.999332427978516 13.680000305175781 L 13.099331855773926 14.360000610351562 C 12.669331848621368 14.680000603199005 12.259331852197647 14.920000150799751 11.849331855773926 15.09000015258789 L 10.789332389831543 15.520000457763672 L 10.629331588745117 16.649999618530273 L 10.42933177947998 18 L 9.029332160949707 18 L 8.83933162689209 16.649999618530273 L 8.67933177947998 15.520000457763672 L 7.6193318367004395 15.09000015258789 C 7.189331829547882 14.910000145435333 6.789331346750259 14.67999917268753 6.389331340789795 14.379999160766602 L 5.4793314933776855 13.680000305175781 L 4.4193315505981445 14.110000610351562 L 3.14933180809021 14.620000839233398 L 2.449331521987915 13.40999984741211 L 3.529331922531128 12.569999694824219 L 4.4193315505981445 11.869999885559082 L 4.279331684112549 10.739999771118164 C 4.249331684783101 10.429999768733978 4.2293314933776855 10.200000002980232 4.2293314933776855 10 C 4.2293314933776855 9.799999997019768 4.249331684783101 9.5700004696846 4.279331684112549 9.270000457763672 L 4.4193315505981445 8.140000343322754 L 3.529331922531128 7.439999580383301 L 2.449331521987915 6.600000381469727 L 3.14933180809021 5.389999866485596 L 4.4193315505981445 5.900000095367432 L 5.459331512451172 6.319999694824219 L 6.3593316078186035 5.639999866485596 C 6.789331614971161 5.319999873638153 7.199331611394882 5.079999849200249 7.6093316078186035 4.909999847412109 L 8.669331550598145 4.480000019073486 L 8.82933235168457 3.3499999046325684 L 9.029332160949707 2 L 10.419331550598145 2 L 10.609332084655762 3.3499999046325684 L 10.769331932067871 4.480000019073486 L 11.82933235168457 4.909999847412109 C 12.259332358837128 5.089999854564667 12.659331887960434 5.319999873638153 13.059331893920898 5.619999885559082 L 13.969331741333008 6.319999694824219 L 15.02933120727539 5.889999866485596 L 16.299331665039062 5.380000114440918 L 16.999332427978516 6.590000152587891 L 15.929332733154297 7.439999580383301 L 15.039331436157227 8.140000343322754 L 15.179332733154297 9.270000457763672 Z M 9.729331970214844 6 C 7.519331932067871 6 5.7293314933776855 7.789999961853027 5.7293314933776855 10 C 5.7293314933776855 12.210000038146973 7.519331932067871 14 9.729331970214844 14 C 11.939332008361816 14 13.729331970214844 12.210000038146973 13.729331970214844 10 C 13.729331970214844 7.789999961853027 11.939332008361816 6 9.729331970214844 6 Z M 9.729331970214844 12 C 8.629331946372986 12 7.7293314933776855 11.100000023841858 7.7293314933776855 10 C 7.7293314933776855 8.899999976158142 8.629331946372986 8 9.729331970214844 8 C 10.829331994056702 8 11.729331970214844 8.899999976158142 11.729331970214844 10 C 11.729331970214844 11.100000023841858 10.829331994056702 12 9.729331970214844 12 Z",
                    fillRule: "nonzero",
                  },
                  {
                    d: "M17.1593 10.98C17.1993 10.66 17.2293 10.34 17.2293 10C17.2293 9.66 17.1993 9.34 17.1593 9.02L19.2693 7.37C19.4593 7.22 19.5093 6.95 19.3893 6.73L17.3893 3.27C17.2993 3.11 17.1293 3.02 16.9493 3.02C16.8893 3.02 16.8293 3.03 16.7793 3.05L14.2893 4.05C13.7693 3.65 13.2093 3.32 12.5993 3.07L12.2193 0.42C12.1893 0.18 11.9793 0 11.7293 0L7.72933 0C7.47933 0 7.26933 0.18 7.23933 0.42L6.85933 3.07C6.24933 3.32 5.68933 3.66 5.16933 4.05L2.67933 3.05C2.61933 3.03 2.55933 3.02 2.49933 3.02C2.32933 3.02 2.15933 3.11 2.06933 3.27L0.0693316 6.73C-0.0606684 6.95 -0.000668302 7.22 0.189332 7.37L2.29933 9.02C2.25933 9.34 2.22933 9.67 2.22933 10C2.22933 10.33 2.25933 10.66 2.29933 10.98L0.189332 12.63C-0.000668302 12.78 -0.0506684 13.05 0.0693316 13.27L2.06933 16.73C2.15933 16.89 2.32933 16.98 2.50933 16.98C2.56933 16.98 2.62933 16.97 2.67933 16.95L5.16933 15.95C5.68933 16.35 6.24933 16.68 6.85933 16.93L7.23933 19.58C7.26933 19.82 7.47933 20 7.72933 20L11.7293 20C11.9793 20 12.1893 19.82 12.2193 19.58L12.5993 16.93C13.2093 16.68 13.7693 16.34 14.2893 15.95L16.7793 16.95C16.8393 16.97 16.8993 16.98 16.9593 16.98C17.1293 16.98 17.2993 16.89 17.3893 16.73L19.3893 13.27C19.5093 13.05 19.4593 12.78 19.2693 12.63L17.1593 10.98L17.1593 10.98ZM15.1793 9.27C15.2193 9.58 15.2293 9.79 15.2293 10C15.2293 10.21 15.2093 10.43 15.1793 10.73L15.0393 11.86L15.9293 12.56L17.0093 13.4L16.3093 14.61L15.0393 14.1L13.9993 13.68L13.0993 14.36C12.6693 14.68 12.2593 14.92 11.8493 15.09L10.7893 15.52L10.6293 16.65L10.4293 18L9.02933 18L8.83933 16.65L8.67933 15.52L7.61933 15.09C7.18933 14.91 6.78933 14.68 6.38933 14.38L5.47933 13.68L4.41933 14.11L3.14933 14.62L2.44933 13.41L3.52933 12.57L4.41933 11.87L4.27933 10.74C4.24933 10.43 4.22933 10.2 4.22933 10C4.22933 9.8 4.24933 9.57 4.27933 9.27L4.41933 8.14L3.52933 7.44L2.44933 6.6L3.14933 5.39L4.41933 5.9L5.45933 6.32L6.35933 5.64C6.78933 5.32 7.19933 5.08 7.60933 4.91L8.66933 4.48L8.82933 3.35L9.02933 2L10.4193 2L10.6093 3.35L10.7693 4.48L11.8293 4.91C12.2593 5.09 12.6593 5.32 13.0593 5.62L13.9693 6.32L15.0293 5.89L16.2993 5.38L16.9993 6.59L15.9293 7.44L15.0393 8.14L15.1793 9.27ZM9.72933 6C7.51933 6 5.72933 7.79 5.72933 10C5.72933 12.21 7.51933 14 9.72933 14C11.9393 14 13.7293 12.21 13.7293 10C13.7293 7.79 11.9393 6 9.72933 6ZM9.72933 12C8.62933 12 7.72933 11.1 7.72933 10C7.72933 8.9 8.62933 8 9.72933 8C10.8293 8 11.7293 8.9 11.7293 10C11.7293 11.1 10.8293 12 9.72933 12Z",
                    fill: "white",
                    fillRule: "nonzero",
                  },
                ]}
                display="block"
                position="absolute"
                top="8.33%"
                bottom="8.33%"
                left="9.46%"
                right="9.48%"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </View>
  );
};

export default Sidebar;
