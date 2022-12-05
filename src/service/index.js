const config = require('../config')
const firebase = require('firebase')

// Initialize Firebase
firebase.initializeApp(config.firebaseConfig)

const db = firebase.firestore()

async function getData() {
  let data = []
  await db
    .collection('contacts')
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data())
      })
    })
  return await data
}

async function postData(contacts) {
  let result = false
  const { nombre, apellido, telefono } = contacts
  await db
    .collection('contacts')
    .add({
      nombre,
      apellido,
      telefono,
    })
    .then((docRef) => {
      console.log(docRef.id)
      result = true
    })
    .catch((error) => {
      console.log(error)

      result = false
    })

  return result
}

module.exports = {
  getData,
  postData,
}
