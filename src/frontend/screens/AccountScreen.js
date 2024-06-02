import {View, StatusBar, ScrollView} from "react-native";
import React from 'react';

import AccountInfo from "../components/AccountInfo";
import AnnouncementsInfo from "../components/AnnouncementsInfo";
import ApplicationsInfo from "../components/ApplicationsInfo";
import OtherInfo from "../components/OtherInfo.js"


export default function AccountScreen() {
    return (
      <View>
        <StatusBar backgroundColor="#99cc33"/>
        <ScrollView style = {{backgroundColor : "#fff"}}>
          <AccountInfo/>
          <AnnouncementsInfo/>
          <ApplicationsInfo/>
          <OtherInfo/>
        </ScrollView>
      </View>
    )

}