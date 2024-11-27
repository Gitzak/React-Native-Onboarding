import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import onboardingData from '../data/onboardingData';

const {width} = Dimensions.get('window');

const Onboarding = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleSwipeLeft = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      animateSlide(-(currentIndex + 1) * width); // Move to next slide
    }
  };

  const handleSwipeRight = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
      animateSlide(-(currentIndex - 1) * width); // Move to previous slide
    }
  };

  const animateSlide = toValue => {
    Animated.timing(translateX, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRight}>
        <TouchableOpacity
          onPress={() => {
            if (currentIndex < onboardingData.length - 1) {
              handleSwipeLeft();
            } else {
              navigation.navigate('Welcome');
            }
          }}>
          <Text style={styles.nextButton}>
            {currentIndex === onboardingData.length - 1
              ? 'Get Started'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>

      <GestureRecognizer
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
        style={styles.gestureContainer}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: translateX}],
            },
          ]}>
          {onboardingData.map((item, index) => (
            <View key={index} style={styles.slide}>
              <Image source={{uri: item.image}} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.paragraph}>{item.paragraph}</Text>
            </View>
          ))}
        </Animated.View>
      </GestureRecognizer>

      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topRight: {
    alignItems: 'flex-end',
    padding: 16,
  },
  nextButton: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  gestureContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 100
  },
  slider: {
    flexDirection: 'row',
    width: width * onboardingData.length,
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#cccccc',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 40,
    backgroundColor: '#007BFF',
  },
});

export default Onboarding;
