import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Input, Container, Form, Item, H1, Button, Icon } from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';

//destructuring
const { width, height } = Dimensions.get("window");
//renderizar pantalla
const MainScreen = () => {
  return (
    //backgroundcolor el color de fondo
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      <Image
        source={require("../../assets/luna.png")}
        style={styles.photoImage}
      />
      <Form>
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={{ height: 1000,}}
        />
        </Grid>
        <H1 style={styles.title}>Elija una opcion</H1>
          <Button  style={styles.buttonCenter} block>
            <Text>Galeria   </Text>
            <Entypo name="folder-images" size={24} color="black" />
          </Button>
          <Button  style={styles.buttonCenter} block blue>
            <Text>Robot de Marte  </Text>
            <AntDesign name="android" size={24} color="black" />
          </Button>
          <Button  style={styles.buttonCenter} block blue>
            <Text>Foto del dia  </Text>
            <Entypo name="camera" size={24} color="black" />
          </Button>
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
    height: "11%",
    resizeMode: "stretch",
    marginTop: 20,
  },
  title: {
    marginTop: 30,
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  buttonCenter: {
    // flex: 2,
    marginTop: 100,
    marginRight: 15,
    marginLeft: 15,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    //  backgroundColor: "#000000",
  },
});

export default MainScreen;
