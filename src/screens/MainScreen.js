import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Input, Container, Form, Item, H1, Button } from "native-base";

//destructuring
const { width, height } = Dimensions.get("window");
//renderizar pantalla
const MainScreen = () => {
  return (
    //backgroundcolor el color de fondo
    <Container style={{ backgroundColor: "#333333" }}>
      <Image
        source={require("../../assets/super_nova.jpeg")}
        style={styles.photoImage}
      />
      <H1>- - - -Apartados de la apliacion- - - -</H1>
      <Form>
        <Item style={styles.buttonCenter}>
          <Button style={{ flex: 0.5, backgroundColor: "#FFFFFF" }}>
            <Text>Galeria</Text>
          </Button>
        </Item>
      </Form>
      <Form>
        <Item style={styles.buttonCenter}>
          <Button style={{ flex: 0.5, backgroundColor: "#FFFFFF" }}>
            <Text>Robot de Marte</Text>
          </Button>
        </Item>
      </Form>
      <Form>
        <Item style={styles.buttonCenter}>
          <Button style={{ flex: 0.5, backgroundColor: "#FFFFFF" }}>
            <Text>Foto del dia</Text>
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
