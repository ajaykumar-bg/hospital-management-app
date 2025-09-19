import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Payment as PaymentIcon,
  Receipt as ReceiptIcon,
  CreditCard as CardIcon,
} from '@mui/icons-material';

const mockBills = [
  {
    id: 1,
    billNumber: 'BILL-2024-001',
    date: '2024-09-15',
    description: 'Routine Checkup',
    amount: 250.0,
    status: 'Paid',
    paymentMethod: 'Credit Card',
    dueDate: '2024-10-15',
  },
  {
    id: 2,
    billNumber: 'BILL-2024-002',
    date: '2024-09-18',
    description: 'Blood Test & Laboratory',
    amount: 180.5,
    status: 'Pending',
    paymentMethod: null,
    dueDate: '2024-10-18',
  },
  {
    id: 3,
    billNumber: 'BILL-2024-003',
    date: '2024-09-10',
    description: 'Prescription Medications',
    amount: 95.75,
    status: 'Overdue',
    paymentMethod: null,
    dueDate: '2024-09-25',
  },
];

const mockInsurance = {
  provider: 'HealthCare Plus',
  policyNumber: 'HCP-123456789',
  groupNumber: 'GRP-001',
  coverage: '80%',
  deductible: '$500',
  copay: '$25',
};

export default function PayBills() {
  const [bills, setBills] = useState(mockBills);
  const [selectedBill, setSelectedBill] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    amount: 0,
  });

  const handlePayBill = (bill) => {
    setSelectedBill(bill);
    setPaymentDetails({
      ...paymentDetails,
      amount: bill.amount,
    });
    setOpenDialog(true);
  };

  const handleProcessPayment = () => {
    // Simulate payment processing
    setBills(
      bills.map((bill) =>
        bill.id === selectedBill.id
          ? { ...bill, status: 'Paid', paymentMethod: 'Credit Card' }
          : bill
      )
    );
    setOpenDialog(false);
    setSelectedBill(null);
  };

  const getStatusColor = (status) => {
    const colors = {
      Paid: 'success',
      Pending: 'warning',
      Overdue: 'error',
    };
    return colors[status] || 'default';
  };

  const totalPending = bills
    .filter((bill) => bill.status !== 'Paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  const totalPaid = bills
    .filter((bill) => bill.status === 'Paid')
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <Box>
      <Typography variant='h4' gutterBottom>
        Pay Bills
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} mb={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='error.main'>
                Outstanding Balance
              </Typography>
              <Typography variant='h4'>${totalPending.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='success.main'>
                Paid This Year
              </Typography>
              <Typography variant='h4'>${totalPaid.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' color='info.main'>
                Insurance Coverage
              </Typography>
              <Typography variant='h4'>{mockInsurance.coverage}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Bills Table */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Medical Bills
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Bill Number</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Amount</TableCell>
                      <TableCell>Due Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bills.map((bill) => (
                      <TableRow key={bill.id}>
                        <TableCell>{bill.billNumber}</TableCell>
                        <TableCell>{bill.date}</TableCell>
                        <TableCell>{bill.description}</TableCell>
                        <TableCell>${bill.amount.toFixed(2)}</TableCell>
                        <TableCell>{bill.dueDate}</TableCell>
                        <TableCell>
                          <Chip
                            label={bill.status}
                            color={getStatusColor(bill.status)}
                            size='small'
                          />
                        </TableCell>
                        <TableCell>
                          {bill.status !== 'Paid' ? (
                            <Button
                              variant='contained'
                              size='small'
                              startIcon={<PaymentIcon />}
                              onClick={() => handlePayBill(bill)}
                            >
                              Pay Now
                            </Button>
                          ) : (
                            <Button
                              variant='outlined'
                              size='small'
                              startIcon={<ReceiptIcon />}
                            >
                              Receipt
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Insurance Information */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Insurance Information
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary='Provider'
                    secondary={mockInsurance.provider}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary='Policy Number'
                    secondary={mockInsurance.policyNumber}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary='Coverage'
                    secondary={mockInsurance.coverage}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary='Deductible'
                    secondary={mockInsurance.deductible}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary='Copay'
                    secondary={mockInsurance.copay}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant='h6' gutterBottom>
                Recent Payments
              </Typography>
              {bills
                .filter((bill) => bill.status === 'Paid')
                .map((bill) => (
                  <Box
                    key={bill.id}
                    sx={{
                      mb: 2,
                      p: 1,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                    }}
                  >
                    <Typography variant='body2' fontWeight='bold'>
                      {bill.description}
                    </Typography>
                    <Typography variant='body2' color='textSecondary'>
                      ${bill.amount.toFixed(2)} - {bill.date}
                    </Typography>
                    <Typography variant='caption' color='success.main'>
                      Paid via {bill.paymentMethod}
                    </Typography>
                  </Box>
                ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Payment Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>
          <Box display='flex' alignItems='center' gap={1}>
            <CardIcon />
            Payment Details
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedBill && (
            <Box>
              <Typography variant='h6' gutterBottom>
                Bill: {selectedBill.description}
              </Typography>
              <Typography variant='body1' gutterBottom>
                Amount: ${selectedBill.amount.toFixed(2)}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Card Holder Name'
                    value={paymentDetails.cardHolder}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cardHolder: e.target.value,
                      })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Card Number'
                    value={paymentDetails.cardNumber}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cardNumber: e.target.value,
                      })
                    }
                    placeholder='1234 5678 9012 3456'
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label='Expiry Date'
                    value={paymentDetails.expiryDate}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        expiryDate: e.target.value,
                      })
                    }
                    placeholder='MM/YY'
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <TextField
                    label='CVV'
                    value={paymentDetails.cvv}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cvv: e.target.value,
                      })
                    }
                    placeholder='123'
                    fullWidth
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    label='Payment Amount'
                    value={paymentDetails.amount}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        amount: parseFloat(e.target.value),
                      })
                    }
                    type='number'
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={handleProcessPayment}
            variant='contained'
            disabled={!paymentDetails.cardNumber || !paymentDetails.cardHolder}
          >
            Process Payment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
