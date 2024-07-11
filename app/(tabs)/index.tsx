import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const initialBoletos = [
  { id: '1', title: 'Carro Do Braia', value: 'R$ 20.500,00', dueDate: '16/03/21' },
  { id: '2', title: 'Meu Dodge', value: 'R$ 15.750,00', dueDate: '02/05/21' },
  { id: '3', title: 'Tapa na Careca', value: 'R$ 50,00', dueDate: '09/08/21' },
  { id: '4', title: 'Velozes e Furiosos Parte 2', value: 'R$ 50.531,00', dueDate: '09/08/21' },
  { id: '5', title: 'Corona Gelada', value: 'R$ 100,00', dueDate: '16/03/21' },
];

const MeusBoletos = () => {
  const [boletos, setBoletos] = useState(initialBoletos);
  const [showBalance, setShowBalance] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newBoleto, setNewBoleto] = useState({ title: '', value: '', dueDate: '' });
  const [optionsModalVisible, setOptionsModalVisible] = useState(false);
  const [selectedBoletoId, setSelectedBoletoId] = useState(null);

  const handleAddBoleto = () => {
    setBoletos([...boletos, { ...newBoleto, id: (boletos.length + 1).toString() }]);
    setNewBoleto({ title: '', value: '', dueDate: '' });
    setModalVisible(false);
  };

  const handleRemoveBoleto = () => {
    setBoletos(boletos.filter(boleto => boleto.id !== selectedBoletoId));
    setOptionsModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.boletoContainer}>
      <View style={styles.boletoTextContainer}>
        <Text style={styles.boletoTitle}>{item.title}</Text>
        <Text style={styles.boletoValue}>{item.value}</Text>
        <Text style={styles.boletoDueDate}>Vence em {item.dueDate}</Text>
      </View>
      <TouchableOpacity onPress={() => {
        setSelectedBoletoId(item.id);
        setOptionsModalVisible(true);
      }}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header showBalance={showBalance} setShowBalance={setShowBalance} boletos={boletos} />
      <FlatList
        data={boletos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Adicionar Boleto</Text>
      </TouchableOpacity>
      <BoletoModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newBoleto={newBoleto}
        setNewBoleto={setNewBoleto}
        handleAddBoleto={handleAddBoleto}
      />
      <OptionsModal
        visible={optionsModalVisible}
        onRequestClose={() => setOptionsModalVisible(false)}
        onRemove={handleRemoveBoleto}
      />
    </View>
  );
};

const Header = ({ showBalance, setShowBalance, boletos }) => (
  <View>
    <View style={styles.header}>
      <Text style={styles.greeting}>Olá, Toretto</Text>
      <Text style={styles.reminder}>Mantenha suas contas em dia</Text>
      <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileImage} />
    </View>
    <View style={styles.boletosInfo}>
      <Image source={{ uri: 'https://via.placeholder.com/100x50' }} style={styles.barcode} />
      <View style={styles.boletosTextContainer}>
        <Text style={styles.boletosCount}>
          {showBalance ? 'Saldo: R$200.000.000,00' : 'Saldo: ****'}
        </Text>
        <TouchableOpacity onPress={() => setShowBalance(!showBalance)}>
          <Text style={styles.toggleButton}>
            {showBalance ? 'Ocultar Saldo' : 'Mostrar Saldo'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.boletosLabel}>Você tem {boletos.length} boletos para pagar</Text>
      </View>
    </View>
  </View>
);

const BoletoModal = ({ modalVisible, setModalVisible, newBoleto, setNewBoleto, handleAddBoleto }) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(!modalVisible)}>
    <View style={styles.modalView}>
      <Text style={styles.modalText}>Adicionar Novo Boleto</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={newBoleto.title}
        onChangeText={(text) => setNewBoleto({ ...newBoleto, title: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Valor"
        value={newBoleto.value}
        onChangeText={(text) => setNewBoleto({ ...newBoleto, value: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Vencimento"
        value={newBoleto.dueDate}
        onChangeText={(text) => setNewBoleto({ ...newBoleto, dueDate: text })}
      />
      <Button title="Adicionar" onPress={handleAddBoleto} />
      <Button title="Cancelar" onPress={() => setModalVisible(false)} />
    </View>
  </Modal>
);

const OptionsModal = ({ visible, onRequestClose, onRemove }) => (
  <Modal
    animationType="fade"
    transparent={true}
    visible={visible}
    onRequestClose={onRequestClose}>
    <View style={styles.optionsModalView}>
      <View style={styles.optionsModalContent}>
        <TouchableOpacity onPress={onRemove} style={styles.optionButton}>
          <Text style={styles.optionText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  reminder: {
    fontSize: 16,
    color: '#888',
    marginLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 'auto',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  boletosInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d1e7dd',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  barcode: {
    width: 100,
    height: 50,
  },
  boletosTextContainer: {
    marginLeft: -25,
    flex: 1,
  },
  boletosCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  toggleButton: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 5,
  },
  boletosLabel: {
    fontSize: 13,
    color: '#555',
    marginTop: 5,
  },
  boletoContainer: {
    backgroundColor: '#e0ffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boletoTextContainer: {
    flex: 1,
  },
  boletoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  boletoValue: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  boletoDueDate: {
    fontSize: 14,
    color: '#999',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
  optionsModalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  optionsModalContent: {
    width: 200,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  optionButton: {
    padding: 10,
  },
  optionText: {
    fontSize: 18,
    color: 'red',
  },
});

export default MeusBoletos;
