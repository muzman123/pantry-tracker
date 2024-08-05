'use client'

import { useState, useEffect } from 'react'
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material'
import { firestore } from '@/firebase'
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
}

export const HomeComponent = () => {
  const [inventory, setInventory] = useState([])
  const [filteredInventory, setFilteredInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const updateInventory = async () => {
    try {
      const snapshot = query(collection(firestore, 'inventory'))
      const docs = await getDocs(snapshot)
      const inventoryList = []
      docs.forEach((doc) => {
        inventoryList.push({ name: doc.id, ...doc.data() })
      })
      setInventory(inventoryList)
      setFilteredInventory(inventoryList) // Initialize filteredInventory
    } catch (error) {
      console.error("Error updating inventory:", error);
    }
  }

  useEffect(() => {
    updateInventory()
  }, [])

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredInventory(inventory)
    } else {
      setFilteredInventory(
        inventory.filter(({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }
  }, [searchTerm, inventory])

  const addItem = async (item) => {
    try {
      const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase())
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { quantity } = docSnap.data()
        await setDoc(docRef, { quantity: quantity + 1 })
      } else {
        await setDoc(docRef, { quantity: 1 })
      }
      await updateInventory()
    } catch (error) {
      console.error("Error adding item:", error);
    }
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item.toLowerCase())
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <Box
      width="100vw"
      height="100vh"
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      gap={2}
      bgcolor="#f8f8f8"
    >
      {/* Header */}
      <Box
        width="100%"
        bgcolor="#abed5d"
        color="#fff"
        p={2}
        textAlign="center"
        boxShadow={2}
      >
        <Typography variant="h4" component="h1">
          Pantry Manager
        </Typography>
      </Box>
      
      {/* Main Content */}
      <Box
        width="100%"
        maxWidth="1000px"
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap={2}
        p={2}
      >
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Item
            </Typography>
            <Stack width="100%" direction={'row'} spacing={2} mt={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}
                color="primary"
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
          Add New Item
        </Button>
        <TextField
          id="search-bar"
          label="Search Items"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 3, width: '100%', maxWidth: '600px' }}
        />
        <Box 
          borderRadius={2} 
          bgcolor="#f8f8f8" 
          border="1px solid #ddd" 
          boxShadow={2} 
          p={3}
          width="100%"
        >
          <Box
            width="100%"
            bgcolor={'#abed5d'}
            color={'#fff'}
            borderRadius={1}
            p={2}
            mb={2}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography variant={'h4'} textAlign={'center'}>
              Inventory Items
            </Typography>
          </Box>
          <Stack spacing={2} height="300px" overflow={'auto'}>
            {filteredInventory.map(({ name, quantity }) => (
              <Box
                key={name}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                bgcolor={'#ffffff'}
                borderRadius={1}
                boxShadow={1}
                p={2}
                border="1px solid #ddd"
              >
                <Typography variant={'h6'} color={'#333'}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant={'h6'} color={'#333'}>
                  Quantity: {quantity}
                </Typography>
                <Button variant="contained" onClick={() => removeItem(name)} color="error">
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Footer */}
      <Box
        width="100%"
        bgcolor="#abed5d"
        color="#fff"
        p={2}
        textAlign="center"
        boxShadow={2}
        mt="auto"
      >
        <Typography variant="body1">
          © 2024 Pantry Tracker. All Rights Reserved.
        </Typography>
      </Box>
    </Box>
  )
}

export default HomeComponent
