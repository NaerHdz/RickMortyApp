import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Character} from '../types/types';

type Props = {
  characters: Character;
};

export default function CardCharacter(props: Props): JSX.Element {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#5F5F5F',
        padding: 8,
        borderRadius: 20,
        margin: 5,
      }}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: props.characters.image,
          }}
        />
      </View>
      <View style={{marginHorizontal: 10}}>
        <Text style={styles.titleName}>{props.characters.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: 10,
          }}>
          <View
            style={[
              styles.status,
              {
                backgroundColor:
                  props.characters.status === 'Alive'
                    ? 'green'
                    : props.characters.status === 'Dead'
                    ? 'red'
                    : 'gray',
              },
            ]}
          />
          <Text style={[styles.titleName, {fontSize: 15}]}>
            {props.characters.status} - {props.characters.species}
          </Text>
        </View>

        <Text style={styles.text}>Last known location:</Text>
        <Text style={[styles.subText, {marginBottom: 5}]}>
          {props.characters.location.name}
        </Text>

        <Text style={styles.text}>First seen in:</Text>
        <Text style={styles.subText}>{props.characters.origin.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 140,
    height: 150,
    borderRadius: 20,
  },
  titleName: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
    maxWidth: '90%',
  },
  status: {
    width: 10,
    height: 10,
    marginRight: 5,
    marginTop: 3,
    borderRadius: 20,
    maxWidth: '90%',
  },
  text: {
    color: '#C8C8C8',
    maxWidth: '90%',
  },
  subText: {
    color: '#FFFFFF',
    maxWidth: '90%',
  },
});
