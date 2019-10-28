import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function VotingBlock({ records, submitKeyword }) {
  const changeVote = (id, updown) => {
    axios
      .post('http://127.0.0.1:5000/vote', {
        id: id,
        updown: updown,
        switch: false
      })
      .then(() => {
        submitKeyword();
      });
  };

  const getIconName = t => {
    const type = parseInt(t);
    console.log(t);
    if (type === 1) return 'google';
    if (type === 2) return 'windows';
    if (type === 4) return 'users';
  };

  const name_one = records[0] ? getIconName(records[0].transType) : '';
  const name_two = records[1] ? getIconName(records[1].transType) : '';
  const name_three = records[2] ? getIconName(records[2].transType) : '';

  return (
    <View style={{ marginTop: 60 }}>
      <View style={{ marginBottom: 60, flexDirection: 'row' }}>
        <View style={{ flex: 1, justifyContent: 'flex-start' }}>
          {parseInt(records[0].transType === 3) ? (
            <View style={{ flexDirection: 'row' }}>
              <Icon
                name="google"
                size={30}
                color="#ccc"
                style={{ marginLeft: 60 }}
              />
              <Icon
                name="windows"
                size={30}
                color="#ccc"
                style={{ marginLeft: 20 }}
              />
            </View>
          ) : (
            <Icon
              name={name_one}
              size={30}
              color="#ccc"
              style={{ marginLeft: 60 }}
            />
          )}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              flex: 1,
              justifyContent: 'flex-start'
            }}
          >
            <Icon
              name="thumbs-up"
              size={22}
              color="#ccc"
              style={{ marginLeft: 30 }}
              onPress={() => changeVote(records[0].id, true)}
            />
            <Icon
              name="thumbs-down"
              size={22}
              color="#ccc"
              style={{ marginLeft: 43 }}
              onPress={() => changeVote(records[0].id, false)}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Text style={{ marginLeft: 30 }}> {records[0].upvotes} </Text>
            <Text style={{ marginLeft: 50 }}> {records[0].downvotes} </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            marginRight: 50
          }}
        >
          <Text style={{ marginTop: 30 }}>{records[0].trans}</Text>
        </View>
      </View>
      {records[1] && (
        <View style={{ marginBottom: 60, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            {parseInt(records[0].transType === 3) ? (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="google"
                  size={30}
                  color="#ccc"
                  style={{ marginLeft: 60 }}
                />
                <Icon
                  name="windows"
                  size={30}
                  color="#ccc"
                  style={{ marginLeft: 20 }}
                />
              </View>
            ) : (
              <Icon
                name={name_two}
                size={30}
                color="#ccc"
                style={{ marginLeft: 60 }}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                flex: 1,
                justifyContent: 'flex-start'
              }}
            >
              <Icon
                name="thumbs-up"
                size={22}
                color="#ccc"
                style={{ marginLeft: 30 }}
                onPress={() => changeVote(records[1].id, true)}
              />
              <Icon
                name="thumbs-down"
                size={22}
                color="#ccc"
                style={{ marginLeft: 43 }}
                onPress={() => changeVote(records[1].id, false)}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Text style={{ marginLeft: 30 }}> {records[1].upvotes} </Text>
              <Text style={{ marginLeft: 50 }}> {records[1].downvotes} </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              marginRight: 50
            }}
          >
            <Text style={{ marginTop: 30 }}>{records[1].trans}</Text>
          </View>
        </View>
      )}
      {records[2] && (
        <View style={{ marginBottom: 60, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            {parseInt(records[0].transType === 3) ? (
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  name="google"
                  size={30}
                  color="#ccc"
                  style={{ marginLeft: 60 }}
                />
                <Icon
                  name="windows"
                  size={30}
                  color="#ccc"
                  style={{ marginLeft: 20 }}
                />
              </View>
            ) : (
              <Icon
                name={name_three}
                size={30}
                color="#ccc"
                style={{ marginLeft: 60 }}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
                flex: 1,
                justifyContent: 'flex-start'
              }}
            >
              <Icon
                name="thumbs-up"
                size={22}
                color="#ccc"
                style={{ marginLeft: 30 }}
                onPress={() => changeVote(records[2].id, true)}
              />
              <Icon
                name="thumbs-down"
                size={22}
                color="#ccc"
                style={{ marginLeft: 43 }}
                onPress={() => changeVote(records[2].id, false)}
              />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Text style={{ marginLeft: 30 }}> {records[2].upvotes} </Text>
              <Text style={{ marginLeft: 50 }}> {records[2].downvotes} </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'flex-end',
              marginRight: 50
            }}
          >
            <Text style={{ marginTop: 30 }}>{records[2].trans}</Text>
          </View>
        </View>
      )}
    </View>
  );
}
