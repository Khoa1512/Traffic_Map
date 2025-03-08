import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    padding: 16,
  },
  inputActive: {
    backgroundColor: '#e3f2fd',
  },
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputsContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    height: 40,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 12,
  },
  button: {
    marginTop: 12,
    borderRadius: 4,
    backgroundColor: '#2196F3',
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  pointItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pointName: {
    fontSize: 16,
    marginBottom: 4,
  },
  pointDistrict: {
    fontSize: 14,
    color: '#666',
  },
  selectionGuide: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(33, 33, 33, 0.8)',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1000,
  },
  guideText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  cancelButton: {
    padding: 4,
  },
  searchBoxActive: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});
export default styles;
