import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { AlignJustify, Search, X } from 'lucide-react-native';
import styles from './styles';
import { CameraPoint } from '@/types/index';

interface SearchBarProps {
  data: CameraPoint[];
  onSelectCamera: (camera: CameraPoint) => void;
}

export default function SearchBar({ data = [], onSelectCamera }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const filteredData =
    data?.filter(
      (camera) =>
        camera?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        camera?.district?.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];


  const handleCameraSelect = (camera: CameraPoint) => {
    onSelectCamera(camera);
    setShowMenu(false);
    setShowSearchResults(false);
    setSearchQuery('');
  };

  return (
    <>
      {/* SearchBar Container */}
      <View style={styles.container}>
        {/* Menu Button */}
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setShowMenu(true)}
        >
          <AlignJustify size={24} color='#333' />
        </TouchableOpacity>

        {/* Search Input */}
        <View style={styles.searchInputContainer}>
          <Search size={20} color='#666' style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            placeholder='Tìm camera giao thông...'
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              setShowSearchResults(!!text);
            }}
            onFocus={() => setShowSearchResults(true)}
          />
        </View>
      </View>

      {/* Search Results Dropdown */}
      {showSearchResults && searchQuery && (
        <View style={styles.searchResults}>
          <ScrollView>
            {filteredData.map((camera) => (
              <TouchableOpacity
                key={camera.id}
                style={styles.resultItem}
                onPress={() => handleCameraSelect(camera)}
              >
                <Text style={styles.itemName}>{camera.name}</Text>
                <Text style={styles.itemDistrict}>{camera.district}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Camera List Modal */}
      <Modal
        visible={showMenu}
        transparent={true}
        animationType='fade'
        onRequestClose={() => setShowMenu(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Danh sách camera</Text>
              <TouchableOpacity
                onPress={() => setShowMenu(false)}
                style={styles.closeButton}
              >
                <X size={24} color='#333' />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalList}>
              {data?.map((camera) => (
                <TouchableOpacity
                  key={camera.id}
                  style={styles.modalItem}
                  onPress={() => handleCameraSelect(camera)}
                >
                  <View>
                    <Text style={styles.itemName}>{camera.name}</Text>
                    <Text style={styles.itemDistrict}>{camera.district}</Text>
                  </View>
                  <View
                    style={[
                      styles.trafficIndicator,
                      {
                        backgroundColor:
                          camera.trafficDensity > 80
                            ? '#FF4444'
                            : camera.trafficDensity > 50
                            ? '#FFA000'
                            : '#4CAF50',
                      },
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}


