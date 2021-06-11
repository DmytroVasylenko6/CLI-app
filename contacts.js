
const uid = require('uid');
const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join('./db/contacts.json');


async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    console.log(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    contacts.find(contact => {
      if (contact.id == Number(contactId)) console.log(contact);
       })
  } catch(error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath, 'utf8');
    let contacts = JSON.parse(response);
    contacts = contacts.filter(contact => contact.id !== Number(contactId));
    
    fs.writeFile(contactsPath, `${JSON.stringify(contacts, null, 2)}`, 'utf8');

    console.log('Contact deleted');

  } catch(error) {
    console.log(error);
  }
};

async function addContact(name, email, phone) {
  try {
    const response = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(response);
    contacts.push({ id: uid.uid(), name: name, email: email, phone: phone });
    fs.writeFile(contactsPath, `${JSON.stringify(contacts, null, 2)}`);
    console.log('Contact added');
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}