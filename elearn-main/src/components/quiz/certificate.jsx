import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';


// Define styles for the certificate
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 40,
    paddingHorizontal: 40,
  },
  certificate: {
    width: '80%',
    maxWidth: 600,
    textAlign: 'center',
    border: '2px solid #333',
    borderRadius: 10,
    padding: 20,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
});

const CertificateTemplate = ({ name, course }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.certificate}>
        <Image src="https://static.vecteezy.com/system/resources/previews/000/586/123/original/book-reading-logo-and-symbols-template-icons-vector.jpg" />
        <Text style={styles.title}>Certificate of Completion</Text>
        <Text style={styles.subtitle}>This is to certify that</Text>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>has successfully completed the course:</Text>
        <Text style={styles.text}>{course}</Text>
      </View>
    </Page>
  </Document>
);

export default CertificateTemplate;
