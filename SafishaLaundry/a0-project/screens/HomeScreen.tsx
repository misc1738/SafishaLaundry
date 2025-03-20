import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  image: string;
  available: boolean;
  services: string[];
  specialOffer?: string;
}

interface ServiceProvider {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  price: number;
  image: string;
  available: boolean;
  services: string[];
  specialOffer?: string;
  isFavorite?: boolean;
  completedOrders?: number;
  experience?: string;
}

const serviceProviders: ServiceProvider[] = [
  {    id: '1',
    name: 'Joyce Mwangi',
    isFavorite: true,
    completedOrders: 1250,
    experience: '5+ years',
    rating: 4.8,
    reviews: 156,
    location: 'Kilimani',
    price: 800,
    image: 'https://api.a0.dev/assets/image?text=professional%20african%20woman%20smiling%20confidently&aspect=1:1',
    available: true,
    services: ['Regular Wash', 'Dry Cleaning', 'Ironing'],
    specialOffer: '15% off on first order'
  },
  {
    id: '2',
    name: 'Sarah Odhiambo',
    rating: 4.9,
    reviews: 203,
    location: 'Westlands',
    price: 850,
    image: 'https://api.a0.dev/assets/image?text=kenyan%20business%20woman%20entrepreneur%20warm%20smile&aspect=1:1',
    available: true,
    services: ['Regular Wash', 'Express Service', 'Folding']
  },
  {
    id: '3',
    name: 'Faith Kimani',
    rating: 4.7,
    reviews: 178,
    location: 'Lavington',
    price: 750,
    image: 'https://api.a0.dev/assets/image?text=confident%20kenyan%20business%20woman%20professional&aspect=1:1',
    available: false,
    services: ['Regular Wash', 'Stain Removal', 'Ironing'],
    specialOffer: 'Free pickup on orders above 2000 KSh'
  },
  {
    id: '4',
    name: 'Mary Njeri',
    rating: 5.0,
    reviews: 89,
    location: 'Karen',
    price: 900,
    image: 'https://api.a0.dev/assets/image?text=experienced%20kenyan%20laundry%20professional&aspect=1:1',
    available: true,
    services: ['Premium Wash', 'Dry Cleaning', 'Shoe Cleaning'],
    specialOffer: 'Premium service at regular price this week'
  }
];

const categories = [
  { id: '1', name: 'Regular Wash', icon: 'shirt-outline' },
  { id: '2', name: 'Dry Cleaning', icon: 'ios-shirt' },
  { id: '3', name: 'Ironing', icon: 'ios-flame-outline' },
  { id: '4', name: 'Express Service', icon: 'flash-outline' },
];

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');  const [favorites, setFavorites] = useState<string[]>(['1']);

  const toggleFavorite = (providerId: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(providerId)
        ? prevFavorites.filter(id => id !== providerId)
        : [...prevFavorites, providerId]
    );
  };

  const renderServiceProvider = (provider: ServiceProvider) => (    
    <TouchableOpacity 
      onPress={() => navigation.navigate('Booking', { provider })}key={provider.id} 
      style={[
        styles.providerCard,
        !provider.available && styles.providerCardUnavailable
      ]}
    >
      <Image
        source={{ uri: provider.image }}
        style={styles.providerImage}
      />      <View style={styles.providerInfo}>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => toggleFavorite(provider.id)}
        >
          <Ionicons 
            name={favorites.includes(provider.id) ? "heart" : "heart-outline"} 
            size={24} 
            color={favorites.includes(provider.id) ? "#FF4444" : "#666"} 
          />
        </TouchableOpacity>
        <View style={styles.providerHeader}>
          <Text style={styles.providerName}>{provider.name}</Text>
          {!provider.available && (
            <View style={styles.unavailableBadge}>
              <Text style={styles.unavailableText}>Unavailable</Text>
            </View>
          )}
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{provider.rating}</Text>
          <Text style={styles.reviews}>({provider.reviews} reviews)</Text>
        </View>
        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.location}>{provider.location}</Text>
        </View>        <View style={styles.servicesContainer}>
          {provider.services.map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>KSh {provider.price}</Text>
          <Text style={styles.priceUnit}>/load</Text>
        </View>
        
        {provider.specialOffer && (
          <View style={styles.offerContainer}>
            <Ionicons name="pricetag-outline" size={16} color="#2E8B57" />
            <Text style={styles.offerText}>{provider.specialOffer}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );  const renderCategories = () => (
    <View style={styles.categories}>
      <Text style={styles.sectionTitle}>Services</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <View style={styles.categoryIcon}>
              <Ionicons name={category.icon} size={24} color="#2E8B57" />
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Safisha</Text>
        <Text style={styles.subtitle}>Professional Laundry Services</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by location or service provider"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.quickFilters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="sort" size={20} color="#666" />
            <Text style={styles.filterText}>Sort by Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#666" />
            <Text style={styles.filterText}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="cash" size={20} color="#666" />
            <Text style={styles.filterText}>Price</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>      {renderCategories()}
      
      <ScrollView style={styles.providerList}>
        {serviceProviders.map(renderServiceProvider)}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#2E8B57" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="calendar" size={24} color="#666" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Messages')}
        >
          <Ionicons name="chatbubbles-outline" size={24} color="#666" />
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person-outline" size={24} color="#666" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  favoriteButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    zIndex: 1,
  },
  categories: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  categoryCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  quickFilters: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterText: {
    marginLeft: 4,
    color: '#666',
  },
  providerList: {
    flex: 1,
    paddingHorizontal: 16,
  },  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  providerCardUnavailable: {
    opacity: 0.7,
  },
  providerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  unavailableBadge: {
    backgroundColor: '#FFE0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unavailableText: {
    color: '#FF4444',
    fontSize: 12,
  },
  providerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  serviceTag: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  serviceText: {
    color: '#2E8B57',
    fontSize: 12,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 8,
  },
  offerText: {
    color: '#2E8B57',
    marginLeft: 4,
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  providerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold',
    color: '#333',
  },
  reviews: {
    marginLeft: 4,
    color: '#666',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    marginLeft: 4,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  priceUnit: {
    marginLeft: 4,
    color: '#666',
  },
});