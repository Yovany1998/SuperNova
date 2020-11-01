import {
  Container,
  Form,
  Input,
  Item,
  Image,
  H1,
  Button,
  Header,
  Left,
  Right,
} from "native-base";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
const GalleryScreen = () => {
  return (
    <Container style={{ backgroundColor: "#C39BD3" }}>
      <Header searchBar>
        <Item>
          <Input inlineLabel placeholder="Buscar" />
        </Item>
        <Button>
          <Text>Cosas</Text>
        </Button>
      </Header>
      <H1 style={{ marginTop: 20 }}>Galeria</H1>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
  },
  photo: {
    width: width,
    height: height * 0.33,
    resizeMode: "contain",
  },
  search: {
    flexDirection: "column",
    flex: 1,
    marginTop: 40,
    marginRight: 15,
  },
});
export default GalleryScreen;
