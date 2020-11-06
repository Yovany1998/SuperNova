import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Input, Container, Form, Item, H1, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import GalleryScreen from "./GalleryScreen";

//destructuring
const { width, height } = Dimensions.get("window");
//renderizar pantalla
const MainScreen = ({ route, navigation }) => {
  return (
    //backgroundcolor el color de fondo
    <Container style={{ backgroundColor: "#FFFFFF" }}>
      <Image
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />
      <Form>
        <Grid>
          <Image
            source={require("../../assets/portada2.jpg")}
            style={{ height: 1000 }}
          />
        </Grid>
        <H1 style={styles.title}>Choose an Option</H1>
        <Button
          onPress={() => navigation.navigate("GalleryScreen")}
          style={styles.buttonCenter}
          block
        >
          <Text style={styles.buttonName}>Gallery </Text>
          <Entypo name="folder-images" size={30} color="black" />
        </Button>
        <Button
          onPress={() => navigation.navigate("MarsRobot")}
          style={styles.buttonCenter}
          block
          blue
        >
          <Text style={styles.buttonName}>Mars Rover </Text>
          <AntDesign name="android" size={30} color="black" />
        </Button>
        <Button
          onPress={() => navigation.navigate("DayImage")}
          style={styles.buttonCenter}
          block
          blue
        >
          <Text style={styles.buttonName}>Image of the Day </Text>
          <Entypo name="camera" size={30} color="black" />
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
    height: "12%",
    resizeMode: "contain",
    //marginTop: 20,
  },
  title: {
    marginTop: "2%",
    textAlign: "center",
    color: "white",
    fontSize: 30,
  },
  buttonName: {
    fontSize: 25,
  },
  buttonCenter: {
    marginTop: "15%",
    marginRight: "10%",
    marginLeft: "10%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: "12%",
  },
});

export default MainScreen;
