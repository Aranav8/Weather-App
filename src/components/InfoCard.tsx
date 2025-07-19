import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType } from 'react-native';

type InfoCardProps = {
  icon: ImageSourcePropType;
  text: string;
};

const InfoCard = ({ icon, text }: InfoCardProps) => (
  <View style={styles.info}>
    <Image source={icon} style={styles.weatherInfoImg} />
    <Text style={styles.infoText}>{text}</Text>
  </View>
);

export default InfoCard;

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  weatherInfoImg: {
    height: 25,
    width: 25
  },
  infoText: {
    color: '#FFFFFF',
    fontWeight: '400', 
    fontSize: 18,
    marginLeft: 10
  }
});
