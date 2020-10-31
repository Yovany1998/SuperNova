import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Input, Container, Form, Item, H1, Button, Icon } from "native-base";

//destructuring
const { width, height } = Dimensions.get("window");
//renderizar pantalla
const MainScreen = () => {
  return (
    //backgroundcolor el color de fondo
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      <Image
        source={require("../../assets/super_nova.jpeg")}
        style={styles.photoImage}
      />
      <H1>- - -Apartados de la aplicación- - - -</H1>
      <Form>
        <Item style={styles.buttonCenter}>
          <Button icon bordered warning style={{ flex: 0.5 }}>
            <Text>Galeria</Text>
            <Entypo name="folder-images" size={24} color="black" />
          </Button>
        </Item>
      </Form>
      <Form>
        <Item style={styles.buttonCenter}>
          <Button icon bordered warning style={{ flex: 0.5 }}>
            <Text>Robot de Marte</Text>
            <AntDesign name="android" size={24} color="black" />
          </Button>
        </Item>
      </Form>
      <Form>
        <Item style={styles.buttonCenter}>
          <Button bordered warning style={{ flex: 0.5 }}>
            <Text>Foto del dia</Text>
            <Entypo name="camera" size={24} color="black" />
          </Button>
        </Item>
      </Form>
    </Container>
  );
};

//estilos de la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 15,
  },
  photoImage: {
    width: width,
    height: height * 0.33,
    resizeMode: "stretch",
  },
  buttonCenter: {
    // flex: 2,
    marginTop: 70,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
    //  backgroundColor: "#000000",
  },
});

export default MainScreen;
