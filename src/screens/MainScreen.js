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
        source={require("../../assets/SuperNova.png")}
        style={styles.photoImage}
      />
      <Form>
      <Grid>
        <Image
          source={require("../../assets/portada2.jpg")}
          style={{ height: 1000,}}
        />
        </Grid>
        <H1 style={styles.title}>Choose an Option</H1>
          <Button  style={styles.buttonCenter} block>
            <Text style={styles.buttonName}>Gallery </Text>
            <Entypo name="folder-images" size={40} color="black" />
          </Button>
          <Button  style={styles.buttonCenter} block blue>
            <Text style={styles.buttonName}>Mars Rover </Text>
            <AntDesign name="android" size={40} color="black" />
          </Button>
          <Button  style={styles.buttonCenter} block blue>
            <Text style={styles.buttonName}>Image of the Day </Text>
            <Entypo name="camera" size={40} color="black" />
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
  buttonName:{
    fontSize: 40,
  },
  buttonCenter: {
    // flex: 2,
    marginTop: 100,
    marginRight: 95,
    marginLeft: 95,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    //  backgroundColor: "#000000",
  },
});

export default MainScreen;
