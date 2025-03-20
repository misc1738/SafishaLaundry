import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const services = [
  { id: '1', name: 'Regular Wash', price: 800, duration: '24h' },
  { id: '2', name: 'Express Wash', price: 1200, duration: '12h' },
  { id: '3', name: 'Dry Cleaning', price: 1500, duration: '48h' },
  { id: '4', name: 'Ironing Only', price: 500, duration: '6h' },
  { id: '5', name: 'Wash & Iron', price: 1300, duration: '24h' },
];

export default function BookingScreen({ route, navigation }) {  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const addresses = [
    { id: '1', name: 'Home', address: '123 Kilimani Road, Nairobi' },
    { id: '2', name: 'Office', address: '456 Westlands Avenue, Nairobi' },
  ];
  
  const totalAmount = selectedServices.reduce((sum, serviceId) => {
    const service = services.find(s => s.id === serviceId);
    return sum + (service?.price || 0);
  }, 0);

  const renderServiceItem = (service) => (
    <TouchableOpacity
      key={service.id}
      style={[
        styles.serviceItem,
        selectedServices.includes(service.id) && styles.selectedService
      ]}
      onPress={() => {
        if (selectedServices.includes(service.id)) {
          setSelectedServices(selectedServices.filter(id => id !== service.id));
        } else {
          setSelectedServices([...selectedServices, service.id]);
        }
      }}
    >
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceDuration}>Duration: {service.duration}</Text>
      </View>
      <Text style={styles.servicePrice}>KSh {service.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Service</Text>
        <View style={{ width: 24 }} />
      </View>      <ScrollView style={styles.content}>
        {/* Date and Time Selection */}
        <Text style={styles.sectionTitle}>Select Date & Time</Text>
        <View style={styles.dateTimeContainer}>
          <TouchableOpacity 
            style={styles.dateTimePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={24} color="#2E8B57" />
            <Text style={styles.dateTimeText}>
              {selectedDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.dateTimePicker}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons name="time-outline" size={24} color="#2E8B57" />
            <Text style={styles.dateTimeText}>
              {selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Address Selection */}
        <Text style={styles.sectionTitle}>Delivery Address</Text>
        <TouchableOpacity 
          style={styles.addressSelector}
          onPress={() => setShowAddressModal(true)}
        >
          <Ionicons name="location-outline" size={24} color="#2E8B57" />
          <Text style={styles.addressText}>
            {selectedAddress ? addresses.find(a => a.id === selectedAddress)?.address : 'Select Address'}
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
        <View style={styles.providerInfo}>
          <Image
            source={{ uri: route.params?.provider?.image }}
            style={styles.providerImage}
          />
          <View style={styles.providerDetails}>
            <Text style={styles.providerName}>{route.params?.provider?.name}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.rating}>{route.params?.provider?.rating}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Services</Text>
        <View style={styles.servicesList}>
          {services.map(renderServiceItem)}
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text>Selected Services</Text>
            <Text>{selectedServices.length}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Total Amount</Text>
            <Text style={styles.totalAmount}>KSh {totalAmount}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.mpesaButton}
          onPress={() => {
            // Implement M-Pesa payment flow
          }}
        >
          <Text style={styles.mpesaButtonText}>Pay with M-Pesa</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  dateTimePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    flex: 0.48,
  },
  dateTimeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  addressSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  addressText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  providerInfo: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  providerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  providerDetails: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  providerName: {
    fontSize: 16,
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
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    padding: 16,
  },
  servicesList: {
    padding: 16,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedService: {
    borderColor: '#2E8B57',
    backgroundColor: '#E8F5E9',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  serviceDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  mpesaButton: {
    backgroundColor: '#2E8B57',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  mpesaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});