// CertificateTemplate.jsx

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  certificate: {
    width: '80%',
    maxWidth: 600,
    textAlign: 'center',
    border: '1px solid #000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
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
