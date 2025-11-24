import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {HandieManTags} from '../Atoms/HandieManTags/HandieManTags';
import {HorizontalScroll} from '../HorizontalScroll/HorizontalScroll';
import {HandieManContact} from '../Atoms/HandieManContact/HandieManContact';
import {emailIcon, location, phone} from '../../assets/svgs/svgs';

export const HandieManAbout = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View>
        <Text>
          Making fine furniture starts with the basics. Practicing basic
          techniques, just to improve on them, is not only a very good idea, it
          is a necessity. When I'm in the shop, and either don't feel like
          working on a particular project. Making fine furniture starts with the
          basics. Practicing basic techniques, just to improve on them, is not
          only a very good idea, it is a necessity. When I'm in the shop, and
          either don't feel like working on a particular project. Making fine
          furniture starts with the basics. Practicing basic techniques, just to
          improve on them, is not only a very good idea, it is a necessity. When
          I'm in the shop, and either don't feel like working on a particular
          project.
        </Text>
        <HorizontalScroll>
          <HandieManTags text="Furniture" />
          <HandieManTags text="Chair making" />
          <HandieManTags text="Nothing" />
        </HorizontalScroll>
        <HandieManContact text="Handiehub@gmail.com" icon={emailIcon} />
        <HandieManContact text="Ajah, Lagos, Nigeria" icon={location} />
        <HandieManContact text="+234 8098765676" icon={phone} />
      </View>
    </ScrollView>
  );
};
