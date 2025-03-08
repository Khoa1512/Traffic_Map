// components/NavigationSearch.tsx
import React from 'react';
import {
  View,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Navigation2, MapPin } from 'lucide-react-native';
import styles from './style'
import { CameraPoint } from '@/types/index';

interface NavigationSearchProps {
  start: string;
  end: string;
  setStart: (value: string) => void;
  setEnd: (value: string) => void;
  onSearch: () => void;
  onStartFocus: () => void;
  onEndFocus: () => void;
  selectingPoint: 'start' | 'end' | null;
  cameras: CameraPoint[];
}

export default function NavigationSearch({
  start,
  end,
  setStart,
  setEnd,
  onSearch,
  onStartFocus,
  onEndFocus,
  selectingPoint,
  cameras
}: NavigationSearchProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <View style={styles.inputsContainer}>
          <View style={styles.inputRow}>
            <MapPin
              size={20}
              color={selectingPoint === 'start' ? '#4CAF50' : '#666'}
            />
            <TextInput
              mode='flat'
              placeholder='Nhấn chọn điểm xuất phát trên bản đồ'
              value={start}
              onFocus={onStartFocus}
              style={[
                styles.input,
                selectingPoint === 'start' && styles.inputActive,
              ]}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.inputRow}>
            <Navigation2
              size={20}
              color={selectingPoint === 'end' ? '#f44336' : '#666'}
            />
            <TextInput
              mode='flat'
              placeholder='Nhấn chọn điểm đến trên bản đồ'
              value={end}
              onFocus={onEndFocus}
              style={[
                styles.input,
                selectingPoint === 'end' && styles.inputActive,
              ]}
            />
          </View>
        </View>
        <Button
          mode='contained'
          onPress={onSearch}
          style={styles.button}
          labelStyle={styles.buttonLabel}
        >
          Tìm đường
        </Button>
      </View>
    </View>
  );
}


