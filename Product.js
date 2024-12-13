
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Products() {

    const [products, setProducts] = useState(null)
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [newProduct, setNewProduct] = useState({
        id: '',
        name: '',
        category: '',
        month: '',
        expiryDate: '',
        price: '',
        quantity:'',
        sku: '',
        weight: '',
        unit: '',
        manufactureDate: '',
        prodId : '',
        serialNo: '',
        lotNo: '',
        warehouseArrivingDate: ''
    });
  
    const [editProduct, setEditProduct] = useState({
        id: null,
        name: '',
        category: '',
        month: '',
        expiryDate: '',
        price: '',
        quantity: '',
        sku: '',
        weight: '',
        unit: '',
        manufactureDate: '',
        prodId : '',
        serialNo: '',
        lotNo: '',
        warehouseArrivingDate: ''
    });

    const handleClickOpenEdit = (product) => {
        setEditProduct(product);
        setOpenEdit(true);
    };
    
    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
  
    const handleChange = (e) => {
      setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
    };

    const handleChangeEdit = (e) => {
        setEditProduct({ ...editProduct, [e.target.name]: e.target.value });
    };
  
    const handleAddProduct = async () => {
        try {
          const response = await axios.post('http://localhost:8080/add', {
            ...newProduct,
            price: parseFloat(newProduct.price), // Ensure the price is a number
          });
          setProducts([...products, response.data]); // Add the new product to the list
          setNewProduct({
            name: '',
            description: '',
            category: '',
            expiryDate: '',
            price: '',
            quantity: '',
            sku: '',
            weight: '',
            unit: '',
            manufactureDate: '',
            prodId : '',
            serialNo: '',
            lotNo: '',
            warehouseArrivingDate: ''
          });
          handleClose();
        } catch (error) {
          console.log(newProduct.weight)
          console.log(newProduct.expiryDate)
          console.error('There was an error adding the product!', error);
        }
    };

    const handleEditProduct = async () => {
        try {
          const response = await axios.put(`http://localhost:8080/update-product/${editProduct.id}`, {
            ...editProduct,
            price: parseFloat(editProduct.price), // Ensure the price is a number
          });
          setProducts(products.map(product => 
            product.id === editProduct.id ? response.data : product
          )); // Update the product in the list
          handleCloseEdit();
        } catch (error) {
          console.error('Error updating the product:', error);
          alert('There was an error updating the product! Please try again.');
        }
    };
    
    const handleDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:8080/delete-product/${id}`);
        setProducts(products.filter(product => product.id !== id)); // Remove the deleted product from the list
        handleConfirmClose();
    } catch (error) {
        console.error('Error deleting the product:', error);
        alert('There was an error deleting the product! Please try again.');
    }
    };
    
    const handleConfirmOpen = (id) => {
        setDeleteId(id);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setDeleteId(null);
        setConfirmOpen(false);
    };

    useEffect(() => {
        axios.get('http://localhost:8080/products')
        .then(response => {
            setProducts(response.data)
        });
    }, [])

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <TableContainer component={Paper} style={{width: '70%'}}>
    <Box 
        display="flex" 
        justifyContent="flex-start" 
        width="100%" 
        mb={2}
      >
        <Button variant="contained" onClick={handleClickOpen}>Add New</Button>
    </Box>    
      <Table>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Month</TableCell>
          <TableCell>Expiry Date</TableCell>
          <TableCell>Price</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Sku</TableCell>
          <TableCell>Weight</TableCell>
          <TableCell>Unit</TableCell>
          <TableCell>Manufacture Date</TableCell>
          <TableCell>Product Id</TableCell>
          <TableCell>Serial No</TableCell>
          <TableCell>Lot No</TableCell>
          <TableCell>Warehouse arriving date</TableCell>
          <TableCell align="right">Price (₹)</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { products !== null? products.map((product, index) => (
            <TableRow 
            key={product.id}
            style={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : 'white' }}  // Striped effect
          >
            <TableCell>{product.id}</TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.month}</TableCell>
            <TableCell>{product.expirydate}</TableCell>
            <TableCell>{product.price}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.sku}</TableCell>
            <TableCell>{product.weight}</TableCell>
            <TableCell>{product.unit}</TableCell>
            <TableCell>{product.manufactureDate}</TableCell>
            <TableCell>{product.prodId}</TableCell>
            <TableCell>{product.serialNo}</TableCell>
            <TableCell>{product.lotNo}</TableCell>
            <TableCell>{product.warehouseArrivingDate}</TableCell>
            <TableCell align="right">{product.price.toFixed(2)}</TableCell>
            <TableCell align="center">
              <IconButton color="primary" onClick={() => handleClickOpenEdit(product)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleConfirmOpen(product.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        )) : ( <div>No products to display...</div>)
        }
      </TableBody>
    </Table>
  </TableContainer>

      {/* Modal Dialog for Adding New Product */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={newProduct.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="category"
            label="category"
            type="text"
            fullWidth
            value={newProduct.category}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="month"
            label="month"
            type="text"
            fullWidth
            value={newProduct.month}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="expirydate"
            label="Expiry Date (yyyy-mm-dd)"
            type="text"
            fullWidth
            // InputLabelProps={{
            //   shrink: true,
            // }}
            value={newProduct.expirydate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={newProduct.price}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="quantity"
            type="number"
            fullWidth
            value={newProduct.quantity}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="sku"
            label="Sku"
            type="text"
            fullWidth
            value={newProduct.sku}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="weight"
            label="weight"
            type="text"
            fullWidth
            value={newProduct.weight}
            onChange={handleChange}
          />
          <select value={newProduct.unit} onChange={(e) => newProduct.unit = e.target.value} name='sku'>

            <option value="ml">ml</option>

            <option value="L">L</option>

            <option value="kg">kg</option>

            <option value="g">g</option>
          </select>
          <TextField
            margin="dense"
            name="manufactureDate"
            label="Manufacture Date (yyyy-mm-dd)"
            type="text"
            fullWidth
            value={newProduct.manufactureDate}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="prodId"
            label="Product Id"
            type="number"
            fullWidth
            value={newProduct.prodId}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="serialNo"
            label="Serial No"
            type="number"
            fullWidth
            value={newProduct.serialNo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="lotNo"
            label="Lot No"
            type="text"
            fullWidth
            value={newProduct.lotNo}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="warehouseArrivingDate"
            label="Warehouse Arriving Date (yyyy-mm-dd)"
            type="text"
            fullWidth
            value={newProduct.warehouseArrivingDate}
            onChange={handleChange}
          />
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddProduct} color="primary" variant="contained">
            Add Product
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Deletion */}
      <Dialog open={confirmOpen} onClose={handleConfirmClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDelete(deleteId);
            }}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

    {/* Modal Dialog for Editing Product */}
    <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={editProduct.name}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="category"
            label="Category"
            type="text"
            fullWidth
            value={editProduct.category}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="month"
            label="Month"
            type="text"
            fullWidth
            value={editProduct.month}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="expirydate"
            label="Expiry Date"
            type="text"
            fullWidth
            InputLabelProps={{
                shrink: true,
              }}
              value={editProduct.expirydate}
              onChange={handleChangeEdit}
            />
            <TextField
              margin="dense"
              name="price"
              label="Price"
              type="number"
              fullWidth
              value={editProduct.price}
              onChange={handleChangeEdit}
            />
            <TextField
              margin="dense"
              name="quantity"
              label="quantity"
              type="number"
              fullWidth
              value={editProduct.quantity}
              onChange={handleChangeEdit}
            />
            <TextField
            margin="dense"
            name="sku"
            label="Sku"
            type="text"
            fullWidth
            value={editProduct.sku}
            onChange={handleChangeEdit}
          />
          
          <select value={editProduct.unit} onChange={(e) => editProduct.unit = e.target.value} name='unit'>

            <option value="ml">ml</option>

            <option value="L">L</option>

            <option value="kg">kg</option>

            <option value="g">g</option>
          </select>
          <TextField
            margin="dense"
            name="manufactureDate"
            label="Manufacture Date (yyyy-mm-dd)"
            type="text"
            fullWidth
            value={editProduct.manufactureDate}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="prodId"
            label="Product Id"
            type="number"
            fullWidth
            value={editProduct.prodId}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="serialNo"
            label="Serial No"
            type="number"
            fullWidth
            value={editProduct.serialNo}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="lotNo"
            label="Lot No"
            type="text"
            fullWidth
            value={editProduct.lotNo}
            onChange={handleChangeEdit}
          />
          <TextField
            margin="dense"
            name="warehouseArrivingDate"
            label="Warehouse Arriving Date"
            type="text"
            fullWidth
            value={editProduct.warehouseArrivingDate}
            onChange={handleChangeEdit}
          />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditProduct} color="primary" variant="contained">
              Update Product
            </Button>
          </DialogActions>
        </Dialog>  
        </Box>
  )
}
